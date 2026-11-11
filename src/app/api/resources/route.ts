import { NextRequest } from "next/server";
import { categories, isLocale, t } from "@/content/site";
export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") || "en";
  const type = request.nextUrl.searchParams.get("type");
  if (!isLocale(locale) || !["selection", "brief"].includes(type || ""))
    return Response.json({ error: "invalid_resource" }, { status: 400 });
  const tr = (en: string, zh: string) => t(locale, en, zh);
  let content: string;
  let extension: string;
  if (type === "selection") {
    const quote = (value: string) => '"' + value.replaceAll('"', '""') + '"';
    const note = tr(
      "Indicative product-family reference only. Image, configuration, specifications, availability and market documentation must be confirmed for the selected model.",
      "仅为产品系列参考。图片、配置、规格、供货与目标市场资料需按所选型号确认。",
    );
    const rows = [
      [
        tr("Brand", "品牌"),
        tr("Product family", "产品系列"),
        tr("Indicative range", "参考规格"),
        tr("Application", "应用"),
        tr("Notes", "说明"),
      ],
      ...categories.map((c) => [
        "Scylla Lighting",
        locale === "en" ? c.en : c.zh,
        c.spec,
        locale === "en" ? c.useEn : c.useZh,
        note,
      ]),
    ];
    content =
      "\uFEFF" + rows.map((row) => row.map(quote).join(",")).join("\r\n");
    extension = "csv";
  } else {
    content = [
      "SCYLLA LIGHTING / " + tr("ENQUIRY BRIEF", "采购需求模板"),
      "",
      "1. " + tr("Your company and contact", "公司与联系方式") + ":",
      "2. " + tr("Destination market", "目标市场") + ":",
      "3. " + tr("Application and site conditions", "应用与现场条件") + ":",
      "4. " + tr("Selected product family / model", "产品系列 / 型号") + ":",
      "5. " + tr("Quantity and purchasing plan", "数量与采购计划") + ":",
      "6. " +
        tr("Power, CCT, voltage and controls", "功率、色温、电压与控制") +
        ":",
      "7. " +
        tr(
          "Mounting dimensions and protection requirements",
          "安装尺寸与防护要求",
        ) +
        ":",
      "8. " + tr("Branding, packaging and language", "品牌、包装与语言") + ":",
      "9. " + tr("Sample and document requirements", "样品与文件要求") + ":",
      "10. " +
        tr("Target schedule and shipment destination", "采购时间与出运目的地") +
        ":",
      "",
      tr(
        "MOQ, availability, development scope, lead time, warranty and applicable documents are confirmed in the written proposal.",
        "起订量、供货、开发范围、交期、质保与适用文件在书面方案中确认。",
      ),
      "",
    ]
      .filter(Boolean)
      .join("\n");
    extension = "txt";
  }
  return new Response(content, {
    headers: {
      "Content-Type":
        type === "selection"
          ? "text/csv; charset=utf-8"
          : "text/plain; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="scylla-lighting-' +
        type +
        "-" +
        locale +
        "." +
        extension +
        '"',
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
