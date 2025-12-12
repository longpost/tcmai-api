// lib/data.js
// 最小闭环可跑：症状(id/zh/en/regions) + 证素规则 + 组合规则 + 解释/治法模板

// ✅ 供前端“部位按钮/过滤”与 /api/symptoms 使用
export const REGIONS = [
  "head",
  "eye",
  "ear",
  "nose",
  "throat",
  "mouth",
  "chest",
  "upperAbd",
  "midAbd",
  "lowerAbd",
  "stool",
  "urine",
  "whole"
];

export const SYMPTOMS = [
  // 胸部 / 心肺
  { id: "palpitations", zh: "心悸", en: "Palpitations", regions: ["chest"] },
  { id: "yellow_sticky_phlegm", zh: "痰黄黏", en: "Yellow sticky phlegm", regions: ["chest"] },

  // 大便
  { id: "loose_stool", zh: "便溏", en: "Loose stool", regions: ["stool"] },
  { id: "constipation", zh: "大便干结", en: "Dry constipation", regions: ["stool"] },

  // 小便
  { id: "clear_long_urine", zh: "小便清长", en: "Clear copious urine", regions: ["urine"] },
  { id: "short_red_urine", zh: "小便短赤", en: "Dark scanty urine", regions: ["urine"] },

  // 全身 / 体质
  { id: "cold_aversion", zh: "畏寒肢冷", en: "Aversion to cold / cold limbs", regions: ["whole"] },
  { id: "cold_limbs", zh: "手脚冰凉", en: "Cold limbs", regions: ["whole"] },
  { id: "five_center_heat", zh: "五心烦热", en: "Five-center heat", regions: ["whole"] },
  { id: "palm_sole_heat", zh: "手足心热", en: "Heat in palms/soles", regions: ["whole"] },
  { id: "fatigue", zh: "乏力", en: "Fatigue", regions: ["whole"] },
  { id: "lazy_low_energy", zh: "神疲懒言", en: "Lassitude / low speech", regions: ["whole"] },
  { id: "pale_complexion", zh: "面色少华", en: "Pale complexion", regions: ["whole"] },
  { id: "flushed_face", zh: "面色潮红", en: "Flushed complexion", regions: ["whole"] },
  { id: "restlessness", zh: "烦躁", en: "Restlessness", regions: ["whole"] }
];

// 单症状 -> 标签（证素）
// core: 主症（+2） assist: 兼症（+1）
export const SYMPTOM_TAG_RULES = [
  { symptomId: "palpitations", core: ["心气不足"], assist: ["心神不宁"] },
  { symptomId: "yellow_sticky_phlegm", core: ["痰热壅肺"], assist: ["里热偏盛"] },

  { symptomId: "loose_stool", core: ["脾气虚弱"], assist: ["寒湿困脾"] },
  { symptomId: "constipation", core: ["热结肠腑"], assist: ["里热偏盛"] },

  { symptomId: "clear_long_urine", core: ["肾阳不足"], assist: ["阳虚体质"] },
  { symptomId: "short_red_urine", core: ["湿热下注"], assist: ["里热偏盛"] },

  { symptomId: "cold_aversion", core: ["阳虚体质"], assist: ["肾阳不足"] },
  { symptomId: "cold_limbs", core: ["阳虚体质"], assist: ["气血不足"] },

  { symptomId: "five_center_heat", core: ["阴虚火旺"], assist: ["肾阴不足"] },
  { symptomId: "palm_sole_heat", core: ["阴虚火旺"], assist: ["心阴不足"] },

  { symptomId: "fatigue", core: ["气血不足"], assist: ["脾气虚弱"] },
  { symptomId: "lazy_low_energy", core: ["脾气虚弱"], assist: ["气血不足"] },
  { symptomId: "pale_complexion", core: ["气血不足"], assist: [] },
  { symptomId: "flushed_face", core: ["里热偏盛"], assist: ["阴虚火旺"] },
  { symptomId: "restlessness", core: ["里热偏盛"], assist: ["心神不宁"] }
];

// 组合规则
export const COMBO_RULES = [
  {
    whenAll: ["cold_aversion", "clear_long_urine"],
    effects: [{ tag: "肾阳不足", delta: +2 }]
  },
  {
    whenAll: ["loose_stool", "cold_aversion"],
    effects: [{ tag: "寒湿困脾", delta: +2 }, { tag: "脾气虚弱", delta: +1 }]
  },
  {
    whenAll: ["palm_sole_heat", "five_center_heat"],
    effects: [{ tag: "阴虚火旺", delta: +2 }]
  },
  {
    whenAll: ["yellow_sticky_phlegm", "restlessness"],
    effects: [{ tag: "里热偏盛", delta: +2 }]
  }
];

