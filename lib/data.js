// lib/data.js

// ---------------------------
// Regions (keys match frontend)
// ---------------------------
export const REGIONS = [
  "head",
  "chest",
  "upperAbd",
  "midAbd",
  "lowerAbd",
  "whole",
  "stool",
  "urine",
  "tongue"
];

// ---------------------------
// Symptoms catalog
// id is the stable key for zh/en and aliases
// ---------------------------
export const SYMPTOMS = [
  // head
  { id: "dizziness", regions: ["head"], zh: "头晕", en: "Dizziness", aliasesZh: ["头晕","眩晕"], aliasesEn: ["dizziness","vertigo"] },
  { id: "headache", regions: ["head"], zh: "头痛", en: "Headache", aliasesZh: ["头痛"], aliasesEn: ["headache"] },
  { id: "migraine", regions: ["head"], zh: "偏头痛", en: "Migraine", aliasesZh: ["偏头痛"], aliasesEn: ["migraine"] },
  { id: "heavy_head", regions: ["head"], zh: "头重如裹", en: "Heavy head (as wrapped)", aliasesZh: ["头重如裹"], aliasesEn: ["heavy head"] },
  { id: "insomnia", regions: ["head"], zh: "失眠", en: "Insomnia", aliasesZh: ["失眠"], aliasesEn: ["insomnia"] },
  { id: "dreamy_sleep", regions: ["head"], zh: "多梦", en: "Dream-disturbed sleep", aliasesZh: ["多梦"], aliasesEn: ["dreamy sleep"] },
  { id: "tinnitus", regions: ["head"], zh: "耳鸣", en: "Tinnitus", aliasesZh: ["耳鸣"], aliasesEn: ["tinnitus"] },

  // chest
  { id: "chest_tightness", regions: ["chest"], zh: "胸闷", en: "Chest tightness", aliasesZh: ["胸闷"], aliasesEn: ["chest tightness"] },
  { id: "palpitation", regions: ["chest"], zh: "心悸", en: "Palpitation", aliasesZh: ["心悸"], aliasesEn: ["palpitation"] },
  { id: "short_breath", regions: ["chest"], zh: "气短懒言", en: "Shortness of breath / low voice", aliasesZh: ["气短","气短懒言"], aliasesEn: ["shortness of breath"] },
  { id: "cough", regions: ["chest"], zh: "咳嗽", en: "Cough", aliasesZh: ["咳嗽"], aliasesEn: ["cough"] },
  { id: "phlegm", regions: ["chest"], zh: "痰多", en: "Phlegm (copious)", aliasesZh: ["痰多"], aliasesEn: ["phlegm"] },
  { id: "yellow_phlegm", regions: ["chest"], zh: "痰黄黏", en: "Yellow sticky phlegm", aliasesZh: ["痰黄黏","黄痰"], aliasesEn: ["yellow phlegm"] },
  { id: "white_phlegm", regions: ["chest"], zh: "痰白清稀", en: "White thin phlegm", aliasesZh: ["痰白清稀","白痰"], aliasesEn: ["white phlegm"] },
  { id: "chest_pain", regions: ["chest"], zh: "胸痛", en: "Chest pain", aliasesZh: ["胸痛"], aliasesEn: ["chest pain"] },

  // upper abdomen
  { id: "epigastric_distension_pain", regions: ["upperAbd"], zh: "胃脘胀痛", en: "Epigastric distension/pain", aliasesZh: ["胃脘胀痛"], aliasesEn: ["epigastric pain"] },
  { id: "epigastric_burning", regions: ["upperAbd"], zh: "胃脘灼痛", en: "Burning epigastric pain", aliasesZh: ["胃脘灼痛","烧心"], aliasesEn: ["burning epigastric pain","heartburn"] },
  { id: "belching", regions: ["upperAbd"], zh: "嗳气", en: "Belching", aliasesZh: ["嗳气"], aliasesEn: ["belching"] },
  { id: "acid_regurg", regions: ["upperAbd"], zh: "反酸", en: "Acid regurgitation", aliasesZh: ["反酸"], aliasesEn: ["acid regurgitation"] },
  { id: "poor_appetite", regions: ["upperAbd"], zh: "纳呆", en: "Poor appetite", aliasesZh: ["纳呆"], aliasesEn: ["poor appetite"] },
  { id: "sticky_mouth", regions: ["upperAbd"], zh: "口黏不渴", en: "Sticky mouth (not thirsty)", aliasesZh: ["口黏不渴"], aliasesEn: ["sticky mouth"] },
  { id: "thirst_cold", regions: ["upperAbd"], zh: "口渴喜冷饮", en: "Thirst, prefers cold", aliasesZh: ["口渴喜冷饮"], aliasesEn: ["thirst cold"] },
  { id: "thirst_little", regions: ["upperAbd"], zh: "口渴不多饮", en: "Thirst but little drinking", aliasesZh: ["口渴不多饮"], aliasesEn: ["thirst little"] },

  // mid abdomen
  { id: "abdominal_distension", regions: ["midAbd"], zh: "腹胀", en: "Abdominal distension", aliasesZh: ["腹胀"], aliasesEn: ["abdominal distension"] },
  { id: "abdominal_pain", regions: ["midAbd"], zh: "腹痛", en: "Abdominal pain", aliasesZh: ["腹痛","腹痛隐隐"], aliasesEn: ["abdominal pain"] },

  // lower abdomen / gyn
  { id: "lower_abd_cold_pain", regions: ["lowerAbd"], zh: "小腹冷痛", en: "Lower abdominal cold pain", aliasesZh: ["小腹冷痛"], aliasesEn: ["lower abdominal cold pain"] },
  { id: "lower_abd_distension", regions: ["lowerAbd"], zh: "小腹坠胀", en: "Lower abdominal distension", aliasesZh: ["小腹坠胀"], aliasesEn: ["lower abdominal distension"] },
  { id: "dysmenorrhea", regions: ["lowerAbd"], zh: "经行腹痛", en: "Dysmenorrhea", aliasesZh: ["经行腹痛","痛经"], aliasesEn: ["dysmenorrhea"] },
  { id: "scanty_menses", regions: ["lowerAbd"], zh: "经量少", en: "Scanty menses", aliasesZh: ["经量少"], aliasesEn: ["scanty menses"] },
  { id: "dark_clots_menses", regions: ["lowerAbd"], zh: "经色紫暗有块", en: "Dark/purple clots", aliasesZh: ["经色紫暗有块"], aliasesEn: ["dark clots"] },

  // stool
  { id: "constipation", regions: ["stool"], zh: "大便干结", en: "Constipation (dry stool)", aliasesZh: ["大便干结","便秘"], aliasesEn: ["constipation"] },
  { id: "loose_stool", regions: ["stool"], zh: "便溏", en: "Loose stool", aliasesZh: ["便溏","大便溏薄"], aliasesEn: ["loose stool","diarrhea"] },

  // urine
  { id: "short_red_urine", regions: ["urine"], zh: "小便短赤", en: "Short red urine", aliasesZh: ["小便短赤"], aliasesEn: ["short red urine"] },
  { id: "clear_long_urine", regions: ["urine"], zh: "小便清长", en: "Clear long urine", aliasesZh: ["小便清长"], aliasesEn: ["clear long urine"] },

  // whole
  { id: "fatigue", regions: ["whole"], zh: "乏力", en: "Fatigue", aliasesZh: ["乏力"], aliasesEn: ["fatigue"] },
  { id: "lazy_low_energy", regions: ["whole"], zh: "神疲懒言", en: "Low spirit / lethargy", aliasesZh: ["神疲懒言"], aliasesEn: ["lethargy"] },
  { id: "spontaneous_sweat", regions: ["whole"], zh: "自汗", en: "Spontaneous sweating", aliasesZh: ["自汗"], aliasesEn: ["spontaneous sweat"] },
  { id: "night_sweat", regions: ["whole"], zh: "盗汗", en: "Night sweating", aliasesZh: ["盗汗"], aliasesEn: ["night sweat"] },
  { id: "cold_aversion", regions: ["whole"], zh: "畏寒肢冷", en: "Aversion to cold / cold limbs", aliasesZh: ["畏寒","畏寒肢冷"], aliasesEn: ["aversion to cold"] },
  { id: "cold_limbs", regions: ["whole"], zh: "手脚冰凉", en: "Cold hands/feet", aliasesZh: ["手脚冰凉"], aliasesEn: ["cold limbs"] },
  { id: "five_center_heat", regions: ["whole"], zh: "五心烦热", en: "Five-center heat", aliasesZh: ["五心烦热"], aliasesEn: ["five-center heat"] },
  { id: "pale_complexion", regions: ["whole"], zh: "面色少华", en: "Pale complexion", aliasesZh: ["面色少华"], aliasesEn: ["pale complexion"] },
  { id: "flushed_face", regions: ["whole"], zh: "面色潮红", en: "Flushed face", aliasesZh: ["面色潮红"], aliasesEn: ["flushed face"] },
  { id: "heavy_limbs", regions: ["whole"], zh: "四肢沉重", en: "Heavy limbs", aliasesZh: ["四肢沉重"], aliasesEn: ["heavy limbs"] },
  { id: "numbness", regions: ["whole"], zh: "肢体麻木", en: "Numbness", aliasesZh: ["肢体麻木"], aliasesEn: ["numbness"] },
  { id: "edema", regions: ["whole"], zh: "水肿", en: "Edema", aliasesZh: ["水肿"], aliasesEn: ["edema"] },
  { id: "irritability", regions: ["whole"], zh: "易怒", en: "Irritability", aliasesZh: ["易怒"], aliasesEn: ["irritability"] },
  { id: "restlessness", regions: ["whole"], zh: "烦躁", en: "Restlessness", aliasesZh: ["烦躁"], aliasesEn: ["restlessness"] }
];

