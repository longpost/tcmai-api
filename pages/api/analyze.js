// pages/api/analyze.js
import OpenAI from "openai";
import {
  SYMPTOMS,
  SYMPTOM_TAG_RULES,
  COMBO_RULES,
  TAG_EXPLANATIONS,
  TAG_TREATMENT
} from "../../lib/data";

const OPENAI_KEY = process.env.OPENAI_API_KEY || process.env.KEYFORTCM || "";

const client = new OpenAI({ apiKey: OPENAI_KEY });

// ---------------------------
// Helpers
// ---------------------------
const symptomById = new Map(SYMPTOMS.map((s) => [s.id, s]));
const symptomByZh = new Map(SYMPTOMS.map((s) => [s.zh, s]));
const symptomByEn = new Map(SYMPTOMS.map((s) => [s.en, s]));

function safeStr(x) {
  return typeof x === "string" ? x : "";
}
function normalizeLang(lang) {
  return (lang || "").toLowerCase() === "en" ? "en" : "zh";
}

// Read bilingual text from {zh,en} or fallback string
function tBi(maybeBi, lang) {
  if (!maybeBi) return "";
  if (typeof maybeBi === "string") return maybeBi;
  return safeStr(maybeBi[lang]) || safeStr(maybeBi.zh) || safeStr(maybeBi.en) || "";
}

function tagName(tag, lang) {
  // 这里你如果未来想显示“英文证素名”，可以做映射；现在先保持 tag 原样（中文证素）
  // 但英文 UI 里我们会让 Pattern 也用英文“解释句”，tag 名仍可保留中文（或你后续加 tag->enName）
  // 为了“全英文”，这里给一个默认的英文化：直接用英文解释标题格式
  // 最稳做法：你自己维护 TAG_NAME_EN；现在先保留 tag（不影响“全英文句子”，但 Pattern 会含中文tag会不爽）
  // -> 我在下面 buildBaseResult 里给了 “patternLabels” 英文化，不靠 tag 名。
  return tag;
}

// ✅ 输入兼容：支持 {id} 或 {symptom:"中文名"} 或 {symptom:"English"}
function normalizeSymptomIds(caseInput) {
  const symptoms = Array.isArray(caseInput.symptoms) ? caseInput.symptoms : [];
  const out = [];
  for (const item of symptoms) {
    if (!item) continue;

    const id = safeStr(item.id);
    if (id && symptomById.has(id)) {
      out.push(id);
      continue;
    }

    const s = safeStr(item.symptom);
    if (s) {
      const hit = symptomByZh.get(s) || symptomByEn.get(s);
      if (hit?.id) out.push(hit.id);
    }
  }
  return out;
}

// ---------------------------
// i18n strings for Eight Principles + evidence
// ---------------------------
const EP_TEXT = {
  zh: {
    cold: "偏寒",
    heat: "偏热",
    unclearCH: "寒热不明",
    interior: "偏里",
    exterior: "偏表",
    unclearIE: "表里不明",
    deficiency: "偏虚",
    excess: "偏实",
    mixedDE: "虚实夹杂",
    yyUnclear: "阴阳不明",
    yyYangDef: "偏阳虚",
    yyYinDefHeat: "偏阴虚/虚热",
    yyYangExHeat: "偏阳盛/实热",
    yyColdEx: "偏寒实"
  },
  en: {
    cold: "Cold-leaning",
    heat: "Heat-leaning",
    unclearCH: "Cold/heat unclear",
    interior: "Interior-leaning",
    exterior: "Exterior-leaning",
    unclearIE: "Exterior/interior unclear",
    deficiency: "Deficiency-leaning",
    excess: "Excess-leaning",
    mixedDE: "Mixed deficiency/excess",
    yyUnclear: "Yin/yang unclear",
    yyYangDef: "Yang deficiency tendency",
    yyYinDefHeat: "Yin deficiency / deficiency-heat tendency",
    yyYangExHeat: "Excess heat / yang exuberance tendency",
    yyColdEx: "Cold-excess tendency"
  }
};

function epLabel(lang, key) {
  return EP_TEXT[lang][key] || key;
}

