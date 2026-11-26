import type { MetadataRoute } from "next";
import { siteOrigin } from "@/content/origin";
import { locales, pageNames, categories } from "@/content/site";
import { pilotSeries } from "@/content/product-seo";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteOrigin;
  if (!base) return [];
  return locales.flatMap((locale) =>
    [...Object.keys(pageNames), ...categories.map((c) => "products/" + c.slug), ...pilotSeries.map(s => "products/series/" + s.id)].map((p) => ({
      url: base + "/" + locale + (p ? "/" + p : ""),
      alternates: {
        languages: {
          en: base + "/en" + (p ? "/" + p : ""),
          "zh-CN": base + "/zh-CN" + (p ? "/" + p : ""),
        },
      },
    })),
  );
}