// ---------------------------
// Symptom -> tag rules (your old core/assist mapped onto ids)
// weights: core=2, assist=1
// ---------------------------
export const SYMPTOM_TAG_RULES = [
  { symptomId: "dizziness", core: ["肝阳偏亢","气血不足"], assist: ["痰浊中阻","肾精不足"] },
  { symptomId: "headache", core: ["肝阳偏亢","血瘀内阻"], assist: ["风热上扰","痰浊中阻"] },
  { symptomId: "heavy_head", core: ["痰浊中阻"], assist: ["脾胃虚弱"] },
  { symptomId: "migraine", core: ["肝郁化火","血瘀内阻"], assist: ["风寒侵袭"] },

  { symptomId: "chest_tightness", core: ["痰浊中阻","气滞"], assist: ["心血不足"] },
  { symptomId: "palpitation", core: ["心气不足","心阳不足"], assist: ["心血不足"] },
  { symptomId: "short_breath", core: ["肺气不足","心气不足"], assist: ["气血不足"] },

  { symptomId: "epigastric_distension_pain", core: ["肝胃不和","食滞胃肠"], assist: ["脾胃虚弱"] },
  { symptomId: "acid_regurg", core: ["胃气上逆","里热偏盛"], assist: ["肝火偏旺"] },
  { symptomId: "poor_appetite", core: ["脾胃虚弱"], assist: ["湿阻中焦"] },
  { symptomId: "belching", core: ["胃气不和"], assist: ["肝胃不和"] },

  { symptomId: "abdominal_distension", core: ["气滞","湿阻中焦"], assist: ["脾胃虚弱"] },
  { symptomId: "abdominal_pain", core: ["脾胃虚弱"], assist: ["气血不足"] },

  { symptomId: "lower_abd_cold_pain", core: ["寒凝胞宫"], assist: ["肾阳不足"] },
  { symptomId: "dark_clots_menses", core: ["血瘀内阻"], assist: ["寒凝胞宫"] },

  { symptomId: "fatigue", core: ["气血不足"], assist: ["脾气虚弱"] },
  { symptomId: "cold_aversion", core: ["阳虚体质"], assist: ["肾阳不足"] },
  { symptomId: "cold_limbs", core: ["阳虚体质"], assist: ["气血不足"] },
  { symptomId: "five_center_heat", core: ["阴虚火旺"], assist: ["肾阴不足"] },

  { symptomId: "constipation", core: ["热结肠腑"], assist: ["肠燥津亏"] },
  { symptomId: "loose_stool", core: ["脾气虚弱"], assist: ["寒湿困脾"] },

  { symptomId: "short_red_urine", core: ["湿热下注"], assist: ["里热偏盛"] },
  { symptomId: "clear_long_urine", core: ["肾阳不足"], assist: ["阳虚体质"] }
];