// ---------------------------
// Stage 1: Eight Principles scoring
// ---------------------------
function analyzeEightPrinciples(caseInput, lang) {
  const evidence = [];
  const score = {
    cold: 0, heat: 0,
    exterior: 0, interior: 0,
    deficiency: 0, excess: 0
  };

  const symptomIds = normalizeSymptomIds(caseInput);

  const add = (k, n, whyZh, whyEn) => {
    score[k] += n;
    const why = (lang === "en" ? whyEn : whyZh);
    evidence.push(`${why} → ${k} ${n > 0 ? "+" + n : n}`);
  };

  // Cold indicators
  if (symptomIds.includes("cold_aversion")) add("cold", 3, "畏寒肢冷/畏寒", "Cold intolerance / aversion to cold");
  if (symptomIds.includes("cold_limbs")) add("cold", 2, "手脚冰凉", "Cold limbs");
  if (symptomIds.includes("clear_long_urine")) add("cold", 1, "小便清长", "Clear copious urination");
  if (symptomIds.includes("loose_stool")) add("cold", 2, "便溏/溏薄", "Loose stools");

  // Heat indicators
  if (symptomIds.includes("short_red_urine")) add("heat", 2, "小便短赤", "Dark/scanty urine");
  if (symptomIds.includes("constipation")) add("heat", 2, "大便干结/便秘", "Dry constipation");
  if (symptomIds.includes("five_center_heat")) add("heat", 3, "五心烦热", "Five-center heat");
  if (symptomIds.includes("restlessness")) add("heat", 1, "烦躁", "Restlessness");
  if (symptomIds.includes("flushed_face")) add("heat", 2, "面色潮红", "Flushed face");
  if (symptomIds.includes("palm_sole_heat")) add("heat", 2, "手足心热（偏虚热）", "Heat in palms/soles (often deficiency-heat)");

  // Interior vs exterior (coarse)
  const duration = safeStr(caseInput.context?.duration);
  if (duration === "acute") add("exterior", 1, "急性病程", "Acute course");
  if (duration === "chronic") add("interior", 2, "慢性病程", "Chronic course");

  const interiorClues = ["constipation","loose_stool","short_red_urine","clear_long_urine"];
  if (symptomIds.some((x) => interiorClues.includes(x))) {
    add("interior", 2, "消化/二便相关症状", "Digestion/stool/urination-related symptoms");
  }

  // Deficiency vs excess
  if (symptomIds.includes("fatigue")) add("deficiency", 2, "乏力", "Fatigue");
  if (symptomIds.includes("lazy_low_energy")) add("deficiency", 2, "神疲懒言", "Lassitude / low energy");
  if (symptomIds.includes("pale_complexion")) add("deficiency", 1, "面色少华", "Pale complexion");

  // pain quality (context)
  const painQuality = safeStr(caseInput.context?.painQuality);
  if (painQuality === "dull") add("deficiency", 2, "隐痛喜按", "Dull pain relieved by pressure");
  if (painQuality === "distending") add("excess", 1, "胀痛/窜痛（偏实）", "Distending/migrating pain (often excess)");
  if (painQuality === "stabbing") add("excess", 2, "刺痛固定（偏实/瘀）", "Stabbing fixed pain (often excess/stasis)");
  if (painQuality === "refusePress") add("excess", 2, "拒按（偏实）", "Pain worsened by pressure (often excess)");

  // sweat / thirst
  const sweat = safeStr(caseInput.context?.sweat);
  if (sweat === "spontaneous") add("deficiency", 2, "自汗", "Spontaneous sweating");
  if (sweat === "night") add("heat", 1, "盗汗（可见虚热）", "Night sweats (may indicate deficiency-heat)");

  const thirst = safeStr(caseInput.context?.thirst);
  if (thirst === "warm") add("cold", 1, "喜热饮", "Prefers warm drinks");
  if (thirst === "cold") add("heat", 2, "口渴喜冷饮", "Thirst for cold drinks");
  if (thirst === "none") add("cold", 1, "不渴/不欲饮（偏寒或津不伤）", "No thirst (often cold or fluids not injured)");

  // tongue
  const tongueBody = safeStr(caseInput.tongue?.body);
  const coatColor = safeStr(caseInput.tongue?.coatColor);
  const coatQuality = safeStr(caseInput.tongue?.coatQuality);

  if (tongueBody === "pale") add("cold", 2, "舌质淡", "Pale tongue body");
  if (tongueBody === "red") add("heat", 2, "舌质红", "Red tongue body");
  if (tongueBody === "purple") add("excess", 2, "舌质暗紫（偏瘀/实）", "Purple/dusky tongue (often stasis/excess)");

  if (coatColor === "white") add("cold", 1, "苔白", "White coat");
  if (coatColor === "yellow") add("heat", 2, "苔黄", "Yellow coat");
  if (coatColor === "none") add("deficiency", 1, "少苔/剥苔（偏阴津不足）", "Scanty/peeled coat (often fluid/yin deficiency)");

  if (coatQuality === "greasy") add("excess", 1, "苔腻（痰湿偏实）", "Greasy coat (often phlegm/damp excess)");
  if (coatQuality === "thick") add("excess", 1, "苔厚（邪实/积滞）", "Thick coat (often excess/pathogen/food retention)");

  // pulse
  const pulseDepth = safeStr(caseInput.pulse?.depth);
  const pulseRate = safeStr(caseInput.pulse?.rate);
  const pulseShape = safeStr(caseInput.pulse?.shape);

  if (pulseDepth === "floating") add("exterior", 1, "脉浮", "Floating pulse");
  if (pulseDepth === "deep") add("interior", 1, "脉沉", "Deep pulse");
  if (pulseRate === "rapid") add("heat", 2, "脉数", "Rapid pulse");
  if (pulseRate === "slow") add("cold", 2, "脉迟", "Slow pulse");
  if (pulseShape === "thin") add("deficiency", 2, "脉细（偏虚）", "Thin pulse (often deficiency)");
  if (pulseShape === "slippery") add("excess", 1, "脉滑（痰湿偏实）", "Slippery pulse (often phlegm/damp)");

  const coldHeat =
    score.heat - score.cold >= 2 ? epLabel(lang, "heat") :
    score.cold - score.heat >= 2 ? epLabel(lang, "cold") :
    epLabel(lang, "unclearCH");

  const interiorExterior =
    score.interior - score.exterior >= 2 ? epLabel(lang, "interior") :
    score.exterior - score.interior >= 2 ? epLabel(lang, "exterior") :
    epLabel(lang, "unclearIE");

  const defExcess =
    score.deficiency - score.excess >= 2 ? epLabel(lang, "deficiency") :
    score.excess - score.deficiency >= 2 ? epLabel(lang, "excess") :
    epLabel(lang, "mixedDE");

  let yinYang = epLabel(lang, "yyUnclear");
  if (coldHeat === epLabel(lang, "cold") && defExcess === epLabel(lang, "deficiency")) yinYang = epLabel(lang, "yyYangDef");
  else if (coldHeat === epLabel(lang, "heat") && defExcess === epLabel(lang, "deficiency")) yinYang = epLabel(lang, "yyYinDefHeat");
  else if (coldHeat === epLabel(lang, "heat") && defExcess === epLabel(lang, "excess")) yinYang = epLabel(lang, "yyYangExHeat");
  else if (coldHeat === epLabel(lang, "cold") && defExcess === epLabel(lang, "excess")) yinYang = epLabel(lang, "yyColdEx");

  return {
    score,
    eightPrinciples: { coldHeat, interiorExterior, defExcess, yinYang },
    evidence
  };
}

