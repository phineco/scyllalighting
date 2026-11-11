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
  { path: "applications", label: t(l, "Applications", "应用场景") },
  {
    path: "manufacturing",
    label: t(l, "Manufacturing & Quality", "制造与质量"),
  },
  { path: "oem-odm", label: "OEM / ODM" },
  { path: "resources", label: t(l, "Resources", "资料中心") },
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
  applications: [
    "The right light starts with the space.",
    "从空间出发，找到合适的光。",
  ],
  resources: [
    "Clear information. Better decisions.",
    "让资料更清楚，让决策更从容。",
  ],
};

export const pageDescriptions: Record<string, [string, string]> = {
  "": [
    "Selected LED lighting, manufacturing support and OEM/ODM solutions for importers, distributors and brands.",
    "锡拉照明为进口商、分销商与品牌客户提供精选 LED 灯具、制造配套与 OEM/ODM 服务。",
  ],
  products: [
    "Explore eight selected LED lighting families, compare indicative specifications and discuss a configuration for your market.",
    "查看八类精选 LED 照明系列、参考规格与可洽谈配置，为目标市场建立产品组合。",
  ],
  applications: [
    "Connect office, residential, warehouse and outdoor lighting requirements with selected Scylla Lighting product families.",
    "从办公、住宅、仓储与户外空间出发，匹配锡拉照明精选灯具与项目选型要点。",
  ],
  manufacturing: [
    "Explore manufacturing support, quality checkpoints and the sample-to-shipment review process at Scylla Lighting.",
    "了解锡拉照明的生产制造配套、质量确认节点与从样品到出运的协作流程。",
  ],
  "oem-odm": [
    "Discuss private-label LED lighting, specification adaptations and custom development with Scylla Lighting.",
    "与锡拉照明洽谈 LED 灯具贴牌、规格适配和定制开发，确认样品、包装与生产需求。",
  ],
  about: [
    "Scylla Lighting is operated by 安徽锡拉科技有限公司, supporting importers, distributors, brands and project buyers.",
    "Scylla Lighting 锡拉照明由安徽锡拉科技有限公司运营，为进口商、分销商、品牌与工程采购提供服务。",
  ],
  resources: [
    "Download the Scylla Lighting selected-range reference and enquiry brief, and review documents to request for your project.",
    "下载锡拉照明精选参数参考清单与采购需求模板，了解项目报价所需的资料。",
  ],
  contact: [
    "Share your lighting application, target market, quantity and OEM/ODM requirements with Scylla Lighting.",
    "向锡拉照明提交应用场景、目标市场、预计数量与 OEM/ODM 定制需求。",
  ],
  privacy: [
    "How Scylla Lighting uses the information supplied with your business enquiry.",
    "了解锡拉照明如何使用业务询盘中提交的信息。",
  ],
};
