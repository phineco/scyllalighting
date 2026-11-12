import { categories, Locale, ProductCategory } from "./site";
import catalogueData from "./catalogue-products.json";

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

export const productSeries = catalogueData.products;
export const seriesFor = (category: ProductCategory) =>
  productSeries.filter((series) => series.categoryId === category.id);
export const scenesFor = (category: ProductCategory) =>
  catalogueData.scenes.filter((scene) => scene.categoryId === category.id);
