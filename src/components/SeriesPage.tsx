import Image from "next/image";
import Link from "next/link";
import { categories, Locale, t } from "@/content/site";
import { pilotGuides, pilotSeries } from "@/content/product-seo";
import { localizeSpec } from "@/content/specification";
import { BreadcrumbData } from "./BreadcrumbData";
import styles from "./ProductCatalog.module.css";

export function SeriesPage({ locale, item }: { locale: Locale; item: typeof pilotSeries[number] }) {
  const tr = (en: string, zh: string) => t(locale, en, zh);
  const category = categories.find(c => c.id === item.categoryId)!;
  const guide = pilotGuides[item.id as keyof typeof pilotGuides];
  const title = guide.title[locale === "en" ? 0 : 1];
  const path = "/" + locale + "/products";
  return <section className={"wrap " + styles.hero}>
    <BreadcrumbData items={[
      { name: tr("Home", "首页"), path: "/" + locale },
      { name: tr("Products", "产品"), path },
      { name: tr(category.en, category.zh), path: path + "/" + category.slug },
      { name: title, path: path + "/series/" + item.id },
    ]} />
    <nav className="breadcrumbs" aria-label={tr("Breadcrumb", "面包屑")}>
      <Link href={"/" + locale}>{tr("Home", "首页")}</Link><span>/</span>
      <Link href={path}>{tr("Products", "产品")}</Link><span>/</span>
      <Link href={path + "/" + category.slug}>{tr(category.en, category.zh)}</Link><span>/</span>
      <span aria-current="page">{title}</span>
    </nav>
    <div className={styles.heroGrid}>
      <div>
        <p className="eyebrow">SCYLLA LIGHTING</p>
        <h1>{title}</h1>
        <p className={styles.heroDescription}>{tr(item.descEn, item.descZh)}</p>
        <h2>{tr("Reference specifications", "参考规格")}</h2>
        <p>{localizeSpec(locale, item.spec)}</p>
        <ul>{(locale === "en" ? item.variantsEn : item.variantsZh).map(v => <li key={v}>{v}</li>)}</ul>
        <Link className="button" href={"/" + locale + "/contact?product=" + category.id + "&context=series-" + item.id}>{tr("Request specifications & quote", "咨询规格与报价")}</Link>
      </div>
      <div className={styles.heroVisual}>
        <Image src={item.image} alt={tr(item.titleEn, item.titleZh)} width={item.imageWidth} height={item.imageHeight} unoptimized={item.originalImage} priority sizes="(max-width: 900px) 100vw, 40vw" />
        <span>{tr("Product series example", "产品系列示例")}</span>
      </div>
    </div>
    <div className={styles.brief}>
      <h2>{tr("Before requesting a quote", "询价前确认")}</h2>
      <ul>{guide.checks.map(([en, zh]) => <li key={en}>{tr(en, zh)}</li>)}</ul>
      <p>{tr("Final configuration, MOQ, price, delivery and destination-market documents are confirmed in the written quotation.", "具体配置、起订量、价格、交期及目标市场文件随书面报价确认。")}</p>
    </div>
  </section>;
}
