import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  isLocale,
  pageNames,
  pageDescriptions,
  categories,
} from "@/content/site";
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
  if (!isLocale(locale) || (!category && !Object.hasOwn(pageNames, slug))) return {};
  const title = (category ? (locale === "en" ? category.en : category.zh) : pageNames[slug][locale === "en" ? 0 : 1]) + " | Scylla Lighting";
  const path = slug ? "/" + slug : "";
  return {
    title,
    description: category ? (locale === "en" ? category.descEn : category.descZh) : pageDescriptions[slug]?.[locale === "en" ? 0 : 1],
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
      locale: locale === "en" ? "en_US" : "zh_CN",
      images: [
        category
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
  if (!isLocale(locale) || (!category && !Object.hasOwn(pageNames, slug))) notFound();
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
