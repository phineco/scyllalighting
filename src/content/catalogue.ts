import { categories, Locale, ProductCategory } from "./site";

const catalogueOrder = [
  "panel", "ceiling", "downlight", "batten", "tube", "strip", "bulb",
  "filament", "smart", "flood", "tri-proof", "highbay", "street", "moisture", "solar",
];
export const catalogueCategories = [...categories].sort(
  (a, b) => catalogueOrder.indexOf(a.id) - catalogueOrder.indexOf(b.id),
);
export const categoryPath = (locale: Locale, category: ProductCategory) =>
  "/" + locale + "/products/" + category.slug;
export const categoryForPath = (path: string) =>
  categories.find((c) => path === "products/" + c.slug);

export const productSeries = categories.map((c) => ({
  id: c.id + "-selected",
  categoryId: c.id,
  titleEn: c.id === "flood" ? "General-purpose floodlights" : c.en,
  titleZh: c.id === "flood" ? "通用投光灯系列" : c.zh,
  descEn: c.descEn,
  descZh: c.descZh,
  spec: c.spec,
  image: "/images/catalogue/" + c.id + ".webp",
}));
productSeries.push({
  id: "flood-sensor", categoryId: "flood",
  titleEn: "PIR sensor floodlights", titleZh: "PIR 感应投光灯系列",
  descEn: "Floodlights with an adjustable PIR motion sensor for entrances and outdoor service areas. Confirm the sensor settings and installation conditions for your project.",
  descZh: "配可调 PIR 人体感应器的投光灯，可用于入口和户外配套空间，按项目确认感应设置与安装条件。",
  spec: "10 / 20 / 30 / 50 W · 3000 / 4000 / 6500 K",
  image: "/images/catalogue/flood-sensor.webp",
});
export const seriesFor = (category: ProductCategory) =>
  productSeries.filter((series) => series.categoryId === category.id);
