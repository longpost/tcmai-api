// lib/data.js
// v1.2 — bilingual TAG_EXPLANATIONS / TAG_TREATMENT
// Regions used: head, eye, ear, nose, throat, mouth, chest, upperAbd, midAbd, lowerAbd, stool, urine, whole

export const SYMPTOMS = [
  // =========================
  // HEAD 头部
  // =========================
  { id: "headache", zh: "头痛", en: "Headache", regions: ["head"] },
  { id: "migraine", zh: "偏头痛", en: "Migraine", regions: ["head"] },
  { id: "dizziness", zh: "头晕", en: "Dizziness", regions: ["head"] },
  { id: "vertigo", zh: "眩晕", en: "Vertigo", regions: ["head"] },
  { id: "heavy_head", zh: "头重如裹", en: "Heavy head sensation", regions: ["head"] },
  { id: "head_distension", zh: "头胀", en: "Head distension", regions: ["head"] },
  { id: "head_tightness", zh: "头部紧束感", en: "Tight band-like headache", regions: ["head"] },
  { id: "poor_memory", zh: "健忘", en: "Poor memory", regions: ["head"] },
  { id: "poor_concentration", zh: "注意力不集中", en: "Poor concentration", regions: ["head"] },
  { id: "insomnia", zh: "失眠", en: "Insomnia", regions: ["head"] },
  { id: "dream_disturbed_sleep", zh: "多梦易醒", en: "Dream-disturbed sleep", regions: ["head"] },
  { id: "daytime_sleepiness", zh: "嗜睡", en: "Daytime sleepiness", regions: ["head"] },
  { id: "irritability", zh: "易怒", en: "Irritability", regions: ["head", "whole"] },
  { id: "restlessness", zh: "烦躁", en: "Restlessness", regions: ["head", "whole"] },

  // =========================
  // EYE 眼
  // =========================
  { id: "dry_eyes", zh: "目干", en: "Dry eyes", regions: ["eye"] },
  { id: "red_eyes", zh: "目赤", en: "Red eyes", regions: ["eye"] },
  { id: "itchy_eyes", zh: "眼痒", en: "Itchy eyes", regions: ["eye"] },
  { id: "tearing", zh: "流泪", en: "Tearing", regions: ["eye"] },
  { id: "blurred_vision", zh: "视物模糊", en: "Blurred vision", regions: ["eye"] },
  { id: "photophobia", zh: "畏光", en: "Photophobia", regions: ["eye"] },
  { id: "eye_swelling_pain", zh: "目胀痛", en: "Eye swelling pain", regions: ["eye"] },
  { id: "floaters", zh: "飞蚊症", en: "Floaters", regions: ["eye"] },
  { id: "night_blindness", zh: "夜盲", en: "Night blindness", regions: ["eye"] },
  { id: "dark_circles", zh: "黑眼圈", en: "Dark circles", regions: ["eye"] },
  { id: "eye_fatigue", zh: "眼疲劳", en: "Eye fatigue", regions: ["eye"] },
  { id: "sticky_eye_discharge", zh: "目眵增多", en: "Sticky eye discharge", regions: ["eye"] },

  // =========================
  // EAR 耳
  // =========================
  { id: "tinnitus", zh: "耳鸣", en: "Tinnitus", regions: ["ear"] },
  { id: "ear_fullness", zh: "耳闷", en: "Ear fullness", regions: ["ear"] },
  { id: "hearing_loss", zh: "听力下降", en: "Hearing loss", regions: ["ear"] },
  { id: "ear_pain", zh: "耳痛", en: "Ear pain", regions: ["ear"] },
  { id: "ear_itch", zh: "耳痒", en: "Ear itch", regions: ["ear"] },
  { id: "dizziness_with_ear", zh: "耳鸣伴眩晕", en: "Tinnitus with vertigo", regions: ["ear"] },
  { id: "ear_discharge", zh: "耳流脓/分泌物", en: "Ear discharge", regions: ["ear"] },
  { id: "sudden_hearing_change", zh: "听力骤变", en: "Sudden hearing change", regions: ["ear"] },
  { id: "sound_sensitivity", zh: "对声音敏感", en: "Sound sensitivity", regions: ["ear"] },
  { id: "ear_pressure_change", zh: "耳压不适", en: "Ear pressure discomfort", regions: ["ear"] },

  // =========================
  // NOSE 鼻
  // =========================
  { id: "nasal_congestion", zh: "鼻塞", en: "Nasal congestion", regions: ["nose"] },
  { id: "runny_nose", zh: "流涕", en: "Runny nose", regions: ["nose"] },
  { id: "clear_nasal_discharge", zh: "流清涕", en: "Clear nasal discharge", regions: ["nose"] },
  { id: "yellow_nasal_discharge", zh: "流黄涕", en: "Yellow nasal discharge", regions: ["nose"] },
  { id: "postnasal_drip", zh: "后鼻滴漏", en: "Postnasal drip", regions: ["nose"] },
  { id: "sneezing", zh: "喷嚏", en: "Sneezing", regions: ["nose"] },
  { id: "nasal_itch", zh: "鼻痒", en: "Nasal itch", regions: ["nose"] },
  { id: "nosebleed", zh: "鼻衄/流鼻血", en: "Nosebleed", regions: ["nose"] },
  { id: "loss_of_smell", zh: "嗅觉减退", en: "Reduced sense of smell", regions: ["nose"] },
  { id: "sinus_pressure", zh: "鼻窦胀痛", en: "Sinus pressure", regions: ["nose"] },
  { id: "thick_nasal_mucus", zh: "鼻涕黏稠", en: "Thick nasal mucus", regions: ["nose"] },
  { id: "nasal_dryness", zh: "鼻干", en: "Nasal dryness", regions: ["nose"] },

  // =========================
  // THROAT 咽喉
  // =========================
  { id: "sore_throat", zh: "咽痛", en: "Sore throat", regions: ["throat"] },
  { id: "dry_throat", zh: "咽干", en: "Dry throat", regions: ["throat"] },
  { id: "itchy_throat", zh: "咽痒", en: "Itchy throat", regions: ["throat"] },
  { id: "globus", zh: "咽中异物感", en: "Globus sensation", regions: ["throat"] },
  { id: "hoarseness", zh: "声音嘶哑", en: "Hoarseness", regions: ["throat"] },
  { id: "phlegm_stuck_throat", zh: "痰黏咽喉", en: "Phlegm stuck in throat", regions: ["throat"] },
  { id: "frequent_throat_clearing", zh: "频繁清嗓", en: "Frequent throat clearing", regions: ["throat"] },
  { id: "swallowing_discomfort", zh: "吞咽不利", en: "Swallowing discomfort", regions: ["throat"] },
  { id: "tonsil_swelling", zh: "扁桃体肿大", en: "Tonsil swelling", regions: ["throat"] },
  { id: "throat_red_swollen", zh: "咽红肿", en: "Red swollen throat", regions: ["throat"] },
  { id: "throat_ulcer", zh: "咽部溃疡", en: "Throat ulcer", regions: ["throat"] },
  { id: "throat_pain_worse_night", zh: "夜间咽痛加重", en: "Throat pain worse at night", regions: ["throat"] },

  // =========================
  // MOUTH 口腔/口渴
  // =========================
  { id: "dry_mouth", zh: "口干", en: "Dry mouth", regions: ["mouth"] },
  { id: "bitter_taste", zh: "口苦", en: "Bitter taste", regions: ["mouth"] },
  { id: "bad_breath", zh: "口臭", en: "Bad breath", regions: ["mouth"] },
  { id: "sticky_mouth_no_thirst", zh: "口黏不渴", en: "Sticky mouth without thirst", regions: ["mouth"] },
  { id: "thirst_cold_drinks", zh: "口渴喜冷饮", en: "Thirst for cold drinks", regions: ["mouth"] },
  { id: "thirst_little_drink", zh: "口渴不多饮", en: "Thirst but drinks little", regions: ["mouth"] },
  { id: "thirst_warm_drinks", zh: "喜热饮", en: "Prefers warm drinks", regions: ["mouth"] },
  { id: "no_thirst", zh: "不渴", en: "No thirst", regions: ["mouth"] },
  { id: "mouth_ulcers", zh: "口舌生疮", en: "Mouth ulcers", regions: ["mouth"] },
  { id: "gum_swelling_pain", zh: "牙龈肿痛", en: "Swollen painful gums", regions: ["mouth"] },
  { id: "salivation_excess", zh: "口涎多", en: "Excess salivation", regions: ["mouth"] },
  { id: "dry_lips", zh: "唇干裂", en: "Dry cracked lips", regions: ["mouth"] },

  // =========================
  // CHEST 胸部/心肺
  // =========================
  { id: "chest_oppression", zh: "胸闷", en: "Chest oppression", regions: ["chest"] },
  { id: "palpitations", zh: "心悸", en: "Palpitations", regions: ["chest"] },
  { id: "short_breath", zh: "气短", en: "Shortness of breath", regions: ["chest"] },
  { id: "low_voice_lazy_speech", zh: "气短懒言", en: "Low voice / reluctant to speak", regions: ["chest"] },
  { id: "cough", zh: "咳嗽", en: "Cough", regions: ["chest"] },
  { id: "dry_cough", zh: "干咳", en: "Dry cough", regions: ["chest"] },
  { id: "wheezing", zh: "喘促", en: "Wheezing", regions: ["chest"] },
  { id: "phlegm_copious", zh: "痰多", en: "Copious phlegm", regions: ["chest"] },
  { id: "yellow_sticky_phlegm", zh: "痰黄黏", en: "Yellow sticky phlegm", regions: ["chest"] },
  { id: "white_watery_phlegm", zh: "痰白清稀", en: "Clear watery phlegm", regions: ["chest"] },
  { id: "blood_streaked_sputum", zh: "痰中带血", en: "Blood-streaked sputum", regions: ["chest"] },
  { id: "chest_pain", zh: "胸痛", en: "Chest pain", regions: ["chest"] },
  { id: "sighing", zh: "善太息", en: "Frequent sighing", regions: ["chest"] },
  { id: "anxiety", zh: "焦虑", en: "Anxiety", regions: ["chest", "whole"] },

  // =========================
  // UPPER ABD 上腹/胃脘
  // =========================
  { id: "epigastric_distension_pain", zh: "胃脘胀痛", en: "Epigastric distension/pain", regions: ["upperAbd"] },
  { id: "epigastric_burning_pain", zh: "胃脘灼痛", en: "Epigastric burning pain", regions: ["upperAbd"] },
  { id: "belching", zh: "嗳气", en: "Belching", regions: ["upperAbd"] },
  { id: "acid_reflux", zh: "反酸", en: "Acid reflux", regions: ["upperAbd"] },
  { id: "heartburn", zh: "烧心", en: "Heartburn", regions: ["upperAbd"] },
  { id: "nausea", zh: "恶心", en: "Nausea", regions: ["upperAbd"] },
  { id: "vomiting", zh: "呕吐", en: "Vomiting", regions: ["upperAbd"] },
  { id: "vomit_clear", zh: "吐清水", en: "Vomits clear fluid", regions: ["upperAbd"] },
  { id: "vomit_sour", zh: "吐酸", en: "Sour regurgitation", regions: ["upperAbd"] },
  { id: "poor_appetite", zh: "纳呆", en: "Poor appetite", regions: ["upperAbd"] },
  { id: "early_satiety", zh: "食少易饱", en: "Early satiety", regions: ["upperAbd"] },
  { id: "food_stagnation", zh: "嗳腐吞酸", en: "Foul belching / food retention", regions: ["upperAbd"] },
  { id: "epigastric_fullness", zh: "胃脘痞满", en: "Epigastric fullness", regions: ["upperAbd"] },
  { id: "hiccup", zh: "呃逆", en: "Hiccup", regions: ["upperAbd"] },

  // =========================
  // MID ABD 中腹
  // =========================
  { id: "abdominal_distension", zh: "腹胀", en: "Abdominal bloating", regions: ["midAbd"] },
  { id: "abdominal_pain", zh: "腹痛", en: "Abdominal pain", regions: ["midAbd"] },
  { id: "dull_abdominal_pain", zh: "腹痛隐隐", en: "Dull abdominal pain", regions: ["midAbd"] },
  { id: "cramping_pain", zh: "绞痛", en: "Cramping pain", regions: ["midAbd"] },
  { id: "pain_relief_warmth", zh: "得温痛减", en: "Pain relieved by warmth", regions: ["midAbd"] },
  { id: "pain_worse_pressure", zh: "拒按", en: "Pain worse with pressure", regions: ["midAbd"] },
  { id: "borborygmus", zh: "肠鸣", en: "Borborygmus", regions: ["midAbd"] },
  { id: "gas", zh: "矢气多", en: "Excess gas", regions: ["midAbd"] },
  { id: "abdominal_mass", zh: "腹部包块", en: "Abdominal mass", regions: ["midAbd"] },
  { id: "diarrhea", zh: "腹泻", en: "Diarrhea", regions: ["midAbd", "stool"] },
  { id: "mucus_stool", zh: "黏液便", en: "Mucus in stool", regions: ["midAbd", "stool"] },
  { id: "blood_stool", zh: "便血", en: "Blood in stool", regions: ["midAbd", "stool"] },

  // =========================
  // LOWER ABD 下腹/小腹/经带
  // =========================
  { id: "lower_abd_distension", zh: "小腹坠胀", en: "Lower abdominal heaviness", regions: ["lowerAbd"] },
  { id: "lower_abd_cold_pain", zh: "小腹冷痛", en: "Cold lower abdominal pain", regions: ["lowerAbd"] },
  { id: "lower_abd_pain", zh: "小腹痛", en: "Lower abdominal pain", regions: ["lowerAbd"] },
  { id: "menstrual_pain", zh: "经行腹痛", en: "Menstrual abdominal pain", regions: ["lowerAbd"] },
  { id: "scanty_menses", zh: "经量少", en: "Scanty menstruation", regions: ["lowerAbd"] },
  { id: "profuse_menses", zh: "经量多", en: "Profuse menstruation", regions: ["lowerAbd"] },
  { id: "dark_purple_clots", zh: "经色紫暗有块", en: "Dark-purple menses with clots", regions: ["lowerAbd"] },
  { id: "late_period", zh: "经期后延", en: "Delayed period", regions: ["lowerAbd"] },
  { id: "early_period", zh: "经期提前", en: "Early period", regions: ["lowerAbd"] },
  { id: "irregular_menses", zh: "月经不调", en: "Irregular menstruation", regions: ["lowerAbd"] },
  { id: "leukorrhea", zh: "带下", en: "Leukorrhea", regions: ["lowerAbd"] },
  { id: "yellow_leukorrhea", zh: "带下黄", en: "Yellow leukorrhea", regions: ["lowerAbd"] },
  { id: "white_leukorrhea", zh: "带下白", en: "White leukorrhea", regions: ["lowerAbd"] },
  { id: "lower_abd_fullness", zh: "少腹胀满", en: "Lower abdominal fullness", regions: ["lowerAbd"] },

  // =========================
  // STOOL 大便
  // =========================
  { id: "loose_stool", zh: "便溏", en: "Loose stool", regions: ["stool"] },
  { id: "watery_diarrhea", zh: "水样便", en: "Watery diarrhea", regions: ["stool"] },
  { id: "undigested_food_stool", zh: "完谷不化", en: "Undigested food in stool", regions: ["stool"] },
  { id: "constipation", zh: "大便干结", en: "Dry constipation", regions: ["stool"] },
  { id: "hard_stool", zh: "大便硬", en: "Hard stool", regions: ["stool"] },
  { id: "difficult_defecation", zh: "排便困难", en: "Difficult defecation", regions: ["stool"] },
  { id: "alternating_diarrhea_constipation", zh: "便秘腹泻交替", en: "Alternating constipation/diarrhea", regions: ["stool"] },
  { id: "incomplete_defecation", zh: "排便不尽", en: "Incomplete defecation", regions: ["stool"] },
  { id: "foul_smelling_stool", zh: "便臭秽", en: "Foul-smelling stool", regions: ["stool"] },
  { id: "urgent_diarrhea", zh: "里急后重", en: "Tenesmus", regions: ["stool"] },
  { id: "mucus_stool_only", zh: "黏液便", en: "Mucus stool", regions: ["stool"] },
  { id: "blood_in_stool", zh: "便血", en: "Blood in stool", regions: ["stool"] },
  { id: "hemorrhoids", zh: "痔疮", en: "Hemorrhoids", regions: ["stool"] },

  // =========================
  // URINE 小便
  // =========================
  { id: "clear_long_urine", zh: "小便清长", en: "Clear copious urine", regions: ["urine"] },
  { id: "short_red_urine", zh: "小便短赤", en: "Dark scanty urine", regions: ["urine"] },
  { id: "frequent_urination", zh: "尿频", en: "Frequent urination", regions: ["urine"] },
  { id: "urgent_urination", zh: "尿急", en: "Urgency", regions: ["urine"] },
  { id: "painful_urination", zh: "尿痛", en: "Painful urination", regions: ["urine"] },
  { id: "nocturia", zh: "夜尿多", en: "Nocturia", regions: ["urine"] },
  { id: "dribbling_urination", zh: "尿后滴沥", en: "Post-void dribbling", regions: ["urine"] },
  { id: "urinary_retention", zh: "小便不利", en: "Difficult urination", regions: ["urine"] },
  { id: "cloudy_urine", zh: "尿浑", en: "Cloudy urine", regions: ["urine"] },
  { id: "strong_urine_odour", zh: "尿味重", en: "Strong urine odor", regions: ["urine"] },
  { id: "edema_lower_body", zh: "下肢水肿", en: "Lower limb edema", regions: ["urine", "whole"] },
  { id: "urine_incontinence", zh: "尿失禁", en: "Urinary incontinence", regions: ["urine"] },

  // =========================
  // WHOLE 全身/体质
  // =========================
  { id: "fatigue", zh: "乏力", en: "Fatigue", regions: ["whole"] },
  { id: "lazy_low_energy", zh: "神疲懒言", en: "Lassitude / low speech", regions: ["whole"] },
  { id: "weakness", zh: "体倦无力", en: "General weakness", regions: ["whole"] },
  { id: "cold_aversion", zh: "畏寒肢冷", en: "Aversion to cold / cold limbs", regions: ["whole"] },
  { id: "cold_limbs", zh: "手脚冰凉", en: "Cold limbs", regions: ["whole"] },
  { id: "fever", zh: "发热", en: "Fever", regions: ["whole"] },
  { id: "low_grade_fever", zh: "低热", en: "Low-grade fever", regions: ["whole"] },
  { id: "alternating_chills_fever", zh: "寒热往来", en: "Alternating chills and fever", regions: ["whole"] },
  { id: "five_center_heat", zh: "五心烦热", en: "Five-center heat", regions: ["whole"] },
  { id: "palm_sole_heat", zh: "手足心热", en: "Heat in palms/soles", regions: ["whole"] },
  { id: "spontaneous_sweating", zh: "自汗", en: "Spontaneous sweating", regions: ["whole"] },
  { id: "night_sweats", zh: "盗汗", en: "Night sweats", regions: ["whole"] },
  { id: "thirst", zh: "口渴", en: "Thirst", regions: ["whole", "mouth"] },
  { id: "poor_appetite_whole", zh: "食欲差", en: "Poor appetite", regions: ["whole", "upperAbd"] },
  { id: "weight_loss", zh: "消瘦", en: "Weight loss", regions: ["whole"] },
  { id: "weight_gain", zh: "体重增加", en: "Weight gain", regions: ["whole"] },
  { id: "pale_complexion", zh: "面色少华", en: "Pale complexion", regions: ["whole"] },
  { id: "flushed_face", zh: "面色潮红", en: "Flushed complexion", regions: ["whole"] },
  { id: "sallow_complexion", zh: "面色萎黄", en: "Sallow complexion", regions: ["whole"] },
  { id: "dark_complexion", zh: "面色晦暗", en: "Dark complexion", regions: ["whole"] },
  { id: "dizziness_on_standing", zh: "起立头晕", en: "Dizziness on standing", regions: ["whole", "head"] },
  { id: "palpitation_anxiety", zh: "心悸易惊", en: "Palpitations with anxiety", regions: ["whole", "chest"] },
  { id: "poor_sleep", zh: "睡眠差", en: "Poor sleep", regions: ["whole", "head"] },
  { id: "body_aches", zh: "身痛", en: "Body aches", regions: ["whole"] },
  { id: "joint_pain", zh: "关节痛", en: "Joint pain", regions: ["whole"] },
  { id: "stiff_neck", zh: "项背强痛", en: "Stiff neck/upper back", regions: ["whole", "head"] },
  { id: "heavy_limbs", zh: "四肢沉重", en: "Heavy limbs", regions: ["whole"] },
  { id: "numbness", zh: "肢体麻木", en: "Numbness", regions: ["whole"] },
  { id: "tingling", zh: "肢体刺麻", en: "Tingling", regions: ["whole"] },
  { id: "edema", zh: "水肿", en: "Edema", regions: ["whole"] },
  { id: "dry_skin", zh: "皮肤干燥", en: "Dry skin", regions: ["whole"] },
  { id: "itchy_skin", zh: "皮肤瘙痒", en: "Itchy skin", regions: ["whole"] },
  { id: "hair_loss", zh: "脱发", en: "Hair loss", regions: ["whole"] },
  { id: "brittle_nails", zh: "指甲脆", en: "Brittle nails", regions: ["whole"] },
  { id: "poor_exercise_tolerance", zh: "动则气短", en: "Short of breath on exertion", regions: ["whole", "chest"] },
  { id: "chills", zh: "恶寒", en: "Chills", regions: ["whole"] },
  { id: "aversion_to_wind", zh: "恶风", en: "Aversion to wind", regions: ["whole"] },
  { id: "sore_throat_with_fever", zh: "发热咽痛", en: "Fever with sore throat", regions: ["whole", "throat"] },
  { id: "dry_stool_thirst", zh: "便干口渴", en: "Dry stool with thirst", regions: ["whole", "stool", "mouth"] },
];

