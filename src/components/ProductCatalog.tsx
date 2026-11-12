import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Locale, ProductCategory, t } from "@/content/site";
import { catalogueCategories, categoryImageFor, categoryPath, productSeries, scenesFor, seriesFor } from "@/content/catalogue";
import { localizeSpec } from "@/content/specification";
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
        const [range, ...specs] = localizeSpec(locale, category.spec).split(" · ");
        const count = seriesFor(category).length;
        const original = categoryImageFor(category);
        return (
          <article className={styles.card} id={"detail-" + category.id} key={category.id}>
            <Link href={categoryPath(locale, category)} className={styles.cardLink}
              aria-label={locale === "en" ? category.en : category.zh}>
              <div className={styles.cardVisual}>
                <div className={styles.cardBadges}>
                  <span>{String(index + 1).padStart(2, "0")} / {category.id.toUpperCase()}</span>
                  <span className={styles.rangeBadge}>{range}</span>
                </div>
                <Image src={original?.src || "/images/catalogue/" + category.id + ".webp"}
                  alt={locale === "en" ? category.en : category.zh}
                  width={original?.width || 800} height={original?.height || 600} unoptimized={!!original}
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
                  <span>{tr(count + " product series", count + " 个产品系列")}</span>
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
            <span>{catalogueCategories.length} {tr("categories", "个分类")} / {productSeries.length} {tr("series", "个系列")}</span>
            <p>{tr("Choose a category to explore product images, power and size options, and application references for your next project.", "选择产品分类，查看产品图片、功率尺寸选项与场景参考，为下一个项目找到合适的灯具。")}</p>
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
  const scenes = scenesFor(category);
  const heroScene = series[0].originalImage ? undefined : scenes[0];
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
              {localizeSpec(locale, category.spec).split(" · ").map((spec) => <span key={spec}>{spec}</span>)}
            </div>
            <div className={styles.heroActions}>
              <a className="button" href="#series">{tr("Explore all series", "查看全部系列")} <ArrowRight size={17} /></a>
              <Link className="text-link" href={"/" + locale + "/contact?product=" + category.id}>
                {tr("Discuss your requirements", "洽谈需求")} <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual + (heroScene ? " " + styles.sceneHero : "")}>
            <Image src={heroScene?.image || series[0].image}
              alt={heroScene ? tr(heroScene.titleEn, heroScene.titleZh) : name}
              width={heroScene ? 800 : series[0].imageWidth} height={heroScene ? 600 : series[0].imageHeight}
              unoptimized={!heroScene && series[0].originalImage} priority sizes="(max-width: 900px) 100vw, 40vw" />
            <span>{heroScene ? tr("APPLICATION REFERENCE", "场景参考") + " / " : ""}{locale === "en" ? category.useEn : category.useZh}</span>
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
            <div><p className="eyebrow">{tr("THE COLLECTION", "系列展示")}</p>
              <h2 id="series-title">{tr("Find your starting point.", "找到适合您的产品系列。")}</h2>
            </div>
            <span>{tr(series.length + " product series", series.length + " 个产品系列")}</span>
          </div>
          <p className={styles.listIntro}>{tr(
            "Browse every series in this category. Power, size and control variants are grouped together; expand a card for more options and product views.",
            "本分类的产品系列全部列于下方。同系列的功率、尺寸与控制选项集中展示，展开卡片可查看配置和补充图片。",
          )}</p>
          {series.length > 3 && <details className={styles.seriesIndex}>
            <summary>{tr("Jump to a series", "快速跳转到产品系列")} <span>{series.length}</span></summary>
            <nav aria-label={tr("Series index", "系列索引")}>
              {series.map((item, index) => <a key={item.id} href={"#" + item.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>{tr(item.titleEn, item.titleZh)}
              </a>)}
            </nav>
          </details>}
          <div className={styles.seriesList}>
            {series.map((item, index) => (
              <article className={styles.seriesCard} id={item.id} key={item.id}>
                <div className={styles.seriesVisual}>
                  <span>{String(index + 1).padStart(2, "0")} / {item.applicationImage ? tr("APPLICATION REFERENCE", "场景参考") : tr("PRODUCT SERIES", "产品系列")}</span>
                  <a href={item.image} target="_blank" rel="noopener noreferrer"
                    aria-label={tr("Enlarge image: " + item.titleEn, "查看大图：" + item.titleZh)}>
                    <Image src={item.image} alt={tr(item.titleEn, item.titleZh)}
                      width={item.imageWidth} height={item.imageHeight} unoptimized={item.originalImage}
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 45vw, 30vw" />
                    <span className={styles.enlarge}><ArrowUpRight size={15} />{tr("View image", "查看大图")}</span>
                  </a>
                </div>
                <div className={styles.seriesBody}>
                  <h3>{locale === "en" ? item.titleEn : item.titleZh}</h3>
                  <p>{locale === "en" ? item.descEn : item.descZh}</p>
                  <dl><dt>{tr("Reference specifications", "参考规格")}</dt><dd>{localizeSpec(locale, item.spec)}</dd></dl>
                  <details className={styles.options}>
                    <summary>{tr("Sizes & configuration options", "尺寸与配置选项")}</summary>
                    <ul>{(locale === "en" ? item.variantsEn : item.variantsZh).map((variant) => <li key={variant}>{variant}</li>)}</ul>
                  </details>
                  {item.gallery.length > 0 && <details className={styles.gallery}>
                    <summary>{tr("More product views", "更多产品图片")} <span>{item.gallery.length}</span></summary>
                    <div>{item.gallery.map((view) => <figure key={view.src}>
                      <a href={view.src} target="_blank" rel="noopener noreferrer" aria-label={tr("Enlarge: " + view.altEn, "查看大图：" + view.altZh)}>
                        <Image src={view.src} alt={tr(view.altEn, view.altZh)} width={view.width} height={view.height}
                          unoptimized={view.originalImage} sizes="(max-width: 600px) 45vw, 20vw" />
                      </a>
                      <figcaption>{tr(view.altEn, view.altZh)}</figcaption>
                    </figure>)}</div>
                  </details>}
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
          {scenes.length > 0 && <section className={styles.scenes} aria-labelledby="scene-title">
            <p className="eyebrow">{tr("LIGHT IN CONTEXT", "让产品走进空间")}</p>
            <h2 id="scene-title">{tr("Application references", "场景参考")}</h2>
            <p>{tr("Explore possible lighting settings. These images illustrate applications and are not presented as Scylla-delivered projects.", "了解灯具的应用方向。以下图片用于场景说明，不代表锡拉照明已交付的项目。")}</p>
            <div>{scenes.map((scene) => <figure key={scene.id}>
              <a href={scene.image} target="_blank" rel="noopener noreferrer" aria-label={tr("Enlarge: " + scene.titleEn, "查看大图：" + scene.titleZh)}>
                <Image src={scene.image} alt={tr(scene.titleEn, scene.titleZh)} width={800} height={600} sizes="(max-width: 600px) 100vw, 30vw" />
              </a>
              <figcaption>{tr(scene.titleEn, scene.titleZh)}</figcaption>
            </figure>)}</div>
          </section>}
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
