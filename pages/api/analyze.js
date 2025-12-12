// pages/api/analyze.js
import OpenAI from "openai";
import {
  SYMPTOMS,
  SYMPTOM_TAG_RULES,
  COMBO_RULES,
  TAG_EXPLANATIONS,
  TAG_TREATMENT
} from "../../lib/data";

// ✅ key 双兼容：以后你只要保证至少设一个就行
const OPENAI_KEY = process.env.OPENAI_API_KEY || process.env.KEYFORTCM || "";

const client = new OpenAI({
  apiKey: OPENAI_KEY
});

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
// Stage 1: Eight Principles scoring
// ---------------------------
function analyzeEightPrinciples(caseInput) {
  const evidence = [];
  const score = {
    cold: 0, heat: 0,
    exterior: 0, interior: 0,
    deficiency: 0, excess: 0
  };

  const symptomIds = normalizeSymptomIds(caseInput);

  const add = (k, n, why) => {
    score[k] += n;
    evidence.push(`${why} → ${k} ${n > 0 ? "+" + n : n}`);
  };

  // Cold indicators
  if (symptomIds.includes("cold_aversion")) add("cold", 3, "畏寒肢冷/畏寒");
  if (symptomIds.includes("cold_limbs")) add("cold", 2, "手脚冰凉");
  if (symptomIds.includes("clear_long_urine")) add("cold", 1, "小便清长");
  if (symptomIds.includes("loose_stool")) add("cold", 2, "便溏/溏薄");

  // Heat indicators
  if (symptomIds.includes("short_red_urine")) add("heat", 2, "小便短赤");
  if (symptomIds.includes("constipation")) add("heat", 2, "大便干结/便秘");
  if (symptomIds.includes("five_center_heat")) add("heat", 3, "五心烦热");
  if (symptomIds.includes("restlessness")) add("heat", 1, "烦躁");
  if (symptomIds.includes("flushed_face")) add("heat", 2, "面色潮红");
  if (symptomIds.includes("palm_sole_heat")) add("heat", 2, "手足心热（偏虚热）");

  // Interior vs exterior (very coarse; you can expand with wind-cold/heat symptoms later)
  const duration = safeStr(caseInput.context?.duration);
  if (duration === "acute") add("exterior", 1, "急性病程");
  if (duration === "chronic") add("interior", 2, "慢性病程");

  const interiorClues = ["constipation","loose_stool","short_red_urine","clear_long_urine"];
  if (symptomIds.some((x) => interiorClues.includes(x))) add("interior", 2, "消化/二便相关症状");

  // Deficiency vs excess
  if (symptomIds.includes("fatigue")) add("deficiency", 2, "乏力");
  if (symptomIds.includes("lazy_low_energy")) add("deficiency", 2, "神疲懒言");
  if (symptomIds.includes("pale_complexion")) add("deficiency", 1, "面色少华");

  // pain quality (context)
  const painQuality = safeStr(caseInput.context?.painQuality);
  if (painQuality === "dull") add("deficiency", 2, "隐痛喜按");
  if (painQuality === "distending") add("excess", 1, "胀痛/窜痛（偏实）");
  if (painQuality === "stabbing") add("excess", 2, "刺痛固定（偏实/瘀）");
  if (painQuality === "refusePress") add("excess", 2, "拒按（偏实）");

  // sweat / thirst
  const sweat = safeStr(caseInput.context?.sweat);
  if (sweat === "spontaneous") add("deficiency", 2, "自汗");
  if (sweat === "night") add("heat", 1, "盗汗（可见虚热）");

  const thirst = safeStr(caseInput.context?.thirst);
  if (thirst === "warm") add("cold", 1, "喜热饮");
  if (thirst === "cold") add("heat", 2, "口渴喜冷饮");
  if (thirst === "none") add("cold", 1, "不渴/不欲饮（偏寒或津不伤）");

  // tongue
  const tongueBody = safeStr(caseInput.tongue?.body);
  const coatColor = safeStr(caseInput.tongue?.coatColor);
  const coatQuality = safeStr(caseInput.tongue?.coatQuality);

  if (tongueBody === "pale") add("cold", 2, "舌质淡");
  if (tongueBody === "red") add("heat", 2, "舌质红");
  if (tongueBody === "purple") add("excess", 2, "舌质暗紫（偏瘀/实）");

  if (coatColor === "white") add("cold", 1, "苔白");
  if (coatColor === "yellow") add("heat", 2, "苔黄");
  if (coatColor === "none") add("deficiency", 1, "少苔/剥苔（偏阴津不足）");

  if (coatQuality === "greasy") add("excess", 1, "苔腻（痰湿偏实）");
  if (coatQuality === "thick") add("excess", 1, "苔厚（邪实/积滞）");

  // pulse
  const pulseDepth = safeStr(caseInput.pulse?.depth);
  const pulseRate = safeStr(caseInput.pulse?.rate);
  const pulseShape = safeStr(caseInput.pulse?.shape);

  if (pulseDepth === "floating") add("exterior", 1, "脉浮");
  if (pulseDepth === "deep") add("interior", 1, "脉沉");
  if (pulseRate === "rapid") add("heat", 2, "脉数");
  if (pulseRate === "slow") add("cold", 2, "脉迟");
  if (pulseShape === "thin") add("deficiency", 2, "脉细（偏虚）");
  if (pulseShape === "slippery") add("excess", 1, "脉滑（痰湿偏实）");

  const coldHeat = score.heat - score.cold >= 2 ? "偏热" : score.cold - score.heat >= 2 ? "偏寒" : "寒热不明";
  const interiorExterior = score.interior - score.exterior >= 2 ? "偏里" : score.exterior - score.interior >= 2 ? "偏表" : "表里不明";
  const defExcess = score.deficiency - score.excess >= 2 ? "偏虚" : score.excess - score.deficiency >= 2 ? "偏实" : "虚实夹杂";

  let yinYang = "阴阳不明";
  if (coldHeat === "偏寒" && defExcess === "偏虚") yinYang = "偏阳虚";
  else if (coldHeat === "偏热" && defExcess === "偏虚") yinYang = "偏阴虚/虚热";
  else if (coldHeat === "偏热" && defExcess === "偏实") yinYang = "偏阳盛/实热";
  else if (coldHeat === "偏寒" && defExcess === "偏实") yinYang = "偏寒实";

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

  if (eight.coldHeat === "偏寒") {
    adjust(["阴虚火旺","里热偏盛","热结肠腑"], -3);
    adjust(["阳虚体质","肾阳不足","寒湿困脾"], +1);
  }
  if (eight.coldHeat === "偏热") {
    adjust(["阳虚体质","肾阳不足","寒湿困脾"], -2);
    adjust(["里热偏盛","湿热下注","阴虚火旺","热结肠腑"], +1);
  }
  if (eight.defExcess === "偏虚") {
    adjust(["气血不足","脾气虚弱","肾阳不足","肾阴不足","心气不足"], +1);
  }
  if (eight.defExcess === "偏实") {
    adjust(["痰热壅肺","寒湿困脾","里热偏盛"], +1);
  }

  return scores;
}