// ---------------------------
// Symptom → tag rules (starter set)
// core:+2 assist:+1
// ---------------------------
export const SYMPTOM_TAG_RULES = [
  // 心肺/痰
  { symptomId: "palpitations", core: ["心气不足"], assist: ["心神不宁"] },
  { symptomId: "chest_oppression", core: ["痰浊中阻"], assist: ["气滞"] },
  { symptomId: "short_breath", core: ["肺气不足"], assist: ["气血不足"] },
  { symptomId: "low_voice_lazy_speech", core: ["肺气不足"], assist: ["气血不足"] },
  { symptomId: "cough", core: ["肺气不足"], assist: ["风寒外袭"] },
  { symptomId: "dry_cough", core: ["肺阴不足"], assist: ["阴虚火旺"] },
  { symptomId: "phlegm_copious", core: ["痰浊中阻"], assist: ["湿阻中焦"] },
  { symptomId: "yellow_sticky_phlegm", core: ["痰热壅肺"], assist: ["里热偏盛"] },
  { symptomId: "white_watery_phlegm", core: ["寒痰内盛"], assist: ["阳虚体质"] },
  { symptomId: "blood_streaked_sputum", core: ["肺阴不足"], assist: ["里热偏盛"] },
  { symptomId: "chest_pain", core: ["血瘀内阻"], assist: ["气滞"] },
  { symptomId: "sighing", core: ["肝气郁结"], assist: ["气滞"] },

  // 头部
  { symptomId: "headache", core: ["肝阳偏亢"], assist: ["里热偏盛"] },
  { symptomId: "migraine", core: ["肝火偏旺"], assist: ["血瘀内阻"] },
  { symptomId: "dizziness", core: ["气血不足"], assist: ["痰浊中阻"] },
  { symptomId: "vertigo", core: ["痰浊中阻"], assist: ["肝阳偏亢"] },
  { symptomId: "heavy_head", core: ["痰浊中阻"], assist: ["湿阻中焦"] },
  { symptomId: "insomnia", core: ["心神不宁"], assist: ["心阴不足"] },
  { symptomId: "dream_disturbed_sleep", core: ["心神不宁"], assist: ["阴虚火旺"] },

  // 眼耳鼻咽口
  { symptomId: "dry_eyes", core: ["肝血不足"], assist: ["阴虚火旺"] },
  { symptomId: "blurred_vision", core: ["肝血不足"], assist: ["肾精不足"] },
  { symptomId: "red_eyes", core: ["肝火偏旺"], assist: ["里热偏盛"] },
  { symptomId: "tinnitus", core: ["肾精不足"], assist: ["肝阳偏亢"] },
  { symptomId: "hearing_loss", core: ["肾精不足"], assist: ["气血不足"] },
  { symptomId: "ear_fullness", core: ["痰浊中阻"], assist: [] },

  { symptomId: "nasal_congestion", core: ["风寒外袭"], assist: ["风热犯肺"] },
  { symptomId: "clear_nasal_discharge", core: ["风寒外袭"], assist: [] },
  { symptomId: "yellow_nasal_discharge", core: ["风热犯肺"], assist: ["里热偏盛"] },
  { symptomId: "sneezing", core: ["风寒外袭"], assist: ["肺气不足"] },
  { symptomId: "nosebleed", core: ["里热偏盛"], assist: ["阴虚火旺"] },

  { symptomId: "sore_throat", core: ["风热犯肺"], assist: ["里热偏盛"] },
  { symptomId: "dry_throat", core: ["肺阴不足"], assist: ["阴虚火旺"] },
  { symptomId: "globus", core: ["肝气郁结"], assist: ["痰浊中阻"] },
  { symptomId: "hoarseness", core: ["肺阴不足"], assist: ["风热犯肺"] },

  { symptomId: "dry_mouth", core: ["阴虚火旺"], assist: ["里热偏盛"] },
  { symptomId: "bitter_taste", core: ["肝火偏旺"], assist: ["湿热下注"] },
  { symptomId: "bad_breath", core: ["胃火偏旺"], assist: ["食滞胃肠"] },
  { symptomId: "sticky_mouth_no_thirst", core: ["湿阻中焦"], assist: ["痰浊中阻"] },
  { symptomId: "thirst_cold_drinks", core: ["里热偏盛"], assist: ["阴虚火旺"] },
  { symptomId: "thirst_little_drink", core: ["阴虚火旺"], assist: ["津液不足"] },
  { symptomId: "thirst_warm_drinks", core: ["阳虚体质"], assist: ["肾阳不足"] },
  { symptomId: "no_thirst", core: ["寒湿困脾"], assist: ["阳虚体质"] },
  { symptomId: "mouth_ulcers", core: ["心火偏旺"], assist: ["里热偏盛"] },
  { symptomId: "gum_swelling_pain", core: ["胃火偏旺"], assist: ["里热偏盛"] },

  // 上腹/中腹
  { symptomId: "epigastric_distension_pain", core: ["肝胃不和"], assist: ["气滞"] },
  { symptomId: "epigastric_burning_pain", core: ["胃火偏旺"], assist: ["里热偏盛"] },
  { symptomId: "belching", core: ["胃气不和"], assist: ["肝胃不和"] },
  { symptomId: "acid_reflux", core: ["胃气上逆"], assist: ["肝胃不和"] },
  { symptomId: "heartburn", core: ["胃气上逆"], assist: ["里热偏盛"] },
  { symptomId: "nausea", core: ["胃气不和"], assist: ["痰浊中阻"] },
  { symptomId: "vomiting", core: ["胃气上逆"], assist: ["食滞胃肠"] },
  { symptomId: "food_stagnation", core: ["食滞胃肠"], assist: ["胃气不和"] },
  { symptomId: "poor_appetite", core: ["脾胃虚弱"], assist: ["湿阻中焦"] },
  { symptomId: "epigastric_fullness", core: ["痰浊中阻"], assist: ["湿阻中焦"] },

  { symptomId: "abdominal_distension", core: ["气滞"], assist: ["湿阻中焦"] },
  { symptomId: "abdominal_pain", core: ["气滞"], assist: ["血瘀内阻"] },
  { symptomId: "dull_abdominal_pain", core: ["脾胃虚弱"], assist: ["气血不足"] },
  { symptomId: "pain_relief_warmth", core: ["寒湿困脾"], assist: ["阳虚体质"] },
  { symptomId: "pain_worse_pressure", core: ["里实"], assist: ["热结肠腑"] },
  { symptomId: "diarrhea", core: ["脾气虚弱"], assist: ["寒湿困脾"] },
  { symptomId: "mucus_stool", core: ["湿热下注"], assist: ["湿阻中焦"] },

  // 下腹/经带
  { symptomId: "lower_abd_cold_pain", core: ["寒凝胞宫"], assist: ["肾阳不足"] },
  { symptomId: "menstrual_pain", core: ["气滞"], assist: ["血瘀内阻"] },
  { symptomId: "scanty_menses", core: ["气血不足"], assist: ["肝血不足"] },
  { symptomId: "dark_purple_clots", core: ["血瘀内阻"], assist: ["寒凝胞宫"] },
  { symptomId: "yellow_leukorrhea", core: ["湿热下注"], assist: ["里热偏盛"] },
  { symptomId: "white_leukorrhea", core: ["脾气虚弱"], assist: ["寒湿困脾"] },

  // 大便
  { symptomId: "loose_stool", core: ["脾气虚弱"], assist: ["寒湿困脾"] },
  { symptomId: "watery_diarrhea", core: ["寒湿困脾"], assist: ["阳虚体质"] },
  { symptomId: "undigested_food_stool", core: ["脾胃虚弱"], assist: ["食滞胃肠"] },
  { symptomId: "constipation", core: ["热结肠腑"], assist: ["里热偏盛"] },
  { symptomId: "hard_stool", core: ["热结肠腑"], assist: ["津液不足"] },
  { symptomId: "alternating_diarrhea_constipation", core: ["肝脾不和"], assist: ["气滞"] },
  { symptomId: "foul_smelling_stool", core: ["里热偏盛"], assist: ["食滞胃肠"] },

  // 小便
  { symptomId: "clear_long_urine", core: ["肾阳不足"], assist: ["阳虚体质"] },
  { symptomId: "short_red_urine", core: ["湿热下注"], assist: ["里热偏盛"] },
  { symptomId: "painful_urination", core: ["湿热下注"], assist: [] },
  { symptomId: "nocturia", core: ["肾阳不足"], assist: ["气虚下陷"] },
  { symptomId: "cloudy_urine", core: ["湿热下注"], assist: ["痰浊中阻"] },

  // 全身
  { symptomId: "fatigue", core: ["气血不足"], assist: ["脾气虚弱"] },
  { symptomId: "lazy_low_energy", core: ["脾气虚弱"], assist: ["气血不足"] },
  { symptomId: "cold_aversion", core: ["阳虚体质"], assist: ["肾阳不足"] },
  { symptomId: "cold_limbs", core: ["阳虚体质"], assist: ["气血不足"] },
  { symptomId: "five_center_heat", core: ["阴虚火旺"], assist: ["肾阴不足"] },
  { symptomId: "palm_sole_heat", core: ["阴虚火旺"], assist: ["心阴不足"] },
  { symptomId: "spontaneous_sweating", core: ["卫气不固"], assist: ["气血不足"] },
  { symptomId: "night_sweats", core: ["阴虚火旺"], assist: ["心阴不足"] },
  { symptomId: "pale_complexion", core: ["气血不足"], assist: [] },
  { symptomId: "flushed_face", core: ["里热偏盛"], assist: ["阴虚火旺"] },
  { symptomId: "heavy_limbs", core: ["湿阻中焦"], assist: ["痰浊中阻"] },
  { symptomId: "numbness", core: ["气血不足"], assist: ["血瘀内阻"] },
  { symptomId: "edema", core: ["水湿内停"], assist: ["脾阳虚"] },
];

