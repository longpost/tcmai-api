// pages/api/analyze.js
import OpenAI from "openai";

// 用环境变量里的 API Key 初始化客户端
const client = new OpenAI({
  apiKey: process.env.keyfortcm
});

export default async function handler(req, res) {
  // ==== CORS 处理 ====
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { symptoms } = req.body || {};
  if (!Array.isArray(symptoms) || symptoms.length === 0) {
    const baseResult = {
      title: "没有选择任何症状",
      pattern: "——",
      explanation: "请先在前端页面选择一个或多个部位，并勾选相关症状。",
      principle: "",
      acupuncture: "",
      herbal: "",
      warning: "本接口仅用于中医理论学习示例，不能替代临床问诊和医师诊断。"
    };
    const enriched = await attachAINotes(baseResult, symptoms);
    return res.status(200).json(enriched);
  }

  const names = symptoms.map((s) => s.symptom);
  const has = (s) => names.includes(s);

  let baseResult;

  // ===== 示例规则 1：胸闷 + 心悸 + 气短 =====
  if (has("胸闷") && has("心悸") && (has("气短懒言") || has("气短"))) {
    baseResult = {
      title: "示例辨证 1",
      pattern: "心气不足、痰浊阻络（示意）",
      explanation:
        "以胸闷、心悸、气短为主要表现，可从心气不足、痰浊内阻之角度思考。需结合舌脉等进一步辨证。",
      principle: "益气养心、理气化痰、通阳宣痹（仅为学习用语）。",
      acupuncture:
        "取穴示例：内关、心俞、膻中、足三里、丰隆等，根据具体情况加减。",
      herbal:
        "方药思路示例：可参考 甘麦大枣汤 合 温胆汤 / 炙甘草汤 等思路加减，具体配伍须由合格中医师根据体质、舌脉调整。",
      warning:
        "如出现胸痛剧烈、出汗、气促明显等，应及时就医排除急症。本内容仅供中医理论学习参考，不能自行据此用药或延误治疗。"
    };
    const enriched = await attachAINotes(baseResult, symptoms);
    return res.status(200).json(enriched);
  }

  // ===== 示例规则 2：胃脘胀痛 + 嗳气 + 反酸 =====
  if (has("胃脘胀痛") && has("嗳气") && has("反酸")) {
    baseResult = {
      title: "示例辨证 2",
      pattern: "肝胃不和、胃气上逆（示意）",
      explanation:
        "胃脘胀痛，伴嗳气、反酸，多见肝气犯胃或饮食停滞、胃失和降。需结合情志、饮食史等综合判断。",
      principle: "疏肝理气、和胃降逆、消食导滞（仅为学习用语）。",
      acupuncture:
        "取穴示例：中脘、内关、足三里、太冲、章门等，可配合摩腹、按揉局部。",
      herbal:
        "方药思路示例：可参考 柴胡疏肝散 合 左金丸 / 香砂平胃散 等思路加减，由中医师根据具体情况调整。",
      warning:
        "持续胃痛、呕血、黑便、体重明显下降等情况需及时到医院检查。本内容仅用于学习演示。"
    };
    const enriched = await attachAINotes(baseResult, symptoms);
    return res.status(200).json(enriched);
  }

  // ===== 示例规则 3：小腹冷痛 + 痛经 + 小腹坠胀 / 经行腹痛 =====
  if (has("小腹冷痛") && has("痛经") && (has("小腹坠胀") || has("经行腹痛"))) {
    baseResult = {
      title: "示例辨证 3",
      pattern: "寒凝胞宫、气滞血瘀（示意）",
      explanation:
        "小腹冷痛、痛经，小腹坠胀，经期前后加重，遇温则减，提示寒邪凝滞胞宫、气血运行不畅。",
      principle: "温经散寒、活血化瘀、调冲任（仅为学习用语）。",
      acupuncture:
        "取穴示例：关元、中极、气海、三阴交、地机等，可配艾灸温经。",
      herbal:
        "方药思路示例：可参考 温经汤、少腹逐瘀汤 等思路，但需由中医师根据经期、体质具体加减。",
      warning:
        "痛经严重、经量异常（过少或过多）、夹块、备孕等情况，一定要在专业医师指导下处理。切勿自行长期用药。"
    };
    const enriched = await attachAINotes(baseResult, symptoms);
    return res.status(200).json(enriched);
  }

  // ===== 默认兜底 =====
  baseResult = {
    title: "简单学习提示",
    pattern: "所选症状可从多种证候角度考虑",
    explanation:
      "当前选择的症状组合尚不足以在系统内自动给出明确的中医证候，应结合寒热、虚实、表里、气血津液、舌脉等全面辨证。",
    principle:
      "建议以“四诊合参”为主，本接口仅作为“按部位收集症状 + 粗略提示”的学习工具。",
    acupuncture:
      "可结合常用配穴：如头面病变考虑 合谷、太冲、百会；胸胁病变考虑 膻中、期门、内关；腹部病变考虑 中脘、天枢、关元 等，由医师具体加减。",
    herbal:
      "方药配伍必须由合格中医师根据个人体质与舌脉脉象综合判定，不能仅凭本系统自动生成。",
    warning: "本接口仅作中医教育演示，不用于具体诊断或处方。任何严重症状需及时就医。"
  };

  const enriched = await attachAINotes(baseResult, symptoms);
  return res.status(200).json(enriched);
}

// 把 AI 生成的学习说明附加到结果上
// 把 AI 生成的说明附加到结果上（版本 A：有经验中医对病人解释）
async function attachAINotes(baseResult, symptoms) {
  // 如果没配 API Key，就返回一个明确提示
  if (!process.env.OPENAI_API_KEY) {
    return {
      ...baseResult,
      aiError: "后端未配置 OPENAI_API_KEY，AI 学习说明暂不可用。"
    };
  }

  try {
    const names = (symptoms || [])
      .map((s) => s && s.symptom)
      .filter(Boolean);
    const mainSymptoms = names.length ? names.join("、") : "（前端选择的症状）";

    const prompt = `
你是一位有多年临床经验的中医师兼针灸师，现在是在向一位普通患者解释：“为什么他/她的这些症状，从中医角度可以这样理解”。语气要温和、稳重、简洁。

请根据下面信息，用不超过 180 字的简体中文，写一段对病人说的话：
- 症状：${mainSymptoms}
- 系统推断的中医证候方向（仅作参考）：${baseResult.pattern}
- 系统的辨证思路要点（仅作参考）：${baseResult.explanation}

要求：
1）不要下具体诊断，只能说“可能与……有关”“可以从……角度考虑”等。
2）不要出现具体方剂名和药名，只能提“疏肝理气、健脾和胃、补肾填精、化痰祛湿”等这类原则性说法。
3）鼓励病人结合舌象、脉象、整体情况，由面诊医师进一步辨证。
4）结尾必须有一句类似“以上只是中医角度的一般性解释，不能作为诊断或用药依据，如有不适请及时就医”。

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
      aiError: "AI 学习说明生成失败：" + (err?.message || String(err))
    };
  }
}