// 标签解释
export const TAG_EXPLANATIONS = {
  "心气不足": "多见心悸、气短乏力，属心气虚弱、推动无力。",
  "心神不宁": "多梦易醒、心悸不安，为心神失养或被扰动。",
  "痰热壅肺": "咳嗽痰黄黏、胸闷，为痰热蕴肺、宣降失常。",
  "里热偏盛": "口渴喜冷、小便短赤、烦躁等，属里热偏盛。",
  "脾气虚弱": "纳呆、便溏、乏力，多为脾运化无力。",
  "寒湿困脾": "便溏、腹胀、畏寒，为寒湿困阻中焦。",
  "肾阳不足": "畏寒肢冷、小便清长，属肾阳虚、温煦失职。",
  "阳虚体质": "怕冷肢冷、精神不振，多属阳虚体质。",
  "气血不足": "面色少华、乏力心悸，为气血生化不足。",
  "阴虚火旺": "手足心热、五心烦热、盗汗，为阴虚生内热。",
  "肾阴不足": "五心烦热、潮热盗汗，多为肾阴不足。",
  "心阴不足": "心烦失眠、盗汗、多梦，多为心阴亏虚。",
  "湿热下注": "小便短赤、下焦不适，多属湿热下注。",
  "热结肠腑": "便秘、大便干结，为实热结滞肠腑。"
};

// 治法方向模板
export const TAG_TREATMENT = {
  "心气不足": {
    principle: "治宜益气养心，宁心安神。",
    acupuncture: "针刺方向可从补益心气、安神定悸等思路考虑，由医师辨证选用。",
    herbal: "方药方向偏补益心气、养心安神，仍须面诊后决定。"
  },
  "心神不宁": {
    principle: "治宜养心安神，调和阴阳。",
    acupuncture: "针刺方向可从安神、调心的经络思路考虑，由医师辨证加减。",
    herbal: "方药方向偏养心安神、交通心肾，需结合舌脉体质。"
  },
  "痰热壅肺": {
    principle: "治宜清热化痰，宣肺止咳。",
    acupuncture: "针刺方向多从宣肺化痰、清热止咳等思路考虑，由医师辨证施治。",
    herbal: "方药方向偏清热化痰宣肺，须医师判断适用性。"
  },
  "里热偏盛": {
    principle: "治宜清热泻火，保津护液。",
    acupuncture: "针刺方向可从清热、调气机等思路考虑，由医师辨证选用。",
    herbal: "方药方向偏清热泻火，仍须面诊辨证。"
  },
  "脾气虚弱": {
    principle: "治宜健脾益气，助运化。",
    acupuncture: "针刺方向多从健脾益气、升清降浊等思路考虑，由医师辨证取用。",
    herbal: "方药方向偏健脾益气，需结合饮食与体质。"
  },
  "寒湿困脾": {
    principle: "治宜温中散寒，燥湿运脾。",
    acupuncture: "针刺方向可从温中化湿、健脾运化等思路考虑，由医师辨证加减。",
    herbal: "方药方向偏温中化湿，仍需面诊后决定。"
  },
  "肾阳不足": {
    principle: "治宜温补肾阳，固摄下元。",
    acupuncture: "针刺方向多从温阳固摄、补肾助阳等思路考虑，由医师辨证选用。",
    herbal: "方药方向偏温补肾阳，需结合舌脉体质。"
  },
  "阳虚体质": {
    principle: "治宜温阳扶正，温煦四肢。",
    acupuncture: "针刺方向多从温阳益气、扶正固表等思路考虑，由医师掌握。",
    herbal: "方药方向偏温阳补气，仍须辨证调整。"
  },
  "气血不足": {
    principle: "治宜益气养血，使气行血畅。",
    acupuncture: "针刺方向多从补气健脾、调和营卫着手，由医师灵活取用。",
    herbal: "方药方向偏补气养血，需结合舌脉体质。"
  },
  "阴虚火旺": {
    principle: "治宜滋阴降火，使阴阳相济。",
    acupuncture: "针刺方向可从滋阴宁心、降虚火等思路考虑，由医师加减。",
    herbal: "方药方向偏滋阴清热，须面诊后决定。"
  },
  "湿热下注": {
    principle: "治宜清热利湿，通淋止痛。",
    acupuncture: "针刺方向多从下焦湿热相关经络调理，由医师辨证加减。",
    herbal: "方药方向偏清热利湿，须医师判断。"
  },
  "热结肠腑": {
    principle: "治宜泻热通腑，润燥行滞。",
    acupuncture: "针刺方向可从通腑泄热、行气导滞等思路考虑，由医师辨证施治。",
    herbal: "方药方向偏清热通便，仍需面诊辨证。"
  }
};


