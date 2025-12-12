import OpenAI from "openai";
import { TCM_SYMPTOM_FEATURES } from "../../lib/tcmFeatures";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 根据症状名字数组计算各个“证素标签”的分数
function computeTagScores(symptomNames) {
  const uniqueNames = Array.from(new Set(symptomNames || []));
  const tagScores = {};

  for (const feature of TCM_SYMPTOM_FEATURES) {
    if (!uniqueNames.includes(feature.name)) continue;

    if (Array.isArray(feature.coreTags)) {
      for (const tag of feature.coreTags) {
        if (!tag) continue;
        tagScores[tag] = (tagScores[tag] || 0) + 2; // 主症 2 分
      }
    }

    if (Array.isArray(feature.assistTags)) {
      for (const tag of feature.assistTags) {
        if (!tag) continue;
        tagScores[tag] = (tagScores[tag] || 0) + 1; // 兼症 1 分
      }
    }
  }

  return tagScores;
}

// 一些常用标签的简单中文说明，用于拼接 explanation
const TAG_EXPLANATIONS = {
  "肝阳偏亢": "多见头晕头痛、急躁易怒，可理解为肝阳上扰清窍。",
  "肝气郁结": "多与情志抑郁、胸胁不舒有关，为肝疏泄失常所致。",
  "肝火偏旺": "多见烦躁易怒、口苦目赤等，属于肝郁化火。",
  "肾精不足": "多表现腰膝酸软、耳鸣健忘等，为肾精亏虚。",
  "肾阳不足": "怕冷肢冷、腰膝酸软，属阳气不足、温煦失职。",
  "肾阴不足": "五心烦热、盗汗、腰膝酸软，多为肾阴亏虚、虚热内生。",
  "心气不足": "心悸气短、乏力懒言，多为心气虚弱、推动无力。",
  "心血不足": "心悸健忘、失眠多梦、面色少华，多属心血不足。",
  "心阴不足": "心烦失眠、盗汗、多梦，多为心阴亏虚、虚火扰心。",
  "心火偏旺": "心烦易怒、口舌生疮、失眠，多属心火亢盛。",
  "心神不宁": "多梦易醒、心悸不安，为心神失养或被扰动。",
  "脾气虚弱": "乏力、纳呆、便溏，多为脾运化无力。",
  "脾阳虚": "畏寒肢冷、便溏不化，多为脾阳不足、运化失职。",
  "肺气不足": "气短懒言、易感冒，为肺气虚弱、卫外不固。",
  "肝胃不和": "胃脘胀痛、嗳气频作，多由肝气犯胃、胃失和降。",
  "胃气不和": "胃脘不舒、嗳气反酸，为胃失和降。",
  "胃气上逆": "反酸、烧心，为胃气上逆于上。",
  "食滞胃肠": "腹胀、纳呆、嗳腐吞酸，多见于饮食停滞。",
  "湿阻中焦": "腹胀、身重困倦，为湿邪困阻中焦、气机不畅。",
  "痰浊中阻": "头重如裹、胸闷痰多，为痰浊上蒙清窍或壅阻气机。",
  "痰热壅肺": "咳嗽痰黄黏、咽喉肿痛，多为痰热壅肺。",
  "寒痰内盛": "痰白清稀、畏寒肢冷，多属寒痰、阳虚。",
  "气血不足": "面色少华、乏力心悸，为气不足以行血、血不足以濡养。",
  "血瘀内阻": "刺痛固定、经色紫暗有块，多为瘀血阻络。",
  "水湿内停": "水肿、体重增加，多为水湿停聚。",
  "卫气不固": "动则汗出、易感风邪，多属卫外失固。",
  "阳虚体质": "畏寒肢冷、小便清长，多属阳虚体质。",
  "阴虚火旺": "五心烦热、盗汗、口干咽燥，为阴虚不能制阳。",
  "里热偏盛": "口渴喜冷饮、小便短赤，多属里热偏盛。",
  "寒凝胞宫": "小腹冷痛、经行腹痛，多为寒邪凝滞冲任。",
  "气滞": "胀痛、窜痛多，与气机郁滞有关。",
  "湿热下注": "小便短赤、下焦不适，多属湿热下注。",
  "风寒外袭": "恶寒、头痛、身痛，为风寒束表。",
  "风热犯肺": "发热、咳嗽、咽痛，多为风热犯肺。",
  "肠燥津亏": "大便干结、口干，多为津液不足。",
  "热结肠腑": "便秘、腹痛拒按，多为实热结滞于肠腑。"
};

// 根据标签分数生成一个基础结果对象
function buildBaseResultFromScores(tagScores, symptomNames) {
  const entries = Object.entries(tagScores).sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 3);
  const topTags = top.map(([tag]) => tag);
  const topDesc = top.map(([tag, score]) => `${tag}（${score}分）`).join("，");

  let explanationParts = [];
  for (const [tag] of top) {
    if (TAG_EXPLANATIONS[tag]) {
      explanationParts.push(`【${tag}】${TAG_EXPLANATIONS[tag]}`);
    }
  }

  const explanation =
    explanationParts.length > 0
      ? explanationParts.join(" ")
      : "当前选择的症状组合可能涉及气血、阴阳、脏腑功能等多方面失调，需结合舌象、脉象及病程综合判断。";

  const principle = `可从 ${topTags.join("、")} 等方向粗略考虑治法思路，具体仍需由面诊中医师结合“四诊合参”决定。`;

  const acupuncture =
    "针灸取穴上，可根据不同证素方向，酌情从疏肝解郁、健脾和胃、补肾扶阳、清热化痰、活血通络等原则选穴，由医师辨证加减。";

  const herbal =
    "中药方药的具体配伍必须由合格中医师在面诊、结合舌脉与体质后决定，本系统不直接给出处方，仅提示大致方向。";

  return {
    title: "基于症状组合的示意性辨证方向",
    pattern:
      topTags.length > 0
        ? `当前症状组合提示：${topTags.join("、")} 等方向（仅作示意，不作诊断）`
        : "当前症状组合尚难以提示明确的证候方向",
    topTags,
    rawScores: tagScores,
    explanation,
    principle,
    acupuncture,
    herbal,
    warning:
      "本结果仅用于中医理论学习和交流示意，不构成任何诊断或处方依据。如有明显或持续不适，请及时就医或面诊专业医师。"
  };
}