// ---------------------------
// Combo rules
// ---------------------------
export const COMBO_RULES = [
  { whenAll: ["cold_aversion", "clear_long_urine"], effects: [{ tag: "肾阳不足", delta: +2 }] },
  { whenAll: ["loose_stool", "cold_aversion"], effects: [{ tag: "寒湿困脾", delta: +2 }, { tag: "脾气虚弱", delta: +1 }] },
  { whenAll: ["palm_sole_heat", "five_center_heat"], effects: [{ tag: "阴虚火旺", delta: +2 }] },
  { whenAll: ["yellow_sticky_phlegm", "restlessness"], effects: [{ tag: "里热偏盛", delta: +2 }] },
  { whenAll: ["acid_reflux", "belching"], effects: [{ tag: "胃气上逆", delta: +2 }] },
  { whenAll: ["abdominal_distension", "sighing"], effects: [{ tag: "肝气郁结", delta: +2 }] },
  { whenAll: ["dry_throat", "dry_cough"], effects: [{ tag: "肺阴不足", delta: +2 }] },
  { whenAll: ["dark_purple_clots", "menstrual_pain"], effects: [{ tag: "血瘀内阻", delta: +2 }] },
  { whenAll: ["nasal_congestion", "clear_nasal_discharge"], effects: [{ tag: "风寒外袭", delta: +2 }] },
  { whenAll: ["nasal_congestion", "yellow_nasal_discharge"], effects: [{ tag: "风热犯肺", delta: +2 }] },
];