// ---------------------------
// Stage 2: tag scoring + combo rules
// ---------------------------
function computeTagScores(symptomIds) {
  const scores = {};
  const ruleBySymptom = new Map();
  for (const r of SYMPTOM_TAG_RULES) ruleBySymptom.set(r.symptomId, r);

  for (const sid of symptomIds) {
    const r = ruleBySymptom.get(sid);
    if (!r) continue;
    for (const t of (r.core || [])) scores[t] = (scores[t] || 0) + 2;
    for (const t of (r.assist || [])) scores[t] = (scores[t] || 0) + 1;
  }

  for (const cr of COMBO_RULES) {
    const ok = (cr.whenAll || []).every((x) => symptomIds.includes(x));
    if (!ok) continue;
    for (const eff of (cr.effects || [])) {
      scores[eff.tag] = (scores[eff.tag] || 0) + (eff.delta || 0);
    }
  }

  return scores;
}

function constrainByEightPrinciples(tagScores, eight) {
  const scores = { ...tagScores };
  const adjust = (tags, delta) => {
    for (const t of tags) scores[t] = (scores[t] || 0) + delta;
  };

  // We constrain using Chinese tag keys (stable). This is internal scoring only.
  if (eight.coldHeat.includes("Cold") || eight.coldHeat.includes("偏寒")) {
    adjust(["阴虚火旺","里热偏盛","热结肠腑"], -3);
    adjust(["阳虚体质","肾阳不足","寒湿困脾"], +1);
  }
  if (eight.coldHeat.includes("Heat") || eight.coldHeat.includes("偏热")) {
    adjust(["阳虚体质","肾阳不足","寒湿困脾"], -2);
    adjust(["里热偏盛","湿热下注","阴虚火旺","热结肠腑"], +1);
  }
  if (eight.defExcess.includes("Deficiency") || eight.defExcess.includes("偏虚")) {
    adjust(["气血不足","脾气虚弱","肾阳不足","肾阴不足","心气不足"], +1);
  }
  if (eight.defExcess.includes("Excess") || eight.defExcess.includes("偏实")) {
    adjust(["痰热壅肺","寒湿困脾","里热偏盛"], +1);
  }

  return scores;
}

