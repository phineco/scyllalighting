import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: "Scylla Lighting",
  description: "LED lighting and OEM/ODM manufacturing support.",
  icons: { icon: "/icon.png" },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale =
    (await headers()).get("x-site-locale") === "zh-CN" ? "zh-CN" : "en";
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
