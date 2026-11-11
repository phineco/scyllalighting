import { Locale, t } from "./site";
export const applications = [
  {
    id: "commercial",
    title: ["Office & retail", "办公与商业"],
    line: ["Comfort through the working day.", "让工作日的光，更舒适。"],
    description: [
      "Start with ceiling dimensions, working height and the tasks in each area. Match general illumination and accent lighting as one specification.",
      "从天花尺寸、工作面高度与区域任务出发，协调基础照明和氛围照明的选型。",
    ],
    products: ["panel", "downlight", "strip"],
    points: [
      ["Ceiling type and cut-out dimensions", "天花类型与开孔尺寸"],
      ["Colour temperature and glare expectations", "色温与眩光要求"],
      ["Control requirements and operating hours", "控制方式与每日使用时长"],
    ],
  },
  {
    id: "residential",
    title: ["Residential & hospitality", "住宅与酒店"],
    line: [
      "A consistent atmosphere, room to room.",
      "让光的氛围，在空间中延续。",
    ],
    description: [
      "Consider the main light, circulation areas and replacement light sources together. Define the visual finish and colour temperature before selecting each fixture.",
      "统筹主照明、过道与替换光源，在选型前确认外观风格与色温要求。",
    ],
    products: ["ceiling", "bulb", "downlight"],
    points: [
      ["Room size and mounting method", "房间面积与安装方式"],
      ["Fixture appearance and colour temperature", "灯具外观与色温"],
      ["Dimming compatibility, if required", "如需调光，明确系统兼容要求"],
    ],
  },
  {
    id: "industrial",
    title: ["Warehouse & workshop", "仓储与车间"],
    line: ["Built around the work below.", "围绕作业需求，规划每一束光。"],
    description: [
      "Tell us the mounting height, layout and working conditions. We can then review high-bay and linear lighting options against the project brief.",
      "请提供安装高度、区域布局与作业条件，以便根据项目要求评审工矿灯和线性灯具方案。",
    ],
    products: ["highbay", "tri-proof"],
    points: [
      [
        "Mounting height, spacing and target illuminance",
        "安装高度、间距与目标照度",
      ],
      ["Dust, moisture and ambient conditions", "粉尘、潮湿与环境条件"],
      ["Supply voltage and maintenance access", "供电电压与维护条件"],
    ],
  },
  {
    id: "outdoor",
    title: ["Outdoor & utility areas", "户外与配套空间"],
    line: ["Specify for the environment.", "让选型，回应真实环境。"],
    description: [
      "For facades, yards and service areas, define the exposure, mounting position and required light distribution first. The final protection rating is selected per model.",
      "针对立面、庭院与配套空间，先明确环境暴露、安装位置与配光要求，再按具体型号确认防护等级。",
    ],
    products: ["flood", "tri-proof"],
    points: [
      ["Weather exposure and ambient temperature", "天气暴露与环境温度"],
      ["Mounting position and illumination area", "安装位置与照明范围"],
      ["Sensor, control and protection requirements", "感应、控制与防护要求"],
    ],
  },
] as const;
export const faq = [
  {
    q: ["Can I order under my own brand?", "能否使用我自己的品牌？"],
    a: [
      "Yes. We accept OEM/ODM enquiries. Share the selected range, logo, packaging needs and destination market; the branding method and production terms are confirmed after review.",
      "可以洽谈 OEM/ODM 订单。请提供产品系列、Logo、包装要求与目标市场，品牌实施方式和生产条件经评审后确认。",
    ],
  },
  {
    q: ["What is the minimum order quantity?", "起订量是多少？"],
    a: [
      "MOQ depends on the product, configuration and packaging. Include your expected quantity in the enquiry so we can assess a practical combination.",
      "起订量取决于产品、配置和包装。请在询盘中写明预计数量，我们会据此评估可行组合。",
    ],
  },
  {
    q: [
      "Can we approve a sample before a bulk order?",
      "批量采购前能否确认样品？",
    ],
    a: [
      "Ask for a sample of the proposed configuration. Availability, sample cost and timing are confirmed with the quotation. The approved specification should be recorded before bulk production.",
      "可申请拟选配置的样品。是否可提供、样品费用及时间随报价确认，批量生产前应记录批准的样品规格。",
    ],
  },
  {
    q: ["Which product documents can I request?", "可以申请哪些产品资料？"],
    a: [
      "Specify the model and destination market when requesting a specification sheet, drawing, test report or applicable conformity document. Availability and model coverage are checked individually.",
      "申请规格书、图纸、测试报告或适用的符合性文件时，请明确型号与目标市场。文件是否可提供及覆盖型号需逐项核实。",
    ],
  },
  {
    q: ["What are the lead time and warranty?", "交期与质保如何确定？"],
    a: [
      "Both are confirmed in the written proposal for your selected product and order. Configuration changes, packaging, sampling and documentation can affect the schedule.",
      "交期与质保在所选产品和订单的书面方案中确认。配置、包装、打样与文件要求可能影响采购计划。",
    ],
  },
  {
    q: [
      "Do these pages show the complete catalogue?",
      "网站是否展示了全部产品？",
    ],
    a: [
      "The website presents selected product families. Share your application if you need an alternative configuration or a coordinated range.",
      "网站集中展示精选产品系列。如需其他配置或组合选型，请提供应用需求进一步洽谈。",
    ],
  },
] as const;
export const presets: Record<string, [string, string]> = {
  "private-label": [
    "I am interested in private-label lighting.\nTarget market: \nSelected series: \nExpected quantity: \nLogo and packaging requirements: ",
    "我希望洽谈品牌贴牌照明。\n目标市场：\n意向系列：\n预计数量：\nLogo 与包装要求：",
  ],
  adaptation: [
    "I would like to adapt an existing range.\nApplication: \nRequired power / CCT / voltage: \nControl requirements: \nExpected quantity: ",
    "我希望在现有系列上进行规格适配。\n应用场景：\n所需功率 / 色温 / 电压：\n控制要求：\n预计数量：",
  ],
  development: [
    "I would like a custom development review.\nApplication and design reference: \nTarget dimensions / performance: \nMarket and quantity: \nTarget schedule: ",
    "我希望进行定制开发评审。\n应用与设计参考：\n目标尺寸 / 性能：\n目标市场与数量：\n采购计划：",
  ],
  documents: [
    "Please review the available documents for:\nProduct family / model: \nDestination market: \nRequired documents: ",
    "请协助核实以下产品资料：\n产品系列 / 型号：\n目标市场：\n所需文件：",
  ],
};
export function briefFor(locale: Locale, context?: string) {
  if (!context) return "";
  const app = applications.find((a) => a.id === context);
  if (app)
    return t(
      locale,
      "Application: " +
        app.title[0] +
        "\nMounting and site conditions: \nTarget market: \nExpected quantity: ",
      "应用场景：" +
        app.title[1] +
        "\n安装与现场条件：\n目标市场：\n预计数量：",
    );
  return presets[context]?.[locale === "en" ? 0 : 1] || "";
}
