import type { MetadataRoute } from "next";
import { siteOrigin } from "@/content/origin";
export default function robots(): MetadataRoute.Robots {
  return process.env.SITE_URL
    ? {
        rules: { userAgent: "*", allow: "/", disallow: "/api/" },
        sitemap: siteOrigin + "/sitemap.xml",
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
