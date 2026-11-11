import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, pageNames } from "@/content/site";
import {
  Home,
  Intro,
  Products,
  Manufacturing,
  OEM,
  About,
  Contact,
  Privacy,
  CTA,
} from "@/components/SiteContent";
type Props = {
  params: Promise<{ locale: string; page?: string[] }>;
  searchParams: Promise<{ product?: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, page = [] } = await params;
  const slug = page.join("/");
  if (!isLocale(locale) || !(slug in pageNames)) return {};
  const title = pageNames[slug][locale === "en" ? 0 : 1] + " | Scylla Lighting";
  const path = slug ? "/" + slug : "";
  return {
    title,
    description:
      locale === "en"
        ? "Selected LED lighting, manufacturing support and OEM/ODM solutions for importers, distributors and brands."
        : "锡拉照明为进口商、分销商与品牌客户提供精选 LED 灯具、制造配套与 OEM/ODM 服务。",
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
        { url: "/images/manufacturing-campus.webp", width: 2200, height: 1352 },
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
  if (!isLocale(locale) || !(slug in pageNames)) notFound();
  if (slug === "") return <Home locale={locale} />;
  if (slug === "about") return <About locale={locale} />;
  if (slug === "contact")
    return <Contact locale={locale} product={(await searchParams).product} />;
  if (slug === "privacy") return <Privacy locale={locale} />;
  return (
    <>
      <Intro locale={locale} page={slug} />
      {slug === "products" ? (
        <Products locale={locale} full />
      ) : slug === "manufacturing" ? (
        <Manufacturing locale={locale} full />
      ) : (
        <OEM locale={locale} full />
      )}
      <CTA locale={locale} />
    </>
  );
}