// ---------------------------
// Combo rules (start small; you can grow this)
// delta can be +/-
// ---------------------------
export const COMBO_RULES = [
  {
    id: "combo_ganwei_001",
    whenAll: ["belching","epigastric_distension_pain"],
    effects: [{ tag: "肝胃不和", delta: 2, reason: "嗳气 + 胃脘胀痛 → 肝气犯胃/胃失和降倾向更强" }]
  },
  {
    id: "combo_heat_urine_thirst",
    whenAll: ["short_red_urine","thirst_cold"],
    effects: [{ tag: "里热偏盛", delta: 2, reason: "小便短赤 + 口渴喜冷 → 里热证据增强" }]
  },
  {
    id: "combo_cold_yangxu",
    whenAll: ["cold_aversion","cold_limbs"],
    effects: [{ tag: "阳虚体质", delta: 2, reason: "畏寒 + 手脚冰凉 → 阳虚倾向增强" }]
  }
];

// ---------------------------
// Tag explanations & treatment (your original + some missing placeholders)
// ---------------------------
export const TAG_EXPLANATIONS = {
  "肝阳偏亢": "多因情志不舒或肝肾亏虚，阳气上扰清窍，可见头痛头晕、急躁易怒。",
  "气血不足": "多因劳倦过度、脾胃虚弱，气血生化乏源，可见乏力、头晕、面色萎黄。",
  "痰浊中阻": "脾运失健，湿聚成痰，上蒙清窍或壅阻气机，可见胸闷、头重如裹。",
  "肾精不足": "先天不足或久病耗损，可见头晕耳鸣、腰酸乏力。",
  "血瘀内阻": "瘀血停滞，不通则痛，多见刺痛、固定痛、舌紫暗。",
  "肝郁气滞": "情志抑郁、气机不畅，胁痛、腹胀、咽中如塞。",
  "肝郁化火": "肝气郁久化热，可见急躁易怒、头痛目赤等。",
  "风热上扰": "风热上扰清窍，可见头痛、咽痛、发热等。",
  "风寒侵袭": "风寒束表，可见恶寒、头痛、身痛等。",
  "心气不足": "气虚不能推动血脉，心悸、乏力。",
  "心阳不足": "心阳不振，可见心悸、畏寒、乏力。",
  "心血不足": "血不足以养心神，可见心悸、失眠健忘。",
  "脾胃虚弱": "运化不足，纳呆、便溏、倦怠。",
  "脾气虚弱": "脾气不足，运化无力，乏力便溏、食少。",
  "湿阻中焦": "湿困中焦，气机不畅，腹胀困倦、口黏。",
  "食滞胃肠": "饮食停滞，纳呆腹胀，嗳腐吞酸等。",
  "肝胃不和": "肝气犯胃，胃失和降，胀痛嗳气、反酸等。",
  "胃气不和": "胃失和降，可见嗳气、胃脘不舒。",
  "胃气上逆": "胃气上逆，可见反酸、烧心等。",
  "里热偏盛": "里热偏盛，口渴喜冷、小便短赤等。",
  "阴虚火旺": "阴津不足，虚火内扰，有五心烦热、潮热盗汗。",
  "肾阴不足": "肾阴亏虚，虚热内生，五心烦热盗汗等。",
  "阳虚体质": "阳气不足，畏寒肢冷、精神不振。",
  "肾阳不足": "肾阳虚衰，畏寒肢冷、小便清长等。",
  "湿热下注": "湿热蕴结下焦，小便短赤、灼热不适。",
  "气滞": "气机郁滞，胀满疼痛、窜痛等。",
  "热结肠腑": "实热结滞于肠腑，便秘腹胀拒按。",
  "肠燥津亏": "津液不足，大便干结口干等。",
  "寒湿困脾": "寒湿困阻脾阳，便溏、困倦、喜温等。"
};

