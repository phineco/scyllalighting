import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Download,
  Check,
  Plus,
  FileText,
  ShieldCheck,
  Boxes,
  Lightbulb,
} from "lucide-react";
import { categories, Locale, t, nav, pageNames } from "@/content/site";
import { applications, faq } from "@/content/journey";
import { categoryPath } from "@/content/catalogue";
import { ProductOverview } from "./ProductCatalog";
import {
  Manufacturing,
  OEM,
  About,
  Contact,
  CTA,
} from "./SiteContent";

const local = (locale: Locale) => (en: string, zh: string) => t(locale, en, zh);
function PageHero({
  locale,
  page,
  image,
}: {
  locale: Locale;
  page: string;
  image?: string;
}) {
  const tr = local(locale);
  const name =
    nav(locale).find((n) => n.path === page)?.label || tr("Contact", "联系");
  const descriptions: Record<string, [string, string]> = {
    products: [
      "A focused range for importers, distributors and project buyers. Start with a family, then build the specification around your market.",
      "面向进口商、分销商与工程采购。从产品系列出发，围绕您的市场确认合适的配置。",
    ],
    applications: [
      "A selection guide for the spaces you work with. Connect your site requirements with the right lighting families.",
      "围绕您服务的空间进行选型，将现场需求与合适的照明系列连接起来。",
    ],
    manufacturing: [
      "Production capabilities are only useful when they serve your specification. Here is how we bring the details together.",
      "制造能力的价值，在于回应具体产品要求。了解我们如何协同生产与质量确认。",
    ],
    "oem-odm": [
      "From a private-label range to a new product brief, choose a starting point that fits your business.",
      "从品牌贴牌到新产品需求，选择适合您业务的合作起点。",
    ],
    about: [
      "Selected lighting, manufacturing coordination and export support, brought together by Scylla Lighting.",
      "以精选照明产品、制造协同与出口配套，支持您的照明业务。",
    ],
    resources: [
      "Practical reference files for your purchasing team, with a clear route to model-specific documents.",
      "为采购团队提供实用参考文件，并按具体型号申请项目所需资料。",
    ],
  };
  return (
    <section className={"interior-hero wrap " + (image ? "has-image" : "")}>
      <nav className="breadcrumbs" aria-label={tr("Breadcrumb", "面包屑")}>
        <Link href={"/" + locale}>{tr("Home", "首页")}</Link>
        <span>/</span>
        <span aria-current="page">{name}</span>
      </nav>
      <div className="interior-hero-grid">
        <div>
          <p className="eyebrow">SCYLLA LIGHTING / {name}</p>
          <h1>{pageNames[page][locale === "en" ? 0 : 1]}</h1>
          <p className="intro-copy">
            {descriptions[page]?.[locale === "en" ? 0 : 1]}
          </p>
          <div className="hero-links">
            <Link
              className="button"
              href={
                "/" +
                locale +
                "/contact" +
                (page === "oem-odm" ? "?product=custom" : "")
              }
            >
              {tr("Discuss your requirements", "洽谈您的需求")}
              <ArrowUpRight size={17} />
            </Link>
            <a className="text-link" href="#page-content">
              {tr("Explore this page", "继续了解")}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
        {image ? (
          <div className="interior-image">
            <Image
              src={image}
              alt={tr(
                "Production support for Scylla Lighting",
                "锡拉照明生产制造配套",
              )}
              width={1100}
              height={800}
              priority
              sizes="(max-width: 900px) 100vw, 42vw"
            />
            <span>
              {tr(
                "MANUFACTURING SUPPORT / SCYLLA LIGHTING",
                "制造配套 / 锡拉照明",
              )}
            </span>
          </div>
        ) : (
          <div className="hero-index" aria-hidden="true">
            <Lightbulb size={36} />
            <span>
              SCYLLA
              <br />
              LIGHTING
            </span>
            <p>
              {tr(
                "PRODUCT · APPLICATION · COLLABORATION",
                "产品 · 场景 · 协作",
              )}
            </p>
            <div className="hero-index-rule" />
            <span className="hero-index-bottom">
              LED / OEM / ODM <ArrowUpRight size={25} />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
function JumpNav({
  locale,
  items,
}: {
  locale: Locale;
  items: [string, string][];
}) {
  return (
    <nav
      className="jump-nav wrap"
      aria-label={t(locale, "On this page", "本页导航")}
    >
      {items.map(([id, label]) => (
        <a href={"#" + id} key={id}>
          {label}
          <span>↘</span>
        </a>
      ))}
    </nav>
  );
}
export function FAQ({
  locale,
  indices = [0, 1, 2, 3, 4, 5],
}: {
  locale: Locale;
  indices?: number[];
}) {
  const tr = local(locale);
  return (
    <section className="wrap section faq-section" id="questions">
      <div>
        <p className="eyebrow">{tr("BUYER QUESTIONS", "采购常见问题")}</p>
        <h2>{tr("Before we begin.", "合作之前，您可能想了解。")}</h2>
        <p>
          {tr(
            "The details that help turn a first enquiry into a clear brief.",
            "让第一次询盘，成为更清晰的需求。",
          )}
        </p>
        <Link className="text-link" href={"/" + locale + "/contact"}>
          {tr("Ask another question", "咨询其他问题")}
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="faq-list">
        {indices.map((i) => (
          <details key={i}>
            <summary>
              {faq[i].q[locale === "en" ? 0 : 1]}
              <Plus size={18} />
            </summary>
            <p>{faq[i].a[locale === "en" ? 0 : 1]}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function SectionHead({
  locale,
  number,
  title,
  desc,
}: {
  locale: Locale;
  number: string;
  title: [string, string];
  desc?: [string, string];
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{number} / SCYLLA LIGHTING</p>
        <h2>{title[locale === "en" ? 0 : 1]}</h2>
      </div>
      {desc && <p>{desc[locale === "en" ? 0 : 1]}</p>}
    </div>
  );
}

export function ProductsPage({ locale }: { locale: Locale }) {
  const tr = local(locale);
  return (
    <>
      <ProductOverview locale={locale} />
      <section className="selection-help">
        <div className="wrap section">
          <SectionHead
            locale={locale}
            number="SELECTION"
            title={[
              "A few requirements make a better match.",
              "几个关键信息，让选型更准确。",
            ]}
          />
          <div className="note-grid">
            {[
              [
                tr("The space", "空间条件"),
                tr(
                  "Application, mounting dimensions and working conditions set the starting point.",
                  "从应用场景、安装尺寸与环境条件出发。",
                ),
              ],
              [
                tr("The light", "照明要求"),
                tr(
                  "Define power, colour temperature, controls and any project performance targets.",
                  "明确功率、色温、控制方式及项目性能目标。",
                ),
              ],
              [
                tr("The market", "目标市场"),
                tr(
                  "Confirm destination, packaging language and required product documents.",
                  "确认销售目的地、包装语言与所需产品资料。",
                ),
              ],
            ].map(([title, desc], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
          <Link className="text-link" href={"/" + locale + "/applications"}>
            {tr("Choose by application", "按应用场景选型")}
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <FAQ locale={locale} indices={[5, 1, 2, 3]} />
      <CTA locale={locale} />
    </>
  );
}

export function ApplicationsPage({ locale }: { locale: Locale }) {
  const tr = local(locale);
  return (
    <>
      <PageHero locale={locale} page="applications" />
      <JumpNav
        locale={locale}
        items={applications.map((a) => [
          a.id,
          a.title[locale === "en" ? 0 : 1],
        ])}
      />
      <section className="wrap section" id="page-content">
        <p className="application-disclosure">
          {tr(
            "APPLICATION GUIDE / These are selection scenarios, not completed project references.",
            "应用选型参考 / 以下为选型场景，不代表已交付项目案例。",
          )}
        </p>
        {applications.map((a, i) => (
          <article className="application-row" id={a.id} key={a.id}>
            <div className="application-visual">
              <span>
                0{i + 1} / {a.title[locale === "en" ? 0 : 1]}
              </span>
              <div className="application-products">
                {a.products.map((id) => (
                  <Image
                    key={id}
                    src={"/images/" + id + ".webp"}
                    alt={
                      categories.find((c) => c.id === id)?.[
                        locale === "en" ? "en" : "zh"
                      ] || id
                    }
                    width={800}
                    height={600}
                  />
                ))}
              </div>
              <p>{tr("SELECTED PRODUCT FAMILIES", "精选灯具系列")}</p>
            </div>
            <div>
              <p className="eyebrow">{a.title[locale === "en" ? 0 : 1]}</p>
              <h2>{a.line[locale === "en" ? 0 : 1]}</h2>
              <p>{a.description[locale === "en" ? 0 : 1]}</p>
              <ul className="check-list">
                {a.points.map((point) => (
                  <li key={point[0]}>
                    <Check size={17} />
                    {point[locale === "en" ? 0 : 1]}
                  </li>
                ))}
              </ul>
              <div className="family-tags">
                {a.products.map((id) => (
                  <Link key={id} href={categoryPath(locale, categories.find((c) => c.id === id)!)}>
                    {
                      categories.find((c) => c.id === id)?.[
                        locale === "en" ? "en" : "zh"
                      ]
                    }
                    <ArrowUpRight size={13} />
                  </Link>
                ))}
              </div>
              <Link
                className="text-link"
                href={"/" + locale + "/contact?context=" + a.id}
              >
                {tr("Discuss this application", "洽谈此场景")}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <CTA locale={locale} />
    </>
  );
}

export function ManufacturingPage({ locale }: { locale: Locale }) {
  const tr = local(locale);
  const stages = [
    [
      "Specification alignment",
      "规格对齐",
      "Confirm the selected model, component requirements and intended market.",
      "确认所选型号、组件要求与目标市场。",
    ],
    [
      "Sample review",
      "样品评审",
      "Record the approved appearance, electrical configuration and packaging reference.",
      "记录批准的外观、电气配置与包装参考。",
    ],
    [
      "Production coordination",
      "生产协同",
      "Align components, assembly requirements and review points with the production plan.",
      "围绕生产计划，对齐组件、装配要求与确认节点。",
    ],
    [
      "Quality review",
      "质量确认",
      "Agree the applicable appearance, functional and test checks for the selected model.",
      "按所选型号确认适用的外观、功能与测试检查项。",
    ],
    [
      "Packaging confirmation",
      "包装确认",
      "Review artwork, labels, unit packing and carton details before release.",
      "出运前确认设计稿、标签、单品包装与外箱信息。",
    ],
    [
      "Shipment preparation",
      "出运准备",
      "Review quantities, agreed documents and shipment arrangements with your team.",
      "与您核对数量、约定文件与出运安排。",
    ],
  ];
  return (
    <>
      <PageHero
        locale={locale}
        page="manufacturing"
        image="/images/precision-production.webp"
      />
      <JumpNav
        locale={locale}
        items={[
          ["page-content", tr("Production capabilities", "生产配套")],
          ["process", tr("Cooperation process", "协作流程")],
          ["consistency", tr("Batch consistency", "批次一致性")],
          ["documents", tr("Product documents", "产品文件")],
        ]}
      />
      <div id="page-content">
        <Manufacturing locale={locale} full />
      </div>
      <section className="wrap section" id="process">
        <SectionHead
          locale={locale}
          number="PROCESS"
          title={[
            "From the first brief to the final carton.",
            "从第一次需求，到最后一箱交付。",
          ]}
          desc={[
            "A working sequence to agree for each order. Inspection scope and records depend on the product and contract.",
            "每笔订单共同确认的工作顺序。检验范围与记录按产品和订单约定。",
          ]}
        />
        <div className="process-grid">
          {stages.map(([en, zh, descEn, descZh], i) => (
            <article key={en}>
              <span>0{i + 1}</span>
              <h3>{tr(en, zh)}</h3>
              <p>{tr(descEn, descZh)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="consistency-band" id="consistency">
        <div className="wrap section">
          <SectionHead
            locale={locale}
            number="CONSISTENCY"
            title={[
              "A good sample is the starting point.",
              "好样品，是一致性交付的起点。",
            ]}
            desc={[
              "Agree the details that must carry through to repeat orders.",
              "共同确认从首单延续到复购的关键细节。",
            ]}
          />
          <div className="note-grid">
            {[
              [
                tr("Appearance & fit", "外观与安装"),
                tr(
                  "Keep dimensions, finish references and mounting details in the agreed specification.",
                  "在确认规格中记录尺寸、表面颜色参考与安装细节。",
                ),
              ],
              [
                tr("Light & electronics", "光与电子配置"),
                tr(
                  "Identify the light source, driver, CCT and control configuration to review.",
                  "明确需核实的光源、驱动、色温与控制配置。",
                ),
              ],
              [
                tr("Packing & identification", "包装与识别"),
                tr(
                  "Record label versions, packaging artwork and the required batch identification.",
                  "记录标签版本、包装设计稿与所需批次标识。",
                ),
              ],
            ].map(([title, desc]) => (
              <article key={title}>
                <ShieldCheck size={24} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Documents locale={locale} />
      <CTA locale={locale} />
    </>
  );
}

export function OEMPage({ locale }: { locale: Locale }) {
  const tr = local(locale);
  const routes = [
    {
      id: "private-label",
      code: "01 / OEM",
      title: tr("Your brand on a selected range", "为精选系列注入您的品牌"),
      desc: tr(
        "Start with a catalogue family and discuss the logo, labels, packaging and instruction language.",
        "从现有产品系列出发，洽谈 Logo、标签、包装与说明书语言。",
      ),
      points: [
        tr("Selected product family", "选定产品系列"),
        tr("Brand and packaging references", "品牌与包装参考"),
        tr("Market and quantity", "目标市场与预计数量"),
      ],
    },
    {
      id: "adaptation",
      code: "02 / CONFIGURATION",
      title: tr("A configuration for your market", "为您的市场适配规格"),
      desc: tr(
        "Review a selected range against your electrical, installation and control requirements.",
        "围绕所选系列，评审电气、安装与控制要求。",
      ),
      points: [
        tr("Power, CCT and input requirements", "功率、色温与输入要求"),
        tr("Control and housing options", "控制与外壳配置"),
        tr("Sample approval criteria", "样品确认标准"),
      ],
    },
    {
      id: "development",
      code: "03 / ODM REVIEW",
      title: tr("A new product brief", "共同评审新的产品构想"),
      desc: tr(
        "Bring your design reference or a performance brief. Development scope, tooling and feasibility are assessed before commitment.",
        "提供设计参考或性能需求，先评估开发范围、模具需求与可行性。",
      ),
      points: [
        tr("Concept and target dimensions", "构想与目标尺寸"),
        tr("Performance and cost targets", "性能与成本目标"),
        tr("Development and testing plan", "开发与验证计划"),
      ],
    },
  ];
  return (
    <>
      <PageHero
        locale={locale}
        page="oem-odm"
        image="/images/manufacturing-campus.webp"
      />
      <JumpNav
        locale={locale}
        items={[
          ["page-content", tr("Ways to work", "合作路径")],
          ["configuration", tr("Customisation options", "定制选项")],
          ["milestones", tr("Project milestones", "项目节点")],
          ["questions", tr("Common questions", "常见问题")],
        ]}
      />
      <section className="wrap section" id="page-content">
        <SectionHead
          locale={locale}
          number="COLLABORATION"
          title={[
            "Three starting points. One clear brief.",
            "三种合作起点，一个清晰需求。",
          ]}
        />
        <div className="service-routes">
          {routes.map((r) => (
            <article key={r.id}>
              <p className="eyebrow">{r.code}</p>
              <h2>{r.title}</h2>
              <p>{r.desc}</p>
              <ul className="check-list">
                {r.points.map((p) => (
                  <li key={p}>
                    <Check size={16} />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                className="text-link"
                href={"/" + locale + "/contact?product=custom&context=" + r.id}
              >
                {tr("Start this brief", "提交此类需求")}
                <ArrowUpRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="selection-help" id="configuration">
        <div className="wrap section">
          <SectionHead
            locale={locale}
            number="OPTIONS"
            title={["Details that make it yours.", "让产品，成为您的产品。"]}
            desc={[
              "Options are reviewed by model; availability is confirmed in the proposal.",
              "各项按具体型号评审，可实施范围在方案中确认。",
            ]}
          />
          <div className="options-table">
            {[
              [
                tr("Light output", "照明表现"),
                tr(
                  "Power, colour temperature and distribution requirements",
                  "功率、色温与配光要求",
                ),
              ],
              [
                tr("Electrical & control", "电气与控制"),
                tr(
                  "Input voltage, driver selection, dimming or sensing",
                  "输入电压、驱动选型、调光或感应",
                ),
              ],
              [
                tr("Housing & installation", "外壳与安装"),
                tr(
                  "Finish, dimensions, installation and environmental conditions",
                  "外观颜色、尺寸、安装与环境条件",
                ),
              ],
              [
                tr("Brand presentation", "品牌呈现"),
                tr(
                  "Logo, labels, manuals and packaging language",
                  "Logo、标签、说明书与包装语言",
                ),
              ],
              [
                tr("Order & delivery", "订单与交付"),
                tr(
                  "Quantity, sample plan, carton requirements and destination",
                  "数量、样品计划、外箱要求与目的地",
                ),
              ],
            ].map(([name, desc]) => (
              <div key={name}>
                <h3>{name}</h3>
                <p>{desc}</p>
                <ArrowRight size={17} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div id="milestones">
        <OEM locale={locale} full />
      </div>
      <FAQ locale={locale} indices={[0, 1, 2, 4]} />
      <CTA locale={locale} />
    </>
  );
}

export function Documents({ locale }: { locale: Locale }) {
  const tr = local(locale);
  return (
    <section className="wrap section documents-section" id="documents">
      <SectionHead
        locale={locale}
        number="DOCUMENTS"
        title={[
          "The right file for the right model.",
          "让文件，与具体型号对应。",
        ]}
        desc={[
          "Request the documents your team needs. Availability, coverage and current versions are reviewed per model and destination.",
          "提出您所需的资料，按型号和目的地核实可提供范围、覆盖型号与当前版本。",
        ]}
      />
      <div className="document-grid">
        {[
          [
            tr("Specification & dimensions", "规格与尺寸"),
            tr(
              "Electrical configuration, installation dimensions and agreed variants.",
              "电气配置、安装尺寸与约定变体。",
            ),
          ],
          [
            tr("Performance & testing", "性能与测试"),
            tr(
              "Relevant test records or photometric information, where available for the model.",
              "按型号核实相关测试记录或配光资料的可提供情况。",
            ),
          ],
          [
            tr("Market documentation", "市场文件"),
            tr(
              "Applicable product documents and their model coverage for your destination.",
              "适用于目的地的产品文件与所覆盖的型号。",
            ),
          ],
          [
            tr("Packaging & shipment", "包装与出运"),
            tr(
              "Approved artwork, labels, carton data and agreed shipment paperwork.",
              "批准的设计稿、标签、外箱数据与约定出运资料。",
            ),
          ],
        ].map(([name, desc]) => (
          <article key={name}>
            <FileText size={23} />
            <h3>{name}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
      <Link
        className="text-link"
        href={"/" + locale + "/contact?context=documents"}
      >
        {tr("Request model-specific documents", "申请具体型号资料")}
        <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}

export function ResourcesPage({ locale }: { locale: Locale }) {
  const tr = local(locale);
  return (
    <>
      <PageHero locale={locale} page="resources" />
      <JumpNav
        locale={locale}
        items={[
          ["page-content", tr("Downloads", "资料下载")],
          ["documents", tr("Product documents", "产品文件")],
          ["questions", tr("Buyer FAQ", "采购问答")],
        ]}
      />
      <section className="wrap section" id="page-content">
        <SectionHead
          locale={locale}
          number="DOWNLOADS"
          title={[
            "A useful starting point, ready to share.",
            "随时下载，开始选型。",
          ]}
        />
        <div className="download-grid">
          {[
            {
              type: "selection",
              format: "CSV / UTF-8",
              title: tr("Selected range reference", "精选系列参数参考"),
              desc: tr(
                "Selected product categories, indicative ranges and applications in a spreadsheet-friendly format. Final specifications are confirmed per model.",
                "精选产品分类的参考规格与应用，可用表格软件打开。最终规格按型号确认。",
              ),
            },
            {
              type: "brief",
              format: "TXT / UTF-8",
              title: tr("Lighting enquiry brief", "照明采购需求模板"),
              desc: tr(
                "A plain-text checklist for your application, market, quantity, branding and document requirements.",
                "以纯文本记录应用、市场、数量、品牌定制与文件要求。",
              ),
            },
          ].map((r) => (
            <article key={r.type}>
              <div className="download-top">
                <FileText size={30} />
                <span>{r.format}</span>
              </div>
              <h2>{r.title}</h2>
              <p>{r.desc}</p>
              <a
                className="text-link"
                href={"/api/resources?type=" + r.type + "&locale=" + locale}
                download
              >
                {tr("Download file", "下载文件")}
                <Download size={17} />
              </a>
            </article>
          ))}
        </div>
      </section>
      <Documents locale={locale} />
      <FAQ locale={locale} />
      <CTA locale={locale} />
    </>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const tr = local(locale);
  return (
    <>
      <PageHero locale={locale} page="about" />
      <div id="page-content">
        <About locale={locale} embedded />
      </div>
      <section className="wrap section buyer-section" id="buyers">
        <SectionHead
          locale={locale}
          number="WHO WE WORK WITH"
          title={[
            "Built around the way you buy.",
            "围绕您的采购方式，开展合作。",
          ]}
        />
        <div className="note-grid">
          {[
            [
              tr("Importers & distributors", "进口商与分销商"),
              tr(
                "Build a coordinated lighting range around your channel, destination market and replenishment plan.",
                "结合渠道、目标市场与补货计划，构建协调的灯具组合。",
              ),
            ],
            [
              tr("Brands & private labels", "品牌与贴牌客户"),
              tr(
                "Align the product, packaging and sample process with your own brand requirements.",
                "围绕品牌要求，对齐产品、包装与样品流程。",
              ),
            ],
            [
              tr("Project buyers", "工程采购"),
              tr(
                "Start with the installation conditions, quantities and project document list.",
                "从安装条件、数量及项目文件清单开始确认。",
              ),
            ],
          ].map(([title, desc]) => (
            <article key={title}>
              <Boxes size={24} />
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="principles-band">
        <div className="wrap section">
          <SectionHead
            locale={locale}
            number="OUR APPROACH"
            title={["Clear scope. Considered choices.", "明确范围，认真选择。"]}
          />
          <div className="principles-list">
            {[
              [
                tr("Start with the market", "从市场出发"),
                tr(
                  "The application and destination come before the product configuration.",
                  "先了解应用和销售目的地，再确认产品配置。",
                ),
              ],
              [
                tr("Agree the reference", "共同确认基准"),
                tr(
                  "Keep sample, specification, artwork and inspection expectations aligned.",
                  "让样品、规格、设计稿与检验要求保持一致。",
                ),
              ],
              [
                tr("Keep the next step clear", "让下一步更清晰"),
                tr(
                  "Record the decisions needed for sampling, production and shipment.",
                  "记录打样、生产与出运所需确认的事项。",
                ),
              ],
            ].map(([title, desc], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
          <Link className="text-link" href={"/" + locale + "/contact"}>
            {tr("Tell us how you buy", "介绍您的采购需求")}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <CTA locale={locale} />
    </>
  );
}

export function ContactPage({
  locale,
  product,
  context,
}: {
  locale: Locale;
  product?: string;
  context?: string;
}) {
  const tr = local(locale);
  return (
    <>
      <Contact locale={locale} product={product} context={context} />
      <section className="wrap section enquiry-next">
        <SectionHead
          locale={locale}
          number="WHAT HAPPENS NEXT"
          title={[
            "From an enquiry to an agreed proposal.",
            "从需求开始，逐步形成方案。",
          ]}
        />
        <div className="process-grid compact">
          {[
            [
              tr("Review the brief", "核对需求"),
              tr(
                "We review the application, market and quantities you have shared.",
                "根据您提供的场景、市场与数量核对需求。",
              ),
            ],
            [
              tr("Clarify the configuration", "明确配置"),
              tr(
                "Confirm the range, sample needs and required documentation.",
                "确认产品系列、样品需求与文件清单。",
              ),
            ],
            [
              tr("Agree the proposal", "确认方案"),
              tr(
                "Record the configuration, commercial terms and next steps in writing.",
                "书面确认配置、商务条款与下一步安排。",
              ),
            ],
          ].map(([title, desc], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>
      <FAQ locale={locale} indices={[1, 2, 3]} />
    </>
  );
}
