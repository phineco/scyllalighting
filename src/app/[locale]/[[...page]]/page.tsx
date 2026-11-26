import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  isLocale,
  pageNames,
  pageDescriptions,
  categories,
} from "@/content/site";
import { SeriesPage } from "@/components/SeriesPage";
import { categorySeo, pilotForPath, pilotGuides } from "@/content/product-seo";
import { Home, Privacy } from "@/components/SiteContent";
import { CategoryPage } from "@/components/ProductCatalog";
import { categoryForPath } from "@/content/catalogue";
import {
  ProductsPage,
  ApplicationsPage,
  ManufacturingPage,
  OEMPage,
  AboutPage,
  ResourcesPage,
  ContactPage,
} from "@/components/InteriorPages";
type Props = {
  params: Promise<{ locale: string; page?: string[] }>;
  searchParams: Promise<{
    product?: string | string[];
    context?: string | string[];
  }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, page = [] } = await params;
  const slug = page.join("/");
  const category = categoryForPath(slug);
  const series = pilotForPath(slug);
  if (!isLocale(locale) || (!series && !category && !Object.hasOwn(pageNames, slug))) return {};
  const language = locale === "en" ? 0 : 1;
  const seo = categorySeo[category?.id as keyof typeof categorySeo];
  const title = (series ? pilotGuides[series.id as keyof typeof pilotGuides].title[language]
    : category ? (seo?.title[language] || (locale === "en" ? category.en : category.zh))
    : pageNames[slug][language]) + " | Scylla Lighting";
  const description = series ? (locale === "en" ? series.descEn : series.descZh)
    : category ? (seo?.description[language] || (locale === "en" ? category.descEn : category.descZh))
    : pageDescriptions[slug]?.[language];
  const path = slug ? "/" + slug : "";
  return {
    title,
    description,
    alternates: {
      canonical: "/" + locale + path,
      languages: {
        en: "/en" + path,
        "zh-CN": "/zh-CN" + path,
        "x-default": "/en" + path,
      },
    },
    openGraph: {
      title,
      siteName: "Scylla Lighting",
      description,
      url: "/" + locale + path,
      locale: locale === "en" ? "en_US" : "zh_CN",
      images: [
        series ? { url: series.image, width: series.imageWidth, height: series.imageHeight } : category
          ? { url: "/images/catalogue/" + category.id + ".webp", width: 800, height: 600 }
          : { url: "/images/manufacturing-campus.webp", width: 2200, height: 1352 },
      ],
    },
    robots: process.env.SITE_URL
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
export default async function Page({ params, searchParams }: Props) {
  const { locale, page = [] } = await params;
  const slug = page.join("/");
  const category = categoryForPath(slug);
  const series = pilotForPath(slug);
  if (!isLocale(locale) || (!series && !category && !Object.hasOwn(pageNames, slug))) notFound();
  if (series) return <SeriesPage locale={locale} item={series} />;
  if (category) return <CategoryPage locale={locale} category={category} />;
  if (slug === "") return <Home locale={locale} />;
  if (slug === "about") return <AboutPage locale={locale} />;
  if (slug === "applications") return <ApplicationsPage locale={locale} />;
  if (slug === "resources") return <ResourcesPage locale={locale} />;
  if (slug === "contact") {
    const query = await searchParams;
    const product =
      typeof query.product === "string" &&
      (query.product === "custom" ||
        categories.some((c) => c.id === query.product))
        ? query.product
        : "";
    const context = typeof query.context === "string" ? query.context : "";
    return <ContactPage locale={locale} product={product} context={context} />;
  }
  if (slug === "privacy") return <Privacy locale={locale} />;
  if (slug === "products") return <ProductsPage locale={locale} />;
  if (slug === "manufacturing") return <ManufacturingPage locale={locale} />;
  return <OEMPage locale={locale} />;
}
