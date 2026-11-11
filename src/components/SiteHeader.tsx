"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Globe2 } from "lucide-react";
import { Locale, nav, t } from "@/content/site";
export default function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const alternate =
    "/" +
    (locale === "en" ? "zh-CN" : "en") +
    path.slice(("/" + locale).length);
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link
          href={"/" + locale}
          className="brand"
          aria-label="Scylla Lighting home"
        >
          <Image
            src="/brand/logo-horizontal.png"
            alt="Scylla Lighting"
            width={160}
            height={67}
            priority
          />
        </Link>
        <nav
          id="main-navigation"
          className={open ? "navigation open" : "navigation"}
          aria-label={t(locale, "Main navigation", "主导航")}
        >
          {nav(locale).map((n) => (
            <Link
              onClick={() => setOpen(false)}
              className={path.endsWith("/" + n.path) ? "active" : ""}
              key={n.path}
              href={"/" + locale + "/" + n.path}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="language"
            href={alternate}
            aria-label={t(locale, "Switch to Chinese", "切换至英文")}
          >
            <Globe2 size={15} />
            {locale === "en" ? "中文" : "EN"}
          </a>
          <Link className="button small" href={"/" + locale + "/contact"}>
            {t(locale, "Start a project", "洽谈项目")}
            <ArrowUpRight size={15} />
          </Link>
          <button
            className="menu-button"
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={t(locale, "Toggle menu", "展开导航")}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
