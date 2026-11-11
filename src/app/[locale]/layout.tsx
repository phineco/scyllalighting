import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, t, nav } from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import ContactChannels, { FloatingContact } from "@/components/ContactChannels";
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <a className="skip-link" href="#main">
        {t(locale, "Skip to content", "跳至正文")}
      </a>
      <SiteHeader locale={locale} />
      <main id="main">{children}</main>
      <footer>
        <div className="wrap footer-grid">
          <div>
            <Link href={"/" + locale} className="footer-brand">
              Scylla<span>LIGHTING</span>
            </Link>
            <p>
              {t(
                locale,
                "Light for your market. Made for your brand.",
                "为您的市场，点亮您的品牌。",
              )}
            </p>
          </div>
          <div>
            <p className="eyebrow">{t(locale, "EXPLORE", "探索")}</p>
            {nav(locale).map((n) => (
              <Link key={n.path} href={"/" + locale + "/" + n.path}>
                {n.label}
              </Link>
            ))}
          </div>
          <div>
            <p className="eyebrow">
              {t(locale, "LET’S WORK TOGETHER", "与我们合作")}
            </p>
            <Link href={"/" + locale + "/contact"}>
              {t(locale, "Start a project ↗", "洽谈项目 ↗")}
            </Link>
            <p>
              安徽锡拉科技有限公司
              <br />
              {t(locale, "Anhui, China", "中国 · 安徽")}
            </p>
            <ContactChannels locale={locale} compact />
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} Scylla Lighting</span>
          <span>
            {t(
              locale,
              "Operated by 安徽锡拉科技有限公司",
              "运营主体：安徽锡拉科技有限公司",
            )}
          </span>
          <Link href={"/" + locale + "/privacy"}>
            {t(locale, "Privacy", "隐私说明")}
          </Link>
        </div>
      </footer>
      <FloatingContact locale={locale} />
    </>
  );
}
