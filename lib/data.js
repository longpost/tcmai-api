// lib/data.js
// 最小但“部位完整”的可跑版本

export const SYMPTOMS = [
  // ===== 头部 =====
  { id: "headache", zh: "头痛", en: "Headache", regions: ["head"] },
  { id: "dizziness", zh: "头晕", en: "Dizziness", regions: ["head"] },

  // ===== 眼 =====
  { id: "dry_eyes", zh: "目干", en: "Dry eyes", regions: ["eye"] },
  { id: "red_eyes", zh: "目赤", en: "Red eyes", regions: ["eye"] },
  { id: "blurred_vision", zh: "视物模糊", en: "Blurred vision", regions: ["eye"] },

  // ===== 耳 =====
  { id: "tinnitus", zh: "耳鸣", en: "Tinnitus", regions: ["ear"] },
  { id: "ear_fullness", zh: "耳闷", en: "Ear fullness", regions: ["ear"] },

  // ===== 鼻 =====
  { id: "nasal_congestion", zh: "鼻塞", en: "Nasal congestion", regions: ["nose"] },
  { id: "clear_nasal_discharge", zh: "流清涕", en: "Clear nasal discharge", regions: ["nose"] },
  { id: "yellow_nasal_discharge", zh: "流黄涕", en: "Yellow nasal discharge", regions: ["nose"] },
  { id: "sneezing", zh: "喷嚏", en: "Sneezing", regions: ["nose"] },

  // ===== 咽喉 =====
  { id: "sore_throat", zh: "咽痛", en: "Sore throat", regions: ["throat"] },
  { id: "dry_throat", zh: "咽干", en: "Dry throat", regions: ["throat"] },
  { id: "globus", zh: "咽中异物感", en: "Globus sensation", regions: ["throat"] },

  // ===== 口腔 =====
  { id: "dry_mouth", zh: "口干", en: "Dry mouth", regions: ["mouth"] },
  { id: "bitter_taste", zh: "口苦", en: "Bitter taste", regions: ["mouth"] },
  { id: "bad_breath", zh: "口臭", en: "Bad breath", regions: ["mouth"] },

  // ===== 胸部 =====
  { id: "palpitations", zh: "心悸", en: "Palpitations", regions: ["chest"] },
  { id: "yellow_sticky_phlegm", zh: "痰黄黏", en: "Yellow sticky phlegm", regions: ["chest"] },

  // ===== 大便 =====
  { id: "loose_stool", zh: "便溏", en: "Loose stool", regions: ["stool"] },
  { id: "constipation", zh: "大便干结", en: "Dry constipation", regions: ["stool"] },

  // ===== 小便 =====
  { id: "clear_long_urine", zh: "小便清长", en: "Clear copious urine", regions: ["urine"] },
  { id: "short_red_urine", zh: "小便短赤", en: "Dark scanty urine", regions: ["urine"] },

  // ===== 全身 =====
  { id: "cold_aversion", zh: "畏寒肢冷", en: "Aversion to cold", regions: ["whole"] },
  { id: "fatigue", zh: "乏力", en: "Fatigue", regions: ["whole"] },
  { id: "five_center_heat", zh: "五心烦热", en: "Five-center heat", regions: ["whole"] },
  { id: "restlessness", zh: "烦躁", en: "Restlessness", regions: ["whole"] }
];

// 👉 下面这些你可以先留空或以后慢慢补
export const SYMPTOM_TAG_RULES = [];
export const COMBO_RULES = [];
export const TAG_EXPLANATIONS = {};
export const TAG_TREATMENT = {};