// ---------------------------
// Tag explanations (bilingual)
// ---------------------------
export const TAG_EXPLANATIONS = {
  "心气不足": {
    zh: "多见心悸、气短乏力，属心气虚弱、推动无力。",
    en: "Often seen with palpitations, shortness of breath, and fatigue—suggesting weakened heart qi and reduced driving function."
  },
  "心神不宁": {
    zh: "多梦易醒、心悸不安，为心神失养或被扰动。",
    en: "Dream-disturbed sleep and restless palpitations may reflect a mind-spirit that is insufficiently nourished or disturbed."
  },
  "心阴不足": {
    zh: "心烦失眠、盗汗、多梦，多为心阴亏虚。",
    en: "Irritability, insomnia, and night sweats may reflect deficiency of heart yin."
  },
  "心火偏旺": {
    zh: "口舌生疮、心烦失眠，多属心火偏旺。",
    en: "Mouth ulcers with restlessness/insomnia may indicate relatively exuberant heart fire."
  },
  "肺气不足": {
    zh: "气短懒言、易感外邪，为肺气虚弱、卫外不固。",
    en: "Shortness of breath, low voice, and susceptibility may suggest lung qi deficiency and weak protective qi."
  },
  "肺阴不足": {
    zh: "干咳少痰、咽干口燥，多为肺阴不足、虚热内生。",
    en: "Dry cough and throat dryness may suggest lung yin deficiency with internal deficiency-heat."
  },
  "痰浊中阻": {
    zh: "胸闷痰多、头重如裹，为痰湿壅阻、清阳不展。",
    en: "Chest oppression and heavy-headedness may indicate phlegm-damp obstruction with impaired clear yang."
  },
  "痰热壅肺": {
    zh: "咳嗽痰黄黏、咽喉不利，多为痰热壅肺。",
    en: "Yellow sticky phlegm with cough may indicate phlegm-heat congesting the lungs."
  },
  "寒痰内盛": {
    zh: "痰白清稀、畏寒肢冷，多属寒痰、阳虚相关。",
    en: "Clear watery phlegm with cold signs may suggest cold-phlegm related to yang deficiency."
  },
  "肝阳偏亢": {
    zh: "头晕头痛、急躁易怒，可理解为肝阳上扰清窍。",
    en: "Headache/dizziness with irritability may suggest liver yang rising disturbing the head."
  },
  "肝火偏旺": {
    zh: "目赤口苦、烦躁易怒，多属肝火偏旺或肝郁化火。",
    en: "Red eyes and bitter taste with irritability may suggest liver fire, or constrained liver qi transforming into fire."
  },
  "肝气郁结": {
    zh: "情志不舒、胸胁不舒、善太息，为肝疏泄失常所致。",
    en: "Emotional constraint with chest/flank tightness and frequent sighing may reflect liver qi constraint."
  },
  "肝血不足": {
    zh: "目干视疲、视物模糊、经量少，可见肝血不足。",
    en: "Dry eyes, visual fatigue, blurred vision, or scanty menses may suggest liver blood deficiency."
  },
  "肾精不足": {
    zh: "耳鸣健忘、视力下降、腰膝酸软，偏肾精不足。",
    en: "Tinnitus, poor memory, reduced vision, or low back weakness may suggest kidney essence deficiency."
  },
  "肾阳不足": {
    zh: "畏寒肢冷、小便清长，属肾阳虚、温煦失职。",
    en: "Cold intolerance with clear copious urination may suggest kidney yang deficiency with insufficient warming function."
  },
  "肾阴不足": {
    zh: "五心烦热、潮热盗汗，多为肾阴不足。",
    en: "Five-center heat, tidal fever, and night sweats may suggest kidney yin deficiency."
  },
  "阳虚体质": {
    zh: "怕冷肢冷、精神不振，多属阳虚体质。",
    en: "Chronic cold tendency with low energy may reflect an underlying yang-deficient constitution."
  },
  "阴虚火旺": {
    zh: "手足心热、五心烦热、盗汗，为阴虚内热/虚热。",
    en: "Heat in palms/soles with night sweats may reflect yin deficiency with deficiency-heat."
  },
  "气血不足": {
    zh: "面色少华、乏力心悸，为气血生化不足。",
    en: "Pale complexion with fatigue and palpitations may suggest insufficiency of qi and blood production."
  },
  "脾气虚弱": {
    zh: "纳呆便溏、乏力困倦，多为脾气虚弱。",
    en: "Poor appetite with loose stools and fatigue may suggest spleen qi weakness."
  },
  "脾胃虚弱": {
    zh: "食少纳呆、腹胀便溏，属脾胃虚弱运化差。",
    en: "Reduced appetite with bloating and loose stools may reflect spleen-stomach weakness and poor transformation."
  },
  "脾阳虚": {
    zh: "畏寒便溏、水肿等，偏脾阳不足运化失职。",
    en: "Cold signs with loose stools or edema may suggest spleen yang deficiency with impaired transformation."
  },
  "寒湿困脾": {
    zh: "便溏、得温痛减、体困，为寒湿困阻中焦。",
    en: "Loose stools, pain relieved by warmth, and heaviness may suggest cold-damp obstructing the middle burner."
  },
  "湿阻中焦": {
    zh: "腹胀、口黏、四肢沉重，为湿邪困阻中焦。",
    en: "Bloating, sticky mouth, and heavy limbs may indicate dampness obstructing the middle burner."
  },
  "湿热下注": {
    zh: "小便短赤、尿痛、带下黄等，多属湿热下注。",
    en: "Dark scanty urine, painful urination, or yellow leukorrhea may suggest damp-heat pouring downward."
  },
  "里热偏盛": {
    zh: "口渴喜冷、烦躁、尿短赤、便秘等，属里热偏盛。",
    en: "Thirst for cold drinks, restlessness, dark urine, or constipation may indicate relatively strong internal heat."
  },
  "热结肠腑": {
    zh: "大便干结、腹满拒按，多为实热结滞肠腑。",
    en: "Dry constipation with fullness and tenderness may suggest heat binding in the intestines (excess)."
  },
  "食滞胃肠": {
    zh: "嗳腐吞酸、腹胀纳呆，为饮食停滞。",
    en: "Foul belching, reflux, bloating, and poor appetite may suggest food stagnation."
  },
  "胃气不和": {
    zh: "恶心嗳气、胃脘不舒，为胃失和降。",
    en: "Nausea and belching with epigastric discomfort may suggest disharmony of stomach qi."
  },
  "胃气上逆": {
    zh: "反酸烧心、呃逆，为胃气上逆。",
    en: "Acid reflux and heartburn may indicate rebellious stomach qi (upward counterflow)."
  },
  "胃火偏旺": {
    zh: "牙龈肿痛、口臭、胃脘灼痛，多属胃火偏旺。",
    en: "Swollen gums, bad breath, or burning epigastric pain may suggest relatively exuberant stomach fire."
  },
  "肝胃不和": {
    zh: "胃脘胀痛、嗳气反酸，多由肝气犯胃。",
    en: "Epigastric distension/pain with belching/reflux may reflect liver qi affecting the stomach."
  },
  "气滞": {
    zh: "胀痛窜痛、情志相关，多与气机郁滞有关。",
    en: "Distending or migrating pain often linked to stress may reflect qi stagnation."
  },
  "血瘀内阻": {
    zh: "刺痛固定、经色紫暗有块，多为瘀血阻络。",
    en: "Stabbing fixed pain or dark clots may suggest blood stasis obstructing the channels."
  },
  "水湿内停": {
    zh: "水肿、体重增加，多为水湿停聚。",
    en: "Edema and weight gain may reflect retained fluids/dampness."
  },
  "卫气不固": {
    zh: "自汗、易感风邪，多属卫外失固。",
    en: "Spontaneous sweating and easy catching colds may suggest weak defensive qi."
  },
  "气虚下陷": {
    zh: "久病乏力、便溏或下陷感，可见气虚下陷倾向（示意）。",
    en: "Chronic fatigue with sinking sensations or loose stools may suggest qi deficiency with sinking tendency (illustrative)."
  },
  "里实": {
    zh: "拒按、胀满等偏实证线索（示意标签，用于约束）。",
    en: "Aversion to pressure or marked fullness can be excess clues (illustrative constraint tag)."
  },
  "津液不足": {
    zh: "口干、便干等提示津液不足/阴津亏（示意标签）。",
    en: "Dry mouth or dry stools may suggest insufficient body fluids (illustrative tag)."
  },
  "肝脾不和": {
    zh: "便秘腹泻交替、情志相关，提示肝脾不和（示意）。",
    en: "Alternating constipation/diarrhea with stress link may suggest liver–spleen disharmony (illustrative)."
  },
  "风寒外袭": {
    zh: "鼻塞流清涕、喷嚏恶寒，多为风寒束表。",
    en: "Clear nasal discharge with sneezing and chills may suggest wind-cold invading the exterior."
  },
  "风热犯肺": {
    zh: "咽痛、流黄涕、发热等，多为风热犯肺。",
    en: "Sore throat with yellow discharge and fever may suggest wind-heat affecting the lungs."
  },
  "寒凝胞宫": {
    zh: "小腹冷痛、经行腹痛得温缓，多为寒凝胞宫之象（示意）。",
    en: "Cold lower abdominal pain relieved by warmth may suggest cold congealing in the uterus (illustrative)."
  },
};

