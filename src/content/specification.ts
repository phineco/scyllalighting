import type { Locale } from "./site";

// Shared by visible specifications, enquiry briefs and downloadable references.
const labels: [string, string][] = [
  ["Panel mounting accessory", "面板安装配件"],
  ["Frame fit confirmed per panel", "按面板确认框架适配"],
  ["Screw-free assembly", "免螺丝组装"],
  ["Multiple frame formats", "多种框架规格"],
  ["Suspension accessory", "吊装配件"],
  ["Compatibility checked per panel", "按面板确认兼容性"],
  ["Safety-wire accessory", "安全绳配件"],
  ["Fixing method confirmed with order", "随订单确认固定方式"],
  ["Spring-clip accessory", "弹簧夹配件"],
  ["Match frame and ceiling", "匹配边框与天花"],
  ["Single / Twin tube", "单管 / 双管"],
  ["Clear PC caps", "透明 PC 端座"],
  ["3 white options", "三种白光选项"],
  ["Decorative glass", "装饰玻璃"],
  ["Daylight sensor", "光感"],
  ["Surface mounted", "明装"],
  ["High-output", "高输出"],
  ["Recessed", "嵌入式"],
  ["Surface", "明装"],
  ["Accessories", "配件"],
  ["Decorative", "装饰款"],
  ["Microwave", "微波感应"],
  ["Dimmable", "可调光"],
  ["Rectangular", "长方形"],
  ["Round", "圆形"],
  ["Square", "方形"],
  ["Oval", "椭圆形"],
  ["White", "白光"],
  ["Black / white / silver", "黑 / 白 / 银"],
  ["Ceiling", "吸顶灯"],
  ["Downlight", "筒灯"],
  ["Floodlight", "投光灯"],
  ["Street light", "路灯"],
  ["Bulb", "灯泡"],
  ["General", "通用款"],
  ["Sensor", "感应"],
  ["Remote", "遥控"],
  ["Spot", "射灯"],
  ["Daylight", "日光感应"],
];

export function localizeSpec(locale: Locale, value: string) {
  if (locale === "en") return value;
  return labels.reduce((text, [en, zh]) => text.replaceAll(en, zh), value);
}
