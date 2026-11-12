import type { MetadataRoute } from "next";
import { locales, pageNames, categories } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL;
  if (!base) return [];
  return locales.flatMap((locale) =>
    [...Object.keys(pageNames), ...categories.map((c) => "products/" + c.slug)].map((p) => ({
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
