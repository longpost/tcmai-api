// api/analyze.js

import { TCM_SYMPTOM_FEATURES, TAG_EXPLANATIONS, TAG_TREATMENT } from "../lib/tcmFeatures.js";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.KEYFORTCM
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ error: "Only POST allowed" });
  }

  try {
    const { symptoms } = req.body;
    if (!Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: "No symptoms provided" });
    }

    const names = symptoms.map(s => s.symptom);
    const tagScores = calculateTagScores(names);
    const baseResult = buildBaseResultFromScores(tagScores, names);

    // === AI 解释部分（可关闭） ===
    const aiNotes = await callAIForExplanation(names, baseResult);

    return res.status(200).json({
      success: true,
      selectedSymptoms: names,
      ...baseResult,
      aiNotes
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

// =================================
// 计算标签得分
// =================================
function calculateTagScores(names) {
  const scores = {};

  for (const symptom of names) {
    for (const row of TCM_SYMPTOM_FEATURES) {
      if (row.name !== symptom) continue;

      if (row.coreTags) {
        for (const tag of row.coreTags) {
          scores[tag] = (scores[tag] || 0) + 2;
        }
      }
      if (row.assistTags) {
        for (const tag of row.assistTags) {
          scores[tag] = (scores[tag] || 0) + 1;
        }
      }
    }
  }

  return scores;
}

// =================================
// 构建辨证基础内容
// =================================
function buildBaseResultFromScores(tagScores, symptomNames) {
  const entries = Object.entries(tagScores).sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 3);
  const topTags = top.map(([tag]) => tag);

  // ---- 证素解释 ----
  const explanationParts = [];
  for (const [tag] of top) {
    if (TAG_EXPLANATIONS[tag]) {
      explanationParts.push(`【${tag}】${TAG_EXPLANATIONS[tag]}`);
    }
  }
  const explanation =
    explanationParts.length > 0
      ? explanationParts.join(" ")
      : "当前症状组合尚不足以提示明确的证候方向。";

  // ---- 治法 / 针灸 / 中药方向（自动合成） ----
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
      : `可从 ${topTags.join("、")} 等方向粗略考虑治法，具体仍需由中医师判断。`;

  const acupuncture =
    acuList.length > 0
      ? acuList.join(" ")
      : "针刺方向多根据证素偏向，由医师综合判断取穴，勿据此替代面诊。";

  const herbal =
    herbalList.length > 0
      ? herbalList.join(" ")
      : "方药方向只能作原则性提示，不能替代医师处方。";

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
      "本内容仅供中医理论学习，不用于诊断或治疗。如有不适，应及时就医。"
  };
}

// =================================
// AI（gpt-4.1-mini）说明
// =================================
async function callAIForExplanation(names, baseResult) {
  try {
    const prompt = `
你是一位经验丰富的中医师，但本回答只做学习性解释，不做诊断与处方。

请面向“普通患者”解释以下内容：

- 主要症状：${names.join("、")}
- 系统分析方向：${baseResult.pattern}
- 证素说明：${baseResult.explanation}
- 治法方向：${baseResult.principle}

请用专业但温和的语气，150 字以内。不能出现方剂名、药名、穴位名，只能说治法原则。结尾提醒不能替代面诊。`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 180
    });

    return completion.choices[0].message.content.trim();
  } catch (err) {
    console.error("AI ERROR", err);
    return "（AI 解释暂时不可用）";
  }
}

