import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const expectedOrigin = process.env.SITE_URL ||
    request.nextUrl.protocol + "//" + request.headers.get("host");
  if (origin && origin !== expectedOrigin)
    return NextResponse.json({ error: "origin" }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json({ error: "content_type" }, { status: 415 });
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 12000)
      return NextResponse.json({ error: "too_large" }, { status: 413 });
    body = JSON.parse(raw);
    if (!body || Array.isArray(body) || typeof body !== "object")
      throw new Error();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const fields = [
    "name",
    "email",
    "company",
    "market",
    "product",
    "quantity",
    "message",
    "locale",
    "consent",
    "website",
  ];
  if (
    fields.some(
      (key) => body[key] !== undefined && typeof body[key] !== "string",
    )
  )
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  if (body.website)
    return NextResponse.json({ error: "invalid_submission" }, { status: 400 });
  const text = (key: string) => String(body[key] || "").trim();
  const payload = Object.fromEntries(
    fields
      .filter((f) => !["website", "consent"].includes(f))
      .map((f) => [f, text(f)]),
  );
  if (
    !payload.name ||
    payload.name.length > 80 ||
    !validator.isEmail(payload.email) ||
    payload.email.length > 160 ||
    !payload.market ||
    payload.market.length > 100 ||
    !payload.message ||
    payload.message.length > 3000 ||
    payload.company.length > 160 ||
    payload.quantity.length > 60 ||
    payload.product.length > 80 ||
    !["en", "zh-CN"].includes(payload.locale) ||
    text("consent") !== "yes"
  )
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  const endpoint = process.env.INQUIRY_API_URL;
  if (!endpoint)
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.INQUIRY_API_TOKEN
          ? { Authorization: "Bearer " + process.env.INQUIRY_API_TOKEN }
          : {}),
      },
      body: JSON.stringify({ ...payload, source: "scylla-lighting" }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    const result = await response.json().catch(() => null);
    if (result?.success !== true)
      return NextResponse.json({ error: "unconfirmed" }, { status: 502 });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
