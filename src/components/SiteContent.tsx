import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  MoveDown,
  Cpu,
  Layers3,
  PackageCheck,
  SlidersHorizontal,
  Check,
} from "lucide-react";
import { categories, Locale, t, pageNames } from "@/content/site";
import InquiryForm from "./InquiryForm";
import ContactChannels from "./ContactChannels";
import { briefFor } from "@/content/journey";
export function Intro({ locale, page }: { locale: Locale; page: string }) {
  return (
    <section className="wrap page-intro">
      <nav
        className="breadcrumbs"
        aria-label={t(locale, "Breadcrumb", "面包屑")}
      >
        <Link href={"/" + locale}>{t(locale, "Home", "首页")}</Link>
        <span>/</span>
        <span aria-current="page">
          {t(
            locale,
            page === "privacy" ? "Privacy" : "Contact",
            page === "privacy" ? "隐私说明" : "联系",
          )}
        </span>
      </nav>
      <p className="eyebrow">SCYLLA LIGHTING / {page.toUpperCase()}</p>
      <h1>{pageNames[page]?.[locale === "en" ? 0 : 1]}</h1>
      <p className="intro-copy">
        {t(
          locale,
          "LED lighting, manufacturing support and thoughtful customisation for your market.",
          "为您的目标市场提供 LED 照明产品、制造配套与定制服务。",
        )}
      </p>
    </section>
  );
}
export function Products({
  locale,
  full = false,
}: {
  locale: Locale;
  full?: boolean;
}) {
  const tr = (en: string, zh: string) => t(locale, en, zh);
  return (
    <section className="section wrap" id="collections">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {tr("01 / THE COLLECTION", "01 / 精选产品")}
          </p>
          <h2>{tr("Lighting for everyday spaces.", "照亮每一种日常空间。")}</h2>
        </div>
        <p>
          {tr(
            "A focused selection for commercial, residential and industrial projects.",
            "聚焦商业、住宅与工业应用的精选照明系列。",
          )}
        </p>
      </div>
      <div className="product-grid">
        {categories.map((c, i) => (
          <article id={c.id} className="product-card" key={c.id}>
            <Link
              className="product-image"
              href={
                full
                  ? "#detail-" + c.id
                  : "/" + locale + "/products#detail-" + c.id
              }
              aria-label={locale === "en" ? c.en : c.zh}
            >
              <span className="product-number">0{i + 1}</span>
              <Image
                src={"/images/" + c.id + ".webp"}
                alt={locale === "en" ? c.en : c.zh}
                width={800}
                height={600}
              />
              <span className="product-arrow">
                <ArrowUpRight size={20} />
              </span>
            </Link>
            <div className="product-caption">
              <h3>{locale === "en" ? c.en : c.zh}</h3>
              <p>{locale === "en" ? c.useEn : c.useZh}</p>
            </div>
          </article>
        ))}
      </div>
      {!full && (
        <div className="section-end">
          <span>
            {tr(
              "The right starting point for your next range.",
              "从精选系列出发，构建您的产品组合。",
            )}
          </span>
          <Link className="text-link" href={"/" + locale + "/products"}>
            {tr("Explore the collection", "了解全部精选系列")}
            <ArrowRight size={17} />
          </Link>
        </div>
      )}
      {full && (
        <div className="product-details">
          {categories.map((c) => (
            <article
              className="product-detail"
              id={"detail-" + c.id}
              key={c.id}
            >
              <div className="detail-image">
                <Image
                  src={"/images/" + c.id + ".webp"}
                  alt={locale === "en" ? c.en : c.zh}
                  width={800}
                  height={600}
                />
              </div>
              <div>
                <p className="eyebrow">SCYLLA / {c.id.toUpperCase()}</p>
                <h2>{locale === "en" ? c.en : c.zh}</h2>
                <p>{locale === "en" ? c.descEn : c.descZh}</p>
                <dl>
                  <dt>{tr("Selected range", "精选规格")}</dt>
                  <dd>{c.spec}</dd>
                  <dt>{tr("Customisation brief", "定制需求")}</dt>
                  <dd>
                    {tr(
                      "Discuss power, colour temperature, controls, branding and packaging. Options depend on the selected model.",
                      "可洽谈功率、色温、控制、品牌与包装；具体选项按型号确认。",
                    )}
                  </dd>
                </dl>
                <p className="fine-print">
                  {tr(
                    "Images represent a product family. Specifications vary by model. Configuration and market documentation are confirmed with your quotation.",
                    "图片为产品系列示意。规格因型号而异，最终配置和目标市场资料以确认报价为准。",
                  )}
                </p>
                <Link
                  className="button"
                  href={"/" + locale + "/contact?product=" + c.id}
                >
                  {tr("Enquire about this series", "咨询此系列")}
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
export function Manufacturing({
  locale,
  full = false,
}: {
  locale: Locale;
  full?: boolean;
}) {
  const tr = (en: string, zh: string) => t(locale, en, zh);
  const caps = [
    {
      Icon: Cpu,
      title: tr("Precision production", "精密生产配套"),
      desc: tr(
        "SMT placement and optical inspection equipment support the electronics behind the luminaire.",
        "SMT 贴装与光学检测设备，为灯具电子组件提供制造支持。",
      ),
    },
    {
      Icon: Layers3,
      title: tr("Assembly coordination", "装配协同"),
      desc: tr(
        "Automated processes and assembly support, matched to the selected product family.",
        "依据产品系列，协调自动化工序与装配配套。",
      ),
    },
    {
      Icon: PackageCheck,
      title: tr("Brand-ready packaging", "品牌包装配套"),
      desc: tr(
        "Discuss labelling, artwork and shipment requirements before production.",
        "生产前确认标签、包装设计与出运要求。",
      ),
    },
  ];
  return (
    <section className="manufacturing section">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {tr("02 / MANUFACTURING & QUALITY", "02 / 制造与质量")}
            </p>
            <h2>
              {tr("Good light starts long", "好光，源于")}
              <br />
              {tr("before the switch.", "每一道制造细节。")}
            </h2>
          </div>
          <div>
            <p>
              {tr(
                "From component placement to finished products, we coordinate the production capabilities your lighting programme needs.",
                "从元器件贴装到成品交付，我们为您的照明业务协调所需的生产制造配套。",
              )}
            </p>
            <Link
              className="text-link"
              href={"/" + locale + (full ? "/contact" : "/manufacturing")}
            >
              {tr(
                full
                  ? "Discuss production requirements"
                  : "Inside our production support",
                full ? "洽谈生产需求" : "了解生产配套",
              )}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="production-image">
          <Image
            src="/images/precision-production.webp"
            alt={tr(
              "SMT production and optical inspection equipment",
              "SMT 生产与光学检测设备",
            )}
            width={2000}
            height={693}
          />
          <span>
            {tr(
              "PRODUCTION DETAIL / COMPONENTS & INSPECTION",
              "生产实景 / 元器件与检测设备",
            )}
          </span>
        </div>
        <div className="capabilities">
          {caps.map(({ Icon, title, desc }) => (
            <article key={title}>
              <Icon size={25} />
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
        {full && (
          <div className="quality-note">
            <h3>
              {tr(
                "Quality begins with an agreed specification.",
                "质量，从明确规格开始。",
              )}
            </h3>
            <p>
              {tr(
                "Share your application, electrical requirements and destination market. We will align the sample, inspection criteria and required documents with the agreed model. Certification and test documentation are reviewed per product and market.",
                "告诉我们应用场景、电气要求与目标市场。我们将围绕确认型号，沟通样品、检验标准与所需资料；认证与测试文件按具体产品及目标市场核实。",
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
export function OEM({
  locale,
  full = false,
}: {
  locale: Locale;
  full?: boolean;
}) {
  const tr = (en: string, zh: string) => t(locale, en, zh);
  const steps = [
    [
      tr("Define the brief", "明确需求"),
      tr(
        "Your market, application, target specification and brand direction.",
        "确认市场、场景、目标规格与品牌方向。",
      ),
    ],
    [
      tr("Refine & sample", "方案与样品"),
      tr(
        "Align the configuration, packaging and sample approval process.",
        "沟通配置、包装和样品确认流程。",
      ),
    ],
    [
      tr("Coordinate production", "协同生产"),
      tr(
        "Confirm order details, inspection points and production requirements.",
        "确认订单细节、检验节点与生产要求。",
      ),
    ],
    [
      tr("Prepare for delivery", "准备交付"),
      tr(
        "Bring together labelling, packing and shipment documentation.",
        "协调标签、包装与出运资料。",
      ),
    ],
  ];
  return (
    <section className="section wrap oem">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {tr("03 / MADE FOR YOUR BRAND", "03 / 为您的品牌而制造")}
          </p>
          <h2>
            {tr("Your idea.", "您的想法，")}
            <br />
            {tr("A clear path to production.", "通往制造的清晰路径。")}
          </h2>
        </div>
        <div>
          <p>
            {tr(
              "Private-label lighting or a tailored product brief. Our OEM/ODM support connects your requirements with the right manufacturing capabilities.",
              "从贴牌照明到定制产品需求，通过 OEM/ODM 服务，将您的构想与合适的制造能力连接起来。",
            )}
          </p>
          <Link
            className="text-link"
            href={"/" + locale + (full ? "/contact" : "/oem-odm")}
          >
            {tr(
              full ? "Start your brief" : "Explore OEM / ODM",
              full ? "提交定制需求" : "了解 OEM / ODM",
            )}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <div className="steps">
        {steps.map(([title, desc], i) => (
          <article key={title}>
            <span>0{i + 1}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
      {full && (
        <div className="custom-options">
          <SlidersHorizontal size={28} />
          <div>
            <h3>
              {tr("Customisation, with a purpose.", "围绕实际需求，进行定制。")}
            </h3>
            <p>
              {tr(
                "Discuss colour temperature, power, control options, housing finish, logo application and retail packaging. Feasibility, MOQ, tooling and lead time are agreed after product review.",
                "可洽谈色温、功率、控制方式、外壳颜色、Logo 与零售包装。定制可行性、起订量、模具与交期，根据产品评审确认。",
              )}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
export function CTA({ locale }: { locale: Locale }) {
  const tr = (en: string, zh: string) => t(locale, en, zh);
  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <div>
          <p className="eyebrow">{tr("LET’S TALK LIGHTING", "一起聊聊照明")}</p>
          <h2>{tr("A brighter next chapter.", "让下一程，更明亮。")}</h2>
          <p>
            {tr(
              "Tell us what your market needs. We’ll work through the details together.",
              "告诉我们您的市场需要什么，一起把需求变为具体方案。",
            )}
          </p>
        </div>
        <Link className="button light" href={"/" + locale + "/contact"}>
          {tr("Discuss your project", "洽谈您的项目")}
          <ArrowUpRight size={19} />
        </Link>
      </div>
    </section>
  );
}
export function Home({ locale }: { locale: Locale }) {
  const tr = (en: string, zh: string) => t(locale, en, zh);
  return (
    <>
      <section className="hero wrap">
        <div className="hero-top">
          <div>
            <p className="eyebrow">
              <span className="gold-line" />
              {tr(
                "LIGHTING. BUILT AROUND YOUR BUSINESS.",
                "照明，围绕您的业务而打造。",
              )}
            </p>
            <h1>
              {tr("Light for your market.", "为您的市场，")}
              <br />
              <em>{tr("Made for your brand.", "点亮您的品牌。")}</em>
            </h1>
          </div>
          <div className="hero-side">
            <p>
              {tr(
                "Considered LED lighting. Dependable manufacturing support. OEM & ODM solutions that begin with your needs.",
                "精选 LED 照明产品，可靠制造配套。从您的需求出发，提供 OEM 与 ODM 解决方案。",
              )}
            </p>
            <Link className="button" href={"/" + locale + "/products"}>
              {tr("Explore our lighting", "探索精选灯具")}
              <ArrowUpRight size={18} />
            </Link>
            <Link className="hero-secondary" href={"/" + locale + "/oem-odm"}>
              {tr("Create with Scylla", "与锡拉共创")}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="hero-photo">
          <Image
            src="/images/manufacturing-campus.webp"
            alt={tr(
              "Manufacturing campus supporting Scylla Lighting production",
              "为锡拉照明提供制造配套的生产园区",
            )}
            width={2200}
            height={1352}
            priority
            sizes="(max-width:700px) 100vw,92vw"
          />
          <div className="photo-caption">
            <span>{tr("FROM IDEAS TO LIGHT", "从构想到光")}</span>
            <span>
              {tr(
                "Manufacturing support. A world of possibilities.",
                "制造配套，承载更多可能。",
              )}
            </span>
            <a
              href="#collections"
              aria-label={tr("Explore collections", "查看产品系列")}
            >
              <MoveDown size={22} />
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <span>SCYLLA LIGHTING</span>
          <span>
            {tr("Commercial", "商业照明")}
            <i />
            {tr("Residential", "家居照明")}
            <i />
            {tr("Industrial", "工业照明")}
          </span>
          <span>OEM / ODM</span>
        </div>
      </section>
      <Products locale={locale} />
      <section
        className="wrap home-pathways"
        aria-label={tr("Explore further", "进一步了解")}
      >
        <Link href={"/" + locale + "/applications"}>
          <span>{tr("START WITH THE SPACE", "从空间开始")}</span>
          <h3>
            {tr("Find lighting by application", "按应用场景选择照明")}
            <ArrowUpRight size={18} />
          </h3>
        </Link>
        <Link href={"/" + locale + "/resources"}>
          <span>{tr("PREPARE YOUR NEXT ENQUIRY", "准备下一次询盘")}</span>
          <h3>
            {tr("Download the selection reference", "下载精选参数与需求模板")}
            <ArrowUpRight size={18} />
          </h3>
        </Link>
      </section>
      <Manufacturing locale={locale} />
      <OEM locale={locale} />
      <CTA locale={locale} />
    </>
  );
}
export function About({
  locale,
  embedded = false,
}: {
  locale: Locale;
  embedded?: boolean;
}) {
  const tr = (en: string, zh: string) => t(locale, en, zh);
  return (
    <>
      {!embedded && <Intro locale={locale} page="about" />}
      <section className="wrap about-grid section">
        <Image
          src="/images/manufacturing-campus.webp"
          width={1100}
          height={1000}
          alt={tr("Manufacturing campus", "生产配套园区")}
        />
        <div>
          <p className="eyebrow">SCYLLA LIGHTING / 锡拉照明</p>
          <h2>
            {tr(
              "Connecting good lighting with your next opportunity.",
              "让合适的照明产品，连接您的市场机遇。",
            )}
          </h2>
          <p>
            {tr(
              "Scylla Lighting is the lighting brand operated by 安徽锡拉科技有限公司, based in Anhui, China. We support importers, distributors, project buyers and brands with selected LED lighting, manufacturing coordination and OEM/ODM services.",
              "Scylla Lighting（锡拉照明）由安徽锡拉科技有限公司运营，面向进口商、分销商、工程采购与品牌客户，提供精选 LED 照明、制造协同与 OEM/ODM 服务。",
            )}
          </p>
          <p>
            {tr(
              "We begin with your application and destination market, then work through product selection, sample requirements, branding and delivery details with you.",
              "我们从应用场景与目标市场出发，与您共同确认产品选型、样品、品牌定制及交付细节。",
            )}
          </p>
          <ul className="check-list">
            {[
              tr("A focused product selection", "聚焦需求的产品精选"),
              tr("Manufacturing and quality support", "制造与质量配套"),
              tr("OEM / ODM collaboration", "OEM / ODM 协作"),
            ].map((s) => (
              <li key={s}>
                <Check size={18} />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {!embedded && <CTA locale={locale} />}
    </>
  );
}
export function Contact({
  locale,
  product,
  context,
}: {
  locale: Locale;
  product?: string;
  context?: string;
}) {
  const tr = (en: string, zh: string) => t(locale, en, zh);
  return (
    <>
      <Intro locale={locale} page="contact" />
      <section className="wrap contact-grid section">
        <aside>
          <p className="eyebrow">
            {tr("A CONVERSATION STARTS HERE", "从这里开始对话")}
          </p>
          <h2>
            {tr("A few details.", "给我们一些细节，")}
            <br />
            {tr("A better starting point.", "为合作找到起点。")}
          </h2>
          <p>
            {tr(
              "Tell us about your business, destination market and product requirements. Include any packaging or private-label needs so we can review the complete brief.",
              "请介绍您的业务、目标市场与产品要求。如需品牌包装或贴牌，也请一并说明，便于完整评估需求。",
            )}
          </p>
          <div className="contact-company">
            <span>{tr("OPERATED BY", "运营主体")}</span>
            <strong>安徽锡拉科技有限公司</strong>
            <p>
              {tr("Hefei, Anhui, China", "中国 · 安徽 · 合肥")}
              <br />
              Scylla Lighting / 锡拉照明
            </p>
          </div>
          <ContactChannels locale={locale} />
        </aside>
        <InquiryForm
          locale={locale}
          initialProduct={product}
          initialMessage={briefFor(locale, context)}
        />
      </section>
    </>
  );
}
export function Privacy({ locale }: { locale: Locale }) {
  const tr = (en: string, zh: string) => t(locale, en, zh);
  return (
    <>
      <Intro locale={locale} page="privacy" />
      <section className="wrap legal section">
        <h2>{tr("Your enquiry information", "您的询盘信息")}</h2>
        <p>
          {tr(
            "安徽锡拉科技有限公司 operates this website under the Scylla Lighting brand. When you submit an enquiry, we use your contact details and project information to review your requirements, communicate with you and prepare a quotation. Please do not include sensitive personal information.",
            "本网站由安徽锡拉科技有限公司以 Scylla Lighting 品牌运营。您提交询盘时，我们使用您提供的联系方式与项目需求评估方案、联系您并准备报价。请勿提交敏感个人信息。",
          )}
        </p>
        <p>
          {tr(
            "Information may be shared with service providers and production partners needed to respond to your request. We do not sell your enquiry information. To request access, correction or deletion, use the enquiry form and state your request.",
            "信息可能在回应您的需求所必要的范围内，与服务提供商和生产合作方共享。我们不出售您的询盘信息。如需访问、更正或删除，请通过询盘表单说明请求。",
          )}
        </p>
        <p>
          {tr(
            "This version uses no advertising trackers or optional analytics cookies. Hosting logs may be generated to operate and secure the site. Updated 11 November 2026.",
            "当前版本不使用广告追踪或可选分析 Cookie。网站运行与安全维护可能产生必要的服务器日志。更新日期：2026年11月11日。",
          )}
        </p>
      </section>
    </>
  );
}