function buildBaseResult(tagScores) {
  const entries = Object.entries(tagScores).sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 3);
  const topTags = top.map(([t]) => t);

  const explanationParts = [];
  for (const [t] of top) {
    if (TAG_EXPLANATIONS[t]) explanationParts.push(`【${t}】${TAG_EXPLANATIONS[t]}`);
  }

  const explanation = explanationParts.length
    ? explanationParts.join(" ")
    : "当前信息不足以提示稳定的证候方向，需结合舌象、脉象与病程综合判断。";

  const principleList = [];
  const acuList = [];
  const herbList = [];
  for (const [t] of top) {
    const tpl = TAG_TREATMENT[t];
    if (!tpl) continue;
    if (tpl.principle) principleList.push(tpl.principle);
    if (tpl.acupuncture) acuList.push(tpl.acupuncture);
    if (tpl.herbal) herbList.push(tpl.herbal);
  }

  const principle = principleList.length
    ? principleList.join(" ")
    : topTags.length ? `可从 ${topTags.join("、")} 等方向粗略考虑治法，具体仍需面诊综合判断。`
      : "建议先完善关键证据（舌/脉/寒热虚实/病程），再做辨证复核。";

  const acupuncture = acuList.length
    ? acuList.join(" ")
    : "针灸取穴需结合经络循行与体质，由面诊辨证加减，不宜据此自行操作。";

  const herbal = herbList.length
    ? herbList.join(" ")
    : "方药配伍必须由合格中医师结合舌脉与体质后决定，本系统不提供处方。";

  return {
    title: "辨证复核示意（自用）",
    pattern: topTags.length ? `倾向：${topTags.join("、")}（示意，不作诊断）` : "未形成稳定倾向（示意）",
    topTags,
    rawScores: tagScores,
    explanation,
    principle,
    acupuncture,
    herbal,
    warning: "本结果仅用于学习与自我复核，不构成诊断或处方依据。"
  };
}

async function attachAINotes(baseResult, caseInput) {
  if (!OPENAI_KEY) {
    return { ...baseResult, aiError: "后端未配置 OPENAI_API_KEY/KEYFORTCM，AI 说明暂不可用。" };
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
    return { ...baseResult, aiError: "AI 说明生成失败：" + (err?.message || String(err)) };
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
      const base = {
        title: lang === "en" ? "Not enough information" : "信息不足",
        pattern: lang === "en" ? "Select more symptoms for a meaningful self-check." : "症状过少，难以做稳定复核。",
        explanation: lang === "en"
          ? "In practice, pattern differentiation needs multiple key symptoms plus tongue/pulse and course."
          : "临床辨证通常需要多条主症与兼症，并结合舌象脉象与病程综合判断。",
        principle: lang === "en" ? "Add more findings and try again." : "建议补充症状与舌脉信息后再试。",
        acupuncture: lang === "en" ? "No acupoint advice here." : "此时不宜给出取穴建议。",
        herbal: lang === "en" ? "No herbal advice here." : "此时不宜给出用药建议。",
        warning: lang === "en"
          ? "Self-check only. Not diagnosis or medical advice."
          : "仅用于自我复核学习，不作诊断处方。"
      };
      return res.status(200).json(base);
    }

    const eight = analyzeEightPrinciples(caseInput);
    const rawTagScores = computeTagScores(symptomIds);
    const constrainedScores = constrainByEightPrinciples(rawTagScores, eight.eightPrinciples);
    const baseResult = buildBaseResult(constrainedScores);

    const epText = `${eight.eightPrinciples.coldHeat}/${eight.eightPrinciples.interiorExterior}/${eight.eightPrinciples.defExcess}/${eight.eightPrinciples.yinYang}`;
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

