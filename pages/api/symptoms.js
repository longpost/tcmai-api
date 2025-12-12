// pages/api/symptoms.js
import { SYMPTOMS, REGIONS } from "../../lib/data";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const lang = (req.query?.lang || "zh").toLowerCase() === "en" ? "en" : "zh";

  const regions = {};
  for (const r of REGIONS) regions[r] = [];

  for (const s of SYMPTOMS) {
    for (const r of s.regions || []) {
      if (!regions[r]) regions[r] = [];
      regions[r].push({
        id: s.id,
        zh: s.zh,
        en: s.en
      });
    }
  }

  // stable sort by label (current lang)
  for (const r of Object.keys(regions)) {
    regions[r].sort((a, b) => {
      const A = (lang === "en" ? a.en : a.zh) || "";
      const B = (lang === "en" ? b.en : b.zh) || "";
      return A.localeCompare(B);
    });
  }

  return res.status(200).json({ regions });
}