// ---------------------------
// Treatment templates (bilingual)
// ---------------------------
export const TAG_TREATMENT = {
  "心气不足": {
    principle: {
      zh: "治宜益气养心，宁心安神。",
      en: "Treatment tends to focus on tonifying qi, nourishing the heart, and calming the spirit."
    },
    acupuncture: {
      zh: "针灸思路偏补益心气、安神定悸，由医师辨证取用。",
      en: "Acupuncture strategies may emphasize supporting heart qi and calming the spirit, adjusted by a clinician."
    },
    herbal: {
      zh: "用药思路偏补益心气、养心安神，需面诊结合舌脉决定。",
      en: "Herbal direction may focus on supporting heart qi and calming the spirit, determined after in-person assessment."
    }
  },

  "心神不宁": {
    principle: {
      zh: "治宜养心安神，调和阴阳。",
      en: "Treatment tends to nourish the heart, calm the spirit, and harmonize yin–yang."
    },
    acupuncture: {
      zh: "针灸思路偏安神、调心，按体质加减。",
      en: "Acupuncture may focus on calming the spirit and regulating the heart, tailored to constitution."
    },
    herbal: {
      zh: "用药思路偏养心安神、调和阴阳，需面诊决定。",
      en: "Herbal direction may emphasize calming and harmonizing, decided after evaluation."
    }
  },

  "肺气不足": {
    principle: {
      zh: "治宜补益肺气，固表止汗。",
      en: "Treatment tends to tonify lung qi, strengthen the exterior, and reduce sweating."
    },
    acupuncture: {
      zh: "针灸思路偏益气固表、宣肃肺气，按证加减。",
      en: "Acupuncture may support qi, strengthen defense, and regulate lung function, based on presentation."
    },
    herbal: {
      zh: "用药思路偏补肺益气、固表，需辨证。",
      en: "Herbal direction may support lung qi and defensive qi, guided by pattern."
    }
  },

  "肺阴不足": {
    principle: {
      zh: "治宜养阴润肺，清虚热。",
      en: "Treatment tends to nourish yin, moisten the lungs, and clear deficiency-heat."
    },
    acupuncture: {
      zh: "针灸思路偏养阴润燥、清虚热，按证取用。",
      en: "Acupuncture may emphasize nourishing yin and reducing deficiency-heat, tailored clinically."
    },
    herbal: {
      zh: "用药思路偏养阴润肺，需结合舌脉。",
      en: "Herbal direction may focus on nourishing lung yin, aligned with tongue/pulse findings."
    }
  },

  "痰浊中阻": {
    principle: {
      zh: "治宜燥湿化痰，理气和中。",
      en: "Treatment tends to dry dampness, transform phlegm, regulate qi, and harmonize the middle."
    },
    acupuncture: {
      zh: "针灸思路偏化痰开郁、健脾运湿，按证加减。",
      en: "Acupuncture may focus on transforming phlegm, relieving constraint, and supporting spleen damp-transformation."
    },
    herbal: {
      zh: "用药思路偏化痰祛湿与理气健脾并用。",
      en: "Herbal direction may combine phlegm/damp transformation with qi regulation and spleen support."
    }
  },

  "痰热壅肺": {
    principle: {
      zh: "治宜清热化痰，宣肺止咳。",
      en: "Treatment tends to clear heat, transform phlegm, ventilate the lungs, and relieve cough."
    },
    acupuncture: {
      zh: "针灸思路偏清热宣肺、化痰止咳，按证施治。",
      en: "Acupuncture may focus on clearing heat, ventilating the lungs, and transforming phlegm, based on pattern."
    },
    herbal: {
      zh: "用药思路偏清热化痰宣肺，需辨证。",
      en: "Herbal direction may clear heat and transform phlegm, determined by clinical pattern."
    }
  },

  "肝气郁结": {
    principle: {
      zh: "治宜疏肝理气，解郁和中。",
      en: "Treatment tends to soothe the liver, regulate qi, relieve constraint, and harmonize the middle."
    },
    acupuncture: {
      zh: "针灸思路偏疏肝解郁、调气机，按证加减。",
      en: "Acupuncture may focus on relieving liver constraint and regulating qi movement."
    },
    herbal: {
      zh: "用药思路偏疏肝理气，需结合情志与体质。",
      en: "Herbal direction may emphasize liver-soothing and qi regulation, considering stress and constitution."
    }
  },

  "肾阳不足": {
    principle: {
      zh: "治宜温补肾阳，固摄下元。",
      en: "Treatment tends to warm and support kidney yang and stabilize foundational functions."
    },
    acupuncture: {
      zh: "针灸思路偏温阳固摄、补肾助阳，医师掌握强度。",
      en: "Acupuncture may focus on warming yang and supporting kidney function, with intensity guided clinically."
    },
    herbal: {
      zh: "用药思路偏温补肾阳，需面诊。",
      en: "Herbal direction may warm and support kidney yang, determined after evaluation."
    }
  },

  "阴虚火旺": {
    principle: {
      zh: "治宜滋阴降火，使阴阳相济。",
      en: "Treatment tends to nourish yin and reduce deficiency-heat to restore balance."
    },
    acupuncture: {
      zh: "针灸思路偏滋阴清虚热、宁心安神，按证加减。",
      en: "Acupuncture may nourish yin, reduce deficiency-heat, and calm the spirit as appropriate."
    },
    herbal: {
      zh: "用药思路偏滋阴清热，需结合舌脉体质。",
      en: "Herbal direction may nourish yin and clear heat, aligned with tongue/pulse and constitution."
    }
  },

  "脾气虚弱": {
    principle: {
      zh: "治宜健脾益气，助运化。",
      en: "Treatment tends to strengthen the spleen, tonify qi, and support transformation."
    },
    acupuncture: {
      zh: "针灸思路偏健脾益气、和中运化。",
      en: "Acupuncture may focus on strengthening spleen qi and harmonizing digestion."
    },
    herbal: {
      zh: "用药思路偏健脾益气，需结合饮食与体质。",
      en: "Herbal direction may strengthen spleen qi, considering diet and constitution."
    }
  },

  "寒湿困脾": {
    principle: {
      zh: "治宜温中散寒，燥湿运脾。",
      en: "Treatment tends to warm the middle, dispel cold, dry dampness, and support spleen transport."
    },
    acupuncture: {
      zh: "针灸思路偏温中化湿、健脾运化，按证加减。",
      en: "Acupuncture may warm the middle and resolve dampness while supporting spleen function."
    },
    herbal: {
      zh: "用药思路偏温中化湿，需面诊。",
      en: "Herbal direction may warm the middle and transform dampness, determined after evaluation."
    }
  },

  "湿热下注": {
    principle: {
      zh: "治宜清热利湿，通淋止痛。",
      en: "Treatment tends to clear heat, drain dampness, and relieve urinary discomfort."
    },
    acupuncture: {
      zh: "针灸思路偏清热利湿、调下焦气化，按证施治。",
      en: "Acupuncture may clear damp-heat and regulate lower burner function, tailored clinically."
    },
    herbal: {
      zh: "用药思路偏清热利湿，需辨证。",
      en: "Herbal direction may clear heat and drain dampness, guided by pattern."
    }
  },

  "里热偏盛": {
    principle: {
      zh: "治宜清热泻火，保津护液。",
      en: "Treatment tends to clear internal heat and protect body fluids."
    },
    acupuncture: {
      zh: "针灸思路偏清热、调气机，按证加减。",
      en: "Acupuncture may emphasize clearing heat and regulating qi dynamics."
    },
    herbal: {
      zh: "用药思路偏清热保津，需辨证。",
      en: "Herbal direction may clear heat and preserve fluids, determined by pattern."
    }
  },

  "热结肠腑": {
    principle: {
      zh: "治宜泻热通腑，润燥行滞。",
      en: "Treatment tends to clear heat, unblock the bowels, moisten dryness, and move stagnation."
    },
    acupuncture: {
      zh: "针灸思路偏通腑泄热、行气导滞，按证施治。",
      en: "Acupuncture may support bowel regulation and heat reduction, based on presentation."
    },
    herbal: {
      zh: "用药思路偏通腑泄热润燥，需辨证。",
      en: "Herbal direction may focus on bowel-unblocking with heat clearing, guided clinically."
    }
  },

  "血瘀内阻": {
    principle: {
      zh: "治宜活血化瘀，通络止痛。",
      en: "Treatment tends to invigorate blood, resolve stasis, open the channels, and relieve pain."
    },
    acupuncture: {
      zh: "针灸思路偏行气活血、通络止痛，按证取用。",
      en: "Acupuncture may promote circulation and relieve pain, tailored by pattern."
    },
    herbal: {
      zh: "用药思路偏活血化瘀，出血倾向需谨慎。",
      en: "Herbal direction may invigorate blood and resolve stasis; use caution with bleeding tendency."
    }
  }
};


