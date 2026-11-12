import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Locale, ProductCategory, t } from "@/content/site";
import { catalogueCategories, categoryPath, seriesFor } from "@/content/catalogue";
import styles from "./ProductCatalog.module.css";

export function CategoryGrid({
  locale,
  items,
  compact = false,
}: {
  locale: Locale;
  items: ProductCategory[];
  compact?: boolean;
}) {
  const tr = (en: string, zh: string) => t(locale, en, zh);
  return (
    <div className={styles.grid + (compact ? " " + styles.compact : "")}>
      {items.map((category, index) => {
        const [range, ...specs] = category.spec.split(" · ");
        const count = seriesFor(category).length;
        return (
          <article className={styles.card} id={"detail-" + category.id} key={category.id}>
            <Link href={categoryPath(locale, category)} className={styles.cardLink}
              aria-label={locale === "en" ? category.en : category.zh}>
              <div className={styles.cardVisual}>
                <div className={styles.cardBadges}>
                  <span>{String(index + 1).padStart(2, "0")} / {category.id.toUpperCase()}</span>
                  <span className={styles.rangeBadge}>{range}</span>
                </div>
                <Image src={"/images/catalogue/" + category.id + ".webp"}
                  alt={locale === "en" ? category.en : category.zh}
                  width={800} height={600}
                  sizes={compact ? "(max-width: 600px) 100vw, (max-width: 950px) 50vw, 25vw" : "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"} />
              </div>
              <div className={styles.cardBody}>
                <h3>{locale === "en" ? category.en : category.zh}</h3>
                <p>{locale === "en" ? category.useEn : category.useZh}</p>
                <div className={styles.tags}>
                  {specs.map((spec) => <span key={spec}>{spec}</span>)}
                  <span>OEM / ODM</span>
                </div>
                <div className={styles.cardFooter}>
                  <span>{tr(count + " selected series", count + " 个精选系列")}</span>
                  <strong>{tr("View series", "查看系列")} <ArrowRight size={16} /></strong>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export function ProductOverview({ locale }: { locale: Locale }) {
  const tr = (en: string, zh: string) => t(locale, en, zh);
  return (
    <>
      <section className={"wrap " + styles.overview}>
        <nav className="breadcrumbs" aria-label={tr("Breadcrumb", "面包屑")}>
          <Link href={"/" + locale}>{tr("Home", "首页")}</Link><span>/</span>
          <span aria-current="page">{tr("Products", "产品分类")}</span>
        </nav>
        <p className="eyebrow">{tr("THE SCYLLA COLLECTION", "锡拉照明产品系列")}</p>
        <div className={styles.overviewHeading}>
          <h1>{tr("A considered range. A clearer choice.", "精选产品，让选择更清晰。")}</h1>
          <div>
            <span>{catalogueCategories.length} {tr("product categories", "个产品分类")}</span>
            <p>{tr("Choose a category to explore selected series, specifications and options for your next project.", "选择产品分类，查看精选系列、参考规格与可洽谈配置，为下一个项目找到合适的灯具。")}</p>
          </div>
        </div>
      </section>
      <section className={"wrap " + styles.overviewGrid} id="collections" aria-label={tr("Product categories", "产品分类")}>
        <CategoryGrid locale={locale} items={catalogueCategories} />
      </section>
    </>
  );
}

export function CategoryPage({ locale, category }: { locale: Locale; category: ProductCategory }) {
  const tr = (en: string, zh: string) => t(locale, en, zh);
  const name = locale === "en" ? category.en : category.zh;
  const series = seriesFor(category);
  return (
    <>
      <section className={"wrap " + styles.hero}>
        <nav className="breadcrumbs" aria-label={tr("Breadcrumb", "面包屑")}>
          <Link href={"/" + locale}>{tr("Home", "首页")}</Link><span>/</span>
          <Link href={"/" + locale + "/products"}>{tr("Products", "产品分类")}</Link><span>/</span>
          <span aria-current="page">{name}</span>
        </nav>
        <div className={styles.heroGrid}>
          <div>
            <p className="eyebrow">SCYLLA LIGHTING / {tr("PRODUCT SERIES", "产品系列")}</p>
            <h1>{name}</h1>
            <p className={styles.heroDescription}>{locale === "en" ? category.descEn : category.descZh}</p>
            <div className={styles.heroSpecs}>
              {category.spec.split(" · ").map((spec) => <span key={spec}>{spec}</span>)}
            </div>
            <div className={styles.heroActions}>
              <a className="button" href="#series">{tr("Explore selected series", "查看精选系列")} <ArrowRight size={17} /></a>
              <Link className="text-link" href={"/" + locale + "/contact?product=" + category.id}>
                {tr("Discuss your requirements", "洽谈需求")} <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <Image src={"/images/catalogue/" + category.id + ".webp"} alt={name}
              width={800} height={600} priority sizes="(max-width: 900px) 100vw, 40vw" />
            <span>{locale === "en" ? category.useEn : category.useZh}</span>
          </div>
        </div>
      </section>
      <div className={"wrap " + styles.catalogueLayout} id="series">
        <aside className={styles.sidebar}>
          <p className="eyebrow">{tr("PRODUCT CATEGORIES", "产品分类")}</p>
          <nav aria-label={tr("Product categories", "产品分类")}>
            {catalogueCategories.map((item) => (
              <Link href={categoryPath(locale, item)} key={item.id}
                aria-current={item.id === category.id ? "page" : undefined}>
                {locale === "en" ? item.en : item.zh}<ArrowRight size={14} />
              </Link>
            ))}
          </nav>
          <Link className={styles.backLink} href={"/" + locale + "/products"}>
            {tr("View all products", "查看全部分类")} <ArrowUpRight size={16} />
          </Link>
        </aside>
        <section className={styles.seriesSection} aria-labelledby="series-title">
          <div className={styles.listHeading}>
            <div><p className="eyebrow">{tr("THE SELECTION", "精选展示")}</p>
              <h2 id="series-title">{tr("Find your starting point.", "找到适合您的产品系列。")}</h2>
            </div>
            <span>{tr(series.length + " selected series", series.length + " 个精选系列")}</span>
          </div>
          <p className={styles.listIntro}>{tr(
            "Representative ranges for your next project. Share the required configuration to request a model-specific quotation.",
            "为您的下一个项目提供代表性产品系列，请明确所需配置，以便获取具体型号报价。",
          )}</p>
          <div className={styles.seriesList}>
            {series.map((item, index) => (
              <article className={styles.seriesCard} key={item.id}>
                <div className={styles.seriesVisual}>
                  <span>{String(index + 1).padStart(2, "0")} / {tr("SELECTED SERIES", "精选系列")}</span>
                  <Image src={item.image} alt={locale === "en" ? item.titleEn : item.titleZh}
                    width={800} height={600} sizes="(max-width: 900px) 100vw, 30vw" />
                </div>
                <div className={styles.seriesBody}>
                  <h3>{locale === "en" ? item.titleEn : item.titleZh}</h3>
                  <p>{locale === "en" ? item.descEn : item.descZh}</p>
                  <dl><dt>{tr("Selected specifications", "参考规格")}</dt><dd>{item.spec}</dd></dl>
                  <Link className="text-link" href={"/" + locale + "/contact?product=" + category.id + "&context=series-" + item.id}>
                    {tr("Request specifications & quote", "咨询规格与报价")} <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.disclosure}>{tr(
            "Images represent selected product families. Specifications and options vary by model; availability and destination-market documents are confirmed with the quotation.",
            "图片展示代表产品系列。规格与选项因型号而异，供货情况及目标市场资料随具体报价确认。",
          )}</p>
          <div className={styles.brief}>
            <div><p className="eyebrow">{tr("MAKE THE BRIEF CLEAR", "让需求更清楚")}</p>
              <h2>{tr("Tell us what matters on site.", "从实际使用需求出发。")}</h2></div>
            <ul>{[
              ["Application & mounting conditions", "应用场景与安装条件"],
              ["Power, colour temperature & controls", "功率、色温与控制要求"],
              ["Quantity, destination & branding", "采购数量、目的地与品牌需求"],
            ].map(([en, zh]) => <li key={en}><Check size={16} />{tr(en, zh)}</li>)}</ul>
            <Link className="button" href={"/" + locale + "/contact?product=" + category.id}>
              {tr("Start an enquiry", "提交需求")} <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
