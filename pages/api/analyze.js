// pages/api/analyze.js
//new

import OpenAI from "openai";
import {
  TCM_SYMPTOM_FEATURES,
  TAG_EXPLANATIONS,
  TAG_TREATMENT
} from "../../lib/tcmFeatures";

const client = new OpenAI({
  // 这里用你在 Vercel 环境变量里设的名字，之前你说用 KEYFORTCM
  apiKey: process.env.KEYFORTCM
});

export default async function handler(req, res) {
  // 简单 CORS，可要可不要，看你前端部署情况
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
    if (!Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: "No symptoms provided" });
    }

    const names = symptoms
      .map((s) => s && s.symptom)
      .filter((x) => typeof x === "string" && x.trim().length > 0);

    const tagScores = calculateTagScores(names);
    const baseResult = buildBaseResultFromScores(tagScores, names);
    const aiNotes = await callAIForExplanation(names, baseResult);

    return res.status(200).json({
      success: true,
      selectedSymptoms: names,
      ...baseResult,
      aiNotes
    });
  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({
      error: "Server error",
      detail: err?.message || String(err)
    });
  }
}

// ==============================
// 计算标签得分
// ==============================
function calculateTagScores(names) {
  const scores = {};

  for (const symptom of names) {
    for (const row of TCM_SYMPTOM_FEATURES) {
      if (row.name !== symptom) continue;

      if (Array.isArray(row.coreTags)) {
        for (const tag of row.coreTags) {
          scores[tag] = (scores[tag] || 0) + 2; // 主症 +2
        }
      }
      if (Array.isArray(row.assistTags)) {
        for (const tag of row.assistTags) {
          scores[tag] = (scores[tag] || 0) + 1; // 兼症 +1
        }
      }
    }
  }

  return scores;
}

// ==============================
// 构建辨证基础内容
// ==============================
function buildBaseResultFromScores(tagScores, symptomNames) {
  const entries = Object.entries(tagScores).sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 3);
  const topTags = top.map(([tag]) => tag);

  // 证素解释
  const explanationParts = [];
  for (const [tag] of top) {
    if (TAG_EXPLANATIONS[tag]) {
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
    const tpl = TAG_TREATMENT[tag];
    if (!tpl) continue;
    if (tpl.principle) principleList.push(tpl.principle);
    if (tpl.acupuncture) acuList.push(tpl.acupuncture);
    if (tpl.herbal) herbalList.push(tpl.herbal);
  }

  const principle =
    principleList.length > 0
      ? principleList.join(" ")
      : `可从 ${topTags.join("、")} 等方向粗略考虑治法，具体仍需由中医师在面诊时综合判断。`;

  const acupuncture =
    acuList.length > 0
      ? acuList.join(" ")
      : "针刺方向多根据证素偏向，结合经络循行及体质，由中医师辨证取穴，不宜据此自行操作。";

  const herbal =
    herbalList.length > 0
      ? herbalList.join(" ")
      : "方药方向只能作原则性提示，不能据此自行选药或调方，仍须合格中医师处方。";

  return {
    pattern:
      topTags.length > 0
        ? `当前症状提示：${topTags.join("、")} 等方向（学习性示意，不作诊断）`
        : "症状组合尚无法提示明确方向",
    topTags,
    explanation,
    principle,
    acupuncture,
    herbal,
    warning:
      "本内容仅用于中医理论学习与沟通参考，不构成任何诊断或治疗依据。如有不适，应及时就医或面诊中医师。"
  };
}

// ==============================
// AI（gpt-4.1-mini）说明
// ==============================
async function callAIForExplanation(names, baseResult) {
  if (!process.env.KEYFORTCM) {
    return "（AI 说明未启用：后端未配置 KEYFORTCM 环境变量。）";
  }

  try {
    const prompt = `
你是一位经验丰富的中医师，但本回答只做“学习性解释”，不做诊断与处方。

请用约 150 字的简体中文，面向普通患者，解释下面内容：

- 主要症状：${names.join("、")}
- 系统分析方向：${baseResult.pattern}
- 证素说明（供你参考）：${baseResult.explanation}
- 治法方向（供你参考）：${baseResult.principle}

要求：
1）只能用“可能与……有关”“可以从……角度考虑”等表达，不能给出确切诊断。
2）不能出现具体方剂名、药名、穴位名，只能说治法原则（如疏肝理气、健脾益气、滋阴降火等）。
3）提醒需要结合舌象、脉象及整体体质，由面诊中医师进一步辨证。
4）结尾必须提示：本说明仅作中医学习性参考，不能替代面诊和正规医疗。

只输出这段对患者说的话。
    `.trim();

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 220
    });

    return completion.choices[0].message.content.trim();
  } catch (err) {
    console.error("AI ERROR:", err);
    return "（AI 解释暂时不可用。）";
  }
}