// 把 AI 生成的说明附加到结果上（有经验中医对病人解释）
async function attachAINotes(baseResult, symptoms) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      ...baseResult,
      aiError: "后端未配置 OPENAI_API_KEY，AI 说明暂不可用。"
    };
  }

  try {
    const names = (symptoms || [])
      .map((s) => s && s.symptom)
      .filter(Boolean);
    const mainSymptoms = names.length ? names.join("、") : "（前端选择的症状）";

    const patternText = Array.isArray(baseResult.topTags)
      ? baseResult.topTags.join("、")
      : baseResult.pattern || "";

    const prompt = `
你是一位有多年临床经验的中医师兼针灸师，现在要用通俗但稳重的语气，向一位普通病人解释他的情况，从中医角度“可能”意味着什么。

请根据下面信息，用不超过 180 字的简体中文，写一段对病人说的话：
- 症状：${mainSymptoms}
- 系统粗略推断的中医方向（仅供参考）：${patternText}
- 系统辨证思路要点（仅供参考）：${baseResult.explanation}

要求：
1）只能说“可能与……有关”“可以从……角度考虑”等，不能给出确切诊断。
2）不要出现具体方剂名和药名，只能提到“疏肝理气、健脾和胃、补益气血、滋阴降火、化痰祛湿、活血通络”等这类原则性用语。
3）提醒病人需要结合舌象、脉象和整体体质，由面诊中医师进一步辨证。
4）结尾必须有一句：以上解释仅作中医角度的一般性说明，不能作为诊断或用药依据，如有不适请及时就医。

只输出这一小段说明，不要解释你的思路。
    `.trim();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    const aiText = response.output_text;

    return {
      ...baseResult,
      aiNotes: aiText
    };
  } catch (err) {
    return {
      ...baseResult,
      aiError: "AI 说明生成失败：" + (err?.message || String(err))
    };
  }
}

export default async function handler(req, res) {
  // 简单 CORS 处理
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { symptoms } = req.body || {};
    const list = Array.isArray(symptoms) ? symptoms : [];

    const names = list
      .map((s) => s && s.symptom)
      .filter((x) => typeof x === "string" && x.trim().length > 0);

    // 症状太少：给一个“信息不足”的通用提示
    if (names.length < 2) {
      const baseResult = {
        title: "信息不足的简单提示",
        pattern: "症状数量偏少，难以进行可靠的辨证分析",
        explanation:
          "仅凭 1 条或极少数症状，很难在系统中进行有意义的中医辨证判断。临床上通常需要结合多条主症与兼症，并配合舌象、脉象等“四诊”综合分析。",
        principle:
          "建议在工具中多勾选一些伴随症状，或在学习时结合典型病例一并思考，仅作中医理论练习使用。",
        acupuncture:
          "此时不宜给出具体针灸配穴，仅可提醒：实际临床取穴需由中医师在面诊后综合决定。",
        herbal:
          "中药处方必须由合格中医师在详细问诊、望舌切脉后决定，不能根据单一症状推断。",
        warning:
          "本工具仅作中医教育演示，不用于诊断或用药。如有持续或明显不适，请及时就医或面诊中医师。"
      };

      const enriched = await attachAINotes(baseResult, list);
      return res.status(200).json(enriched);
    }

    // 计算标签分数
    const tagScores = computeTagScores(names);

    // 如果一个标签都没打上分，走兜底逻辑
    const hasScore = Object.keys(tagScores).length > 0;

    let baseResult;
    if (hasScore) {
      baseResult = buildBaseResultFromScores(tagScores, names);
    } else {
      baseResult = {
        title: "简单学习提示",
        pattern: "所选症状可从多种证候角度考虑",
        explanation:
          "当前选择的症状组合未能在系统已有的经验规则中匹配到明确方向，实际辨证需结合寒热、虚实、表里、气血津液、舌脉等多方面综合判断。",
        principle:
          '建议以“四诊合参”为主，本接口仅作为“按部位收集症状 + 粗略提示”的学习工具。',
        acupuncture:
          "可结合常用配穴思路：头面病变考虑合谷、太冲、百会；胸胁不舒考虑膻中、期门、内关；腹部胀痛考虑中脘、天枢、关元等，由中医师具体加减。",
        herbal:
          "方药配伍必须由合格中医师根据个人体质与舌脉脉象综合判定，不能仅凭本系统自动生成的内容用药。",
        warning:
          "本接口仅作中医教育演示，不用于具体诊断或处方。任何严重或持续症状需及时就医。"
      };
    }

    const enriched = await attachAINotes(baseResult, list);
    return res.status(200).json(enriched);
  } catch (err) {
    console.error("API error:", err);
    return res
      .status(500)
      .json({ error: "服务器内部错误", detail: err?.message || String(err) });
  }
}