function buildBaseResult(tagScores, lang) {
  const entries = Object.entries(tagScores).sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 3);
  const topTags = top.map(([t]) => t);

  // explanation
  const explanationParts = [];
  for (const [t] of top) {
    const exp = tBi(TAG_EXPLANATIONS[t], lang);
    if (exp) explanationParts.push(`【${lang === "en" ? "Hint" : "提示"}: ${t}】 ${exp}`);
  }

  const explanation = explanationParts.length
    ? explanationParts.join(" ")
    : (lang === "en"
        ? "Not enough information to form a stable pattern hint. Consider adding tongue/pulse and course details."
        : "当前信息不足以提示稳定的证候方向，需结合舌象、脉象与病程综合判断。");

  // treatment text
  const principleList = [];
  const acuList = [];
  const herbList = [];
  for (const [t] of top) {
    const tpl = TAG_TREATMENT[t];
    if (!tpl) continue;
    const p = tBi(tpl.principle, lang);
    const a = tBi(tpl.acupuncture, lang);
    const h = tBi(tpl.herbal, lang);
    if (p) principleList.push(p);
    if (a) acuList.push(a);
    if (h) herbList.push(h);
  }

  const principle = principleList.length
    ? principleList.join(" ")
    : (lang === "en"
        ? "Consider a direction based on the strongest pattern hints, but a clinician’s evaluation is required."
        : (topTags.length ? `可从 ${topTags.join("、")} 等方向粗略考虑治法，具体仍需面诊综合判断。` : "建议先完善关键证据（舌/脉/寒热虚实/病程），再做辨证复核。"));

  const acupuncture = acuList.length
    ? acuList.join(" ")
    : (lang === "en"
        ? "No acupoint prescription here. Acupuncture planning requires in-person pattern differentiation."
        : "针灸取穴需结合经络循行与体质，由面诊辨证加减，不宜据此自行操作。");

  const herbal = herbList.length
    ? herbList.join(" ")
    : (lang === "en"
        ? "No herbal prescription here. Herbal planning requires licensed clinical assessment."
        : "方药配伍必须由合格中医师结合舌脉与体质后决定，本系统不提供处方。");

  // Pattern line: for EN we keep tag keys but keep everything else EN (you can later add tag->enName mapping if you want)
  const title = (lang === "en" ? "Pattern review (for learning)" : "辨证复核示意（自用）");
  const pattern =
    topTags.length
      ? (lang === "en"
          ? `Tendency: ${topTags.join(", ")} (illustrative; not a diagnosis)`
          : `倾向：${topTags.join("、")}（示意，不作诊断）`)
      : (lang === "en"
          ? "No stable tendency formed (illustrative)"
          : "未形成稳定倾向（示意）");

  const warning =
    (lang === "en"
      ? "For learning/self-check only. Not a diagnosis or medical advice."
      : "本结果仅用于学习与自我复核，不构成诊断或处方依据。");

  return {
    title,
    pattern,
    topTags,
    rawScores: tagScores,
    explanation,
    principle,
    acupuncture,
    herbal,
    warning
  };
}

