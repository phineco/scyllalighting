import { productSeries } from "./catalogue";

export { categorySeo } from "./site";
export const pilotGuides = {
  "bulb-24v": {
    title: ["24V DC E27 LED Bulb", "24V 直流 E27 LED 灯泡"],
    checks: [
      ["Confirm a 24V DC supply and an E27 lampholder before selecting this series.", "选用前确认供电为 24V 直流，灯座为 E27。"],
      ["Send the application, quantity, target market and required packaging. Confirm the final model, dimensions and applicable documents with the quotation.", "请提供应用、数量、目标市场和包装要求，随报价确认具体型号、尺寸及适用文件。"],
    ],
  },
  "flood-sensor": {
    title: ["PIR Sensor LED Floodlights", "PIR 人体感应 LED 投光灯"],
    checks: [
      ["Send a site photo or sketch with the mounting height and area to illuminate.", "请提供现场照片或草图，注明安装高度和照明范围。"],
      ["Confirm input voltage, desired colour temperature, sensor settings and mounting position for the selected configuration.", "按所选配置确认输入电压、色温、感应设置和安装位置。"],
    ],
  },
};
export const pilotSeries = productSeries.filter(p => Object.hasOwn(pilotGuides, p.id));
export const pilotForPath = (path: string) => pilotSeries.find(p => path === "products/series/" + p.id);
