export type Locale = "en" | "zh-CN";
export const locales: Locale[] = ["en", "zh-CN"];
export const isLocale = (s: string): s is Locale =>
  locales.includes(s as Locale);
export const t = (l: Locale, en: string, zh: string) => (l === "en" ? en : zh);
export const categories = [
  {
    id: "panel",
    slug: "panel-lights",
    en: "LED Panel Lights",
    zh: "LED 面板灯",
    useEn: "Offices · Education · Retail",
    useZh: "办公 · 教育 · 商业空间",
    spec: "13–62 W · Recessed / Surface / Accessories",
    descEn: "Panel lighting in recessed, surface-mounted and controlled formats, with matching mounting accessories.",
    descZh: "提供嵌入式、明装与控制型面板照明，并配套安装附件。",
  },
  {
    id: "flood",
    slug: "flood-lights",
    en: "LED Floodlights",
    zh: "LED 投光灯",
    useEn: "Facades · Yards · Outdoor areas",
    useZh: "建筑立面 · 庭院 · 户外空间",
    spec: "10–300 W · General / PIR / High-output",
    descEn:
      "Compact floodlights with adjustable brackets and black or white housing options.",
    descZh: "紧凑型投光灯，配可调安装支架，提供黑白外壳选择。",
  },
  {
    id: "highbay",
    slug: "high-bay-lights",
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
    slug: "led-bulbs",
    en: "LED Bulbs & Light Sources",
    zh: "LED 灯泡与光源",
    useEn: "Residential · Hospitality · Distribution",
    useZh: "住宅 · 酒店 · 渠道分销",
    spec: "2.9–50 W · General / Spot / Sensor",
    descEn:
      "Everyday LED light sources in familiar shapes for retail and distribution.",
    descZh: "多种常用外形 LED 光源，满足零售与分销渠道的选品需求。",
  },
  {
    id: "ceiling",
    slug: "ceiling-lights",
    en: "LED Ceiling Lights",
    zh: "LED 吸顶灯",
    useEn: "Homes · Corridors · Hospitality",
    useZh: "家居 · 走廊 · 酒店",
    spec: "12–36 W · Decorative / Sensor / Remote",
    descEn:
      "Low-profile ceiling lighting with decorative frame and colour temperature options.",
    descZh: "简洁吸顶照明，提供装饰边框与多种色温选择。",
  },
  {
    id: "downlight",
    slug: "downlights",
    en: "LED Downlights",
    zh: "LED 筒灯",
    useEn: "Retail · Offices · Residential",
    useZh: "零售 · 办公 · 住宅",
    spec: "3–26 W · Recessed / Surface",
    descEn:
      "Round and square downlights in recessed and surface-mounted formats, with different body and driver options.",
    descZh: "圆形与方形筒灯，提供嵌入式、明装及多种灯体与驱动方案。",
  },
  {
    id: "strip",
    slug: "strip-lights",
    en: "LED Strip Lights",
    zh: "LED 灯带",
    useEn: "Coves · Displays · Accent lighting",
    useZh: "灯槽 · 展示 · 氛围照明",
    spec: "5–220 V options · White / RGB / RGBW",
    descEn:
      "Flexible lighting for continuous lines, architectural accents and display details.",
    descZh: "柔性线性照明，用于建筑灯槽、空间轮廓与展示细节。",
  },
  {
    id: "tri-proof",
    slug: "tri-proof-lights",
    en: "LED Tri-proof Lights",
    zh: "LED 三防灯",
    useEn: "Parking · Utility areas · Workshops",
    useZh: "停车场 · 配套空间 · 车间",
    spec: "18 / 36 / 48 W · 600 / 1200 / 1500 mm",
    descEn:
      "Linear enclosed luminaires for practical lighting in service and working areas.",
    descZh: "封闭式线性灯具，为配套与作业空间提供实用照明。",
  },
  {
    id: "batten", slug: "battens",
    en: "LED Battens", zh: "LED 支架灯具",
    useEn: "Utility rooms · Workshops · Tube installations",
    useZh: "配套用房 · 车间 · 灯管安装",
    spec: "600 / 1200 / 1500 mm · Single / Twin tube",
    descEn: "Single- and twin-tube batten housings for T8 installations. Match the tube length and wiring arrangement before ordering.",
    descZh: "适用于 T8 灯管安装的单管、双管支架灯具，订货前确认灯管长度与接线方式。",
  },
  {
    id: "tube", slug: "led-tubes",
    en: "LED Tubes", zh: "LED 灯管",
    useEn: "Offices · Retail · Replacement lighting",
    useZh: "办公 · 零售 · 替换照明",
    spec: "6–24 W · G13 / Sensor / DALI",
    descEn: "T8 LED tubes in standard lengths. Confirm the base, supply voltage and existing fixture compatibility for the selected model.",
    descZh: "提供常用长度的 T8 LED 灯管，按具体型号确认灯头、供电电压及现有灯具兼容性。",
  },
  {
    id: "filament", slug: "filament-bulbs",
    en: "LED Filament Bulbs", zh: "LED 灯丝灯",
    useEn: "Hospitality · Decorative fixtures · Retail",
    useZh: "酒店餐饮 · 装饰灯具 · 零售",
    spec: "2.3–12 W · E14 / E27",
    descEn: "Glass filament light sources in candle, standard and globe shapes, with clear or amber finishes depending on the selected model.",
    descZh: "提供烛形、标准球形与大球泡等玻璃灯丝光源，可按型号选择透明或琥珀外观。",
  },
  {
    id: "smart", slug: "smart-lighting",
    en: "Smart Lighting", zh: "智能照明",
    useEn: "Homes · Hospitality · Ambient lighting",
    useZh: "住宅 · 酒店 · 氛围照明",
    spec: "4–24 W · Ceiling / Downlight / Bulb",
    descEn: "Smart ceiling lights, downlights and bulbs with colour and white-light options. Confirm the control platform, network requirements and target-market compatibility with your brief.",
    descZh: "智能吸顶灯、筒灯与灯泡，提供彩光和白光方案，需结合需求确认控制平台、网络条件和目标市场兼容性。",
  },
  {
    id: "street", slug: "street-lights",
    en: "LED Street Lights", zh: "LED 路灯",
    useEn: "Roadways · Industrial parks · Access roads",
    useZh: "道路 · 工业园区 · 厂区通道",
    spec: "40–200 W · 4000 / 6500 K",
    descEn: "Roadway luminaires with aluminium housings. Share pole dimensions, mounting height and distribution requirements for model selection.",
    descZh: "铝制外壳道路灯具，可根据灯杆尺寸、安装高度和配光要求选择具体型号。",
  },
  {
    id: "moisture", slug: "moisture-proof-lights",
    en: "LED Moisture-proof Lights", zh: "LED 防潮灯",
    useEn: "Stairwells · Corridors · Utility areas",
    useZh: "楼梯间 · 走廊 · 配套区域",
    spec: "8 / 12 / 18 / 24 W · Round / Oval",
    descEn: "Sealed round and oval luminaires with black or white frames for wall or ceiling installation.",
    descZh: "圆形与椭圆形封闭式灯具，提供黑白边框，可用于墙面或天花安装。",
  },
  {
    id: "solar", slug: "solar-lighting",
    en: "Solar Lighting", zh: "太阳能照明",
    useEn: "Access roads · Outdoor areas · Off-grid sites",
    useZh: "通道 · 户外区域 · 离网场所",
    spec: "3.7–40 W · Floodlight / Street light",
    descEn: "Solar flood and street lighting with separate panels. Site sunlight, battery configuration and operating schedule must be reviewed for each project.",
    descZh: "配独立太阳能板的投光和道路照明，需按项目评审现场日照、电池配置与运行时段。",
  },
];
export type ProductCategory = (typeof categories)[number];
export const featuredCategories = categories.slice(0, 8);
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
    "Browse selected LED lighting categories, open each series list and discuss specifications for your market.",
    "按分类浏览精选 LED 灯具，查看系列列表与参考规格，为目标市场建立产品组合。",
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