async function attachAINotes(baseResult, caseInput) {
  if (!OPENAI_KEY) {
    return { ...baseResult, aiError: "Backend is missing OPENAI_API_KEY/KEYFORTCM; AI notes disabled." };
  }

  try {
    const lang = normalizeLang(caseInput.lang);
    const symptomIds = normalizeSymptomIds(caseInput);
    const namesZh = symptomIds.map((id) => symptomById.get(id)?.zh).filter(Boolean);
    const namesEn = symptomIds.map((id) => symptomById.get(id)?.en).filter(Boolean);

    const mainSymptoms = lang === "en"
      ? (namesEn.length ? namesEn.join(", ") : "(selected symptoms)")
      : (namesZh.length ? namesZh.join("、") : "（已选症状）");

    const ep = caseInput._eightPrinciplesText || "";

    const promptZh = `
你是一位有多年临床经验的中医师兼针灸师。请用不超过180字的简体中文，向普通病人解释：
- 症状：${mainSymptoms}
- 八纲倾向：${ep}
- 系统倾向证素：${(baseResult.topTags || []).join("、")}
要求：只能说“可能/倾向/可以从…考虑”，不下诊断；不报方名/药名/穴位名；结尾必须提醒：仅作一般性说明，不能作为诊断或用药依据，如有不适请及时就医。
只输出一段话。
`.trim();

    const promptEn = `
You are an experienced TCM clinician/acupuncturist. Write <=120 words in English for a lay patient:
- Symptoms: ${mainSymptoms}
- Eight Principles tendency: ${ep}
- Pattern hints: ${(baseResult.topTags || []).join(", ")}
Constraints: use "may/possibly/tend to" only; no definitive diagnosis; no formula/herb/acupoint names; end with:
"This is a general explanation only and not a diagnosis or medical advice. Seek care if unwell."
Output only the paragraph.
`.trim();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: lang === "en" ? promptEn : promptZh
    });

    const aiText = (response.output_text || "").trim();
    return { ...baseResult, aiNotes: aiText || (lang === "en" ? "(AI unavailable)" : "（AI 暂不可用）") };
  } catch (err) {
    return { ...baseResult, aiError: "AI notes failed: " + (err?.message || String(err)) };
  }
}

// ---------------------------
// API handler
// ---------------------------
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  try {
    const caseInput = req.body || {};
    const lang = normalizeLang(caseInput.lang);
    const symptomIds = normalizeSymptomIds(caseInput);

    if (symptomIds.length < 2) {
      const base = (lang === "en")
        ? {
            title: "Not enough information",
            pattern: "Select more symptoms for a meaningful self-check.",
            explanation: "In practice, pattern differentiation requires multiple key symptoms plus tongue/pulse and course.",
            principle: "Add more findings and try again.",
            acupuncture: "No acupoint advice here.",
            herbal: "No herbal advice here.",
            warning: "Self-check only. Not a diagnosis or medical advice."
          }
        : {
            title: "信息不足",
            pattern: "症状过少，难以做稳定复核。",
            explanation: "临床辨证通常需要多条主症与兼症，并结合舌象脉象与病程综合判断。",
            principle: "建议补充症状与舌脉信息后再试。",
            acupuncture: "此时不宜给出取穴建议。",
            herbal: "此时不宜给出用药建议。",
            warning: "仅用于自我复核学习，不作诊断处方。"
          };
      return res.status(200).json(base);
    }

    const eight = analyzeEightPrinciples(caseInput, lang);
    const rawTagScores = computeTagScores(symptomIds);
    const constrainedScores = constrainByEightPrinciples(rawTagScores, eight.eightPrinciples);

    const baseResult = buildBaseResult(constrainedScores, lang);

    const epText =
      `${eight.eightPrinciples.coldHeat} / ${eight.eightPrinciples.interiorExterior} / ${eight.eightPrinciples.defExcess} / ${eight.eightPrinciples.yinYang}`;

    const caseWithEight = { ...caseInput, _eightPrinciplesText: epText };
    const enriched = await attachAINotes(baseResult, caseWithEight);

    return res.status(200).json({
      ...enriched,
      eightPrinciples: eight.eightPrinciples,
      eightScores: eight.score,
      eightEvidence: eight.evidence
    });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Server error", detail: err?.message || String(err) });
  }
}