export const TAG_TREATMENT = {
  "肝阳偏亢": {
    principle: "治宜平肝潜阳，安神定眩。",
    acupuncture: "针刺方向可从肝经与头项部入手，着重平肝熄风、清利头目，由医师辨证选穴。",
    herbal: "方药方向偏向滋阴潜阳、平肝息风，但需根据体质由医师酌定。"
  },
  "气血不足": {
    principle: "治宜益气养血，使气行血畅。",
    acupuncture: "针刺方向多从补气健脾、调和营卫着手，由医师灵活取穴。",
    herbal: "方药方向偏补气养血、健脾生血，但仍需结合舌脉评估后决定。"
  },
  "痰浊中阻": {
    principle: "治宜燥湿化痰、理气和中。",
    acupuncture: "针刺方向多以化痰开窍、健脾运湿为主，由医师辨证取穴。",
    herbal: "方药方向偏化痰祛湿与健脾合用，仍须医师判断。"
  },
  "阴虚火旺": {
    principle: "治宜滋阴降火，使阴阳相济。",
    acupuncture: "针刺方向可从滋阴宁心、降虚火的经穴方向考虑，由医师加减。",
    herbal: "方药方向偏滋阴清热、养阴安神，须面诊后决定。"
  },
  "阳虚体质": {
    principle: "治宜温阳扶正，温煦四肢。",
    acupuncture: "针刺方向多从温阳益气、振奋阳气方向入手，由医师掌握火力。",
    herbal: "方药方向偏温阳补气、健脾益肾，仍需辨体质调整。"
  },
  "湿热下注": {
    principle: "治宜清热利湿、通淋止痛。",
    acupuncture: "针刺方向多从下焦湿热相关经络调理，由医师具体加减。",
    herbal: "方药方向偏清热利湿、通淋之类，须医师判断。"
  },
  "血瘀内阻": {
    principle: "治宜活血化瘀、通络止痛。",
    acupuncture: "针刺方向可从行气活血、通络止痛方向着手，由医师辨证施治。",
    herbal: "方药方向偏活血化瘀，但出血体质需谨慎，由医师判断适用性。"
  }
};
