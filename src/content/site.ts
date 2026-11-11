export type Locale = "en" | "zh-CN";
export const locales: Locale[] = ["en", "zh-CN"];
export const isLocale = (s: string): s is Locale =>
  locales.includes(s as Locale);
export const t = (l: Locale, en: string, zh: string) => (l === "en" ? en : zh);
export const categories = [
  {
    id: "panel",
    en: "LED Panel Lights",
    zh: "LED 面板灯",
    useEn: "Offices · Education · Retail",
    useZh: "办公 · 教育 · 商业空间",
    spec: "21 / 36 W · 595 × 595 mm",
    descEn: "Recessed back-lit panels for balanced general lighting.",
    descZh: "背光式嵌入面板灯，为办公与商业空间提供均匀照明。",
  },
  {
    id: "flood",
    en: "LED Floodlights",
    zh: "LED 投光灯",
    useEn: "Facades · Yards · Outdoor areas",
    useZh: "建筑立面 · 庭院 · 户外空间",
    spec: "10–200 W · 3000 / 4000 / 6500 K",
    descEn:
      "Compact floodlights with adjustable brackets and black or white housing options.",
    descZh: "紧凑型投光灯，配可调安装支架，提供黑白外壳选择。",
  },
  {
    id: "highbay",
    en: "LED High Bay Lights",
    zh: "LED 工矿灯",
    useEn: "Warehouses · Workshops · Logistics",
    useZh: "仓储 · 车间 · 物流中心",
    spec: "50 / 100 / 150 W · 4000 / 6500 K",
    descEn:
      "UFO-style luminaires with die-cast aluminium housings for industrial projects.",
    descZh: "UFO 圆形工矿灯，采用压铸铝外壳，适用于工业照明项目。",
  },
  {
    id: "bulb",
    en: "LED Bulbs & Light Sources",
    zh: "LED 灯泡与光源",
    useEn: "Residential · Hospitality · Distribution",
    useZh: "住宅 · 酒店 · 渠道分销",
    spec: "4.9–15 W · 220–240 V",
    descEn:
      "Everyday LED light sources in familiar shapes for retail and distribution.",
    descZh: "多种常用外形 LED 光源，满足零售与分销渠道的选品需求。",
  },
  {
    id: "ceiling",
    en: "LED Ceiling Lights",
    zh: "LED 吸顶灯",
    useEn: "Homes · Corridors · Hospitality",
    useZh: "家居 · 走廊 · 酒店",
    spec: "12 / 18 / 30 / 36 W · 1CCT / 3CCT",
    descEn:
      "Low-profile ceiling lighting with decorative frame and colour temperature options.",
    descZh: "简洁吸顶照明，提供装饰边框与多种色温选择。",
  },
  {
    id: "downlight",
    en: "LED Downlights",
    zh: "LED 筒灯",
    useEn: "Retail · Offices · Residential",
    useZh: "零售 · 办公 · 住宅",
    spec: "9–24 W · Round / Square",
    descEn:
      "Recessed round and square luminaires for clean ceiling installations.",
    descZh: "圆形与方形嵌入式灯具，让天花照明简洁统一。",
  },
  {
    id: "strip",
    en: "LED Strip Lights",
    zh: "LED 灯带",
    useEn: "Coves · Displays · Accent lighting",
    useZh: "灯槽 · 展示 · 氛围照明",
    spec: "5 / 12 / 24 V · White / RGB / RGBW",
    descEn:
      "Flexible lighting for continuous lines, architectural accents and display details.",
    descZh: "柔性线性照明，用于建筑灯槽、空间轮廓与展示细节。",
  },
  {
    id: "tri-proof",
    en: "LED Tri-proof Lights",
    zh: "LED 三防灯",
    useEn: "Parking · Utility areas · Workshops",
    useZh: "停车场 · 配套空间 · 车间",
    spec: "18 / 36 / 48 W · 600 / 1200 / 1500 mm",
    descEn:
      "Linear enclosed luminaires for practical lighting in service and working areas.",
    descZh: "封闭式线性灯具，为配套与作业空间提供实用照明。",
  },
];
export const nav = (l: Locale) => [
  { path: "products", label: t(l, "Products", "精选产品") },
  {
    path: "manufacturing",
    label: t(l, "Manufacturing & Quality", "制造与质量"),
  },
  { path: "oem-odm", label: "OEM / ODM" },
  { path: "about", label: t(l, "About Scylla", "关于锡拉") },
];
export const pageNames: Record<string, [string, string]> = {
  "": ["LED lighting for your market", "为您的市场，提供合适的光"],
  products: [
    "A considered range. A clearer choice.",
    "精选产品，让选择更清晰。",
  ],
  manufacturing: [
    "The capability behind the light.",
    "光的背后，是制造的力量。",
  ],
  "oem-odm": [
    "Your brand. Our production support.",
    "您的品牌，我们的制造配套。",
  ],
  about: [
    "A practical partner for your lighting business.",
    "值得信赖的照明业务伙伴。",
  ],
  contact: [
    "Let’s build your next lighting range.",
    "一起打造您的下一组照明产品。",
  ],
  privacy: ["Privacy notice", "隐私说明"],
};
