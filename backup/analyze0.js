// pages/api/analyze.js

import OpenAI from "openai";
import {
  TCM_SYMPTOM_FEATURES,
  TAG_EXPLANATIONS,
  TAG_TREATMENT
} from "../../lib/tcmFeatures";

// ✅ 统一用 OPENAI_API_KEY（别再用 KEYFORTCM）
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ==============================
// 计算标签得分（主症2分，兼症1分）
// ==============================
function calculateTagScores(symptomNames) {
  const uniqueNames = Array.from(new Set(symptomNames || []));
  const scores = {};

  for (const row of TCM_SYMPTOM_FEATURES) {
    if (!uniqueNames.includes(row.name)) continue;

    if (Array.isArray(row.coreTags)) {
      for (const tag of row.coreTags) {
        if (!tag) continue;
        scores[tag] = (scores[tag] || 0) + 2;
      }
    }
    if (Array.isArray(row.assistTags)) {
      for (const tag of row.assistTags) {
        if (!tag) continue;
        scores[tag] = (scores[tag] || 0) + 1;
      }
    }
  }

  return scores;
}

// ==============================
// 构建辨证基础内容（用 TAG_EXPLANATIONS + TAG_TREATMENT）
// ==============================
function buildBaseResultFromScores(tagScores) {
  const entries = Object.entries(tagScores).sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 3);
  const topTags = top.map(([tag]) => tag);

  // 证素解释
  const explanationParts = [];
  for (const [tag] of top) {
    if (TAG_EXPLANATIONS?.[tag]) {
      explanationParts.push(`【${tag}】${TAG_EXPLANATIONS[tag]}`);
    }
  }
  const explanation =
    explanationParts.length > 0
      ? explanationParts.join(" ")
      : "当前症状组合尚不足以提示明确的证候方向，需结合舌脉及病程综合判断。";

  // 治法 / 针灸 / 中药方向
  const principleList = [];
  const acuList = [];
  const herbalList = [];

  for (const [tag] of top) {
    const tpl = TAG_TREATMENT?.[tag];
    if (!tpl) continue;
    if (tpl.principle) principleList.push(tpl.principle);
    if (tpl.acupuncture) acuList.push(tpl.acupuncture);
    if (tpl.herbal) herbalList.push(tpl.herbal);
  }

  const principle =
    principleList.length > 0
      ? principleList.join(" ")
      : topTags.length
        ? `可从 ${topTags.join("、")} 等方向粗略考虑治法，具体仍需由中医师在面诊时综合判断。`
        : "可先从寒热虚实、气血津液及脏腑相关性做初步学习性分析，仍需四诊合参。";

  const acupuncture =
    acuList.length > 0
      ? acuList.join(" ")
      : "针刺方向多根据证素偏向，结合经络循行及体质，由中医师辨证取穴，不宜据此自行操作。";

  const herbal =
    herbalList.length > 0
      ? herbalList.join(" ")
      : "方药方向只能作原则性提示，不能据此自行选药或调方，仍须合格中医师处方。";

  return {
    title: "基于症状组合的示意性辨证方向",
    pattern:
      topTags.length > 0
        ? `当前症状提示：${topTags.join("、")} 等方向（学习性示意，不作诊断）`
        : "症状组合尚无法提示明确方向",
    topTags,
    rawScores: tagScores,
    explanation,
    principle,
    acupuncture,
    herbal,
    warning:
      "本内容仅用于中医理论学习与沟通参考，不构成任何诊断或治疗依据。如有不适，应及时就医或面诊中医师。"
  };
}

// ==============================
// AI（Responses API）说明：失败不让接口挂
// ==============================
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
- 治法方向（仅供参考）：${baseResult.principle}

要求：
1）只能说“可能与……有关”“可以从……角度考虑”等，不能给出确切诊断。
2）不要出现具体方剂名和药名、不要出现具体穴位名；只能提到原则性用语（如疏肝理气、健脾和胃、补益气血、滋阴降火、化痰祛湿、活血通络等）。
3）提醒需要结合舌象、脉象和整体体质，由面诊中医师进一步辨证。
4）结尾必须有一句：以上解释仅作中医角度的一般性说明，不能作为诊断或用药依据，如有不适请及时就医。

只输出这一小段说明，不要解释你的思路。
    `.trim();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    const aiText = (response.output_text || "").trim();

    return {
      ...baseResult,
      aiNotes: aiText || "（AI 解释暂时不可用。）"
    };
  } catch (err) {
    return {
      ...baseResult,
      aiError: "AI 说明生成失败：" + (err?.message || String(err))
    };
  }
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  try {
    const { symptoms } = req.body || {};
    const list = Array.isArray(symptoms) ? symptoms : [];

    const names = list
      .map((s) => s && s.symptom)
      .filter((x) => typeof x === "string" && x.trim().length > 0);

    // ✅ 稳：症状太少给结构化提示，不报错
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
      return res.status(200).json({ success: true, selectedSymptoms: names, ...enriched });
    }

    const tagScores = calculateTagScores(names);
    const hasScore = Object.keys(tagScores).length > 0;

    let baseResult;
    if (hasScore) {
      baseResult = buildBaseResultFromScores(tagScores);
    } else {
      // ✅ 稳：规则表没命中也返回可读结果
      baseResult = {
        title: "简单学习提示",
        pattern: "所选症状可从多种证候角度考虑",
        topTags: [],
        rawScores: tagScores,
        explanation:
          "当前选择的症状组合未能在系统已有的经验规则中匹配到明确方向，实际辨证需结合寒热、虚实、表里、气血津液、舌脉等多方面综合判断。",
        principle:
          '建议以“四诊合参”为主，本接口仅作为“按部位收集症状 + 粗略提示”的学习工具。',
        acupuncture:
          "可结合常用取穴思路按部位与经络考虑，但具体仍需面诊辨证后决定，不宜据此自行操作。",
        herbal:
          "方药配伍必须由合格中医师根据个人体质与舌脉综合判定，不能仅凭本系统自动生成内容用药。",
        warning:
          "本接口仅作中医教育演示，不用于具体诊断或处方。任何严重或持续症状需及时就医。"
      };
    }

    const enriched = await attachAINotes(baseResult, list);

    return res.status(200).json({
      success: true,
      selectedSymptoms: names,
      ...enriched
    });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({
      error: "服务器内部错误",
      detail: err?.message || String(err)
    });
  }
}
