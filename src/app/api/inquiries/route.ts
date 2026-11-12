import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import xss from "xss";
import { categories } from "@/content/site";
import { inquiryResponseDiagnostic } from "@/lib/inquiry-response-diagnostic";
import {
  legacyMessage,
  legacyAcknowledged,
  MESSAGE_LIMIT,
} from "@/lib/inquiry-payload";
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const expectedOrigin =
    process.env.SITE_URL ||
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
    "phoneNumber",
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
    payload.name.length > 64 ||
    !validator.isEmail(payload.email) ||
    payload.email.length > 160 ||
    !payload.market ||
    payload.market.length > 100 ||
    !payload.message ||
    payload.message.length > MESSAGE_LIMIT ||
    payload.company.length > 160 ||
    payload.quantity.length > 60 ||
    payload.product.length > 80 ||
    payload.phoneNumber.length > 20 ||
    (payload.product !== "" &&
      payload.product !== "custom" &&
      !categories.some((c) => c.id === payload.product)) ||
    !["en", "zh-CN"].includes(payload.locale) ||
    text("consent") !== "yes"
  )
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  const message = xss(legacyMessage(payload));
  if (message.length > MESSAGE_LIMIT)
    return NextResponse.json(
      { error: "message_too_long", limit: MESSAGE_LIMIT },
      { status: 400 },
    );
  // The selected lighting family is not a Java machinery entity ID.
  const legacyPayload = {
    name: xss(payload.name),
    email: payload.email,
    phoneNumber: xss(payload.phoneNumber),
    message,
    productId: "",
  };
  if (legacyPayload.name.length > 64 || legacyPayload.phoneNumber.length > 20)
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  const baseUrl =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://127.0.0.1:8082/api";
  const endpoint =
    process.env.INQUIRY_API_URL ||
    baseUrl.replace(/\/+$/, "") + "/machiapi/saveInquiry";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.INQUIRY_API_TOKEN
          ? { Authorization: "Bearer " + process.env.INQUIRY_API_TOKEN }
          : {}),
      },
      body: JSON.stringify(legacyPayload),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    const result = await response.text();
    if (!legacyAcknowledged(result, response.status)) {
      console.warn(
        "[inquiries] unconfirmed",
        JSON.stringify({
          upstreamStatus: response.status,
          response: inquiryResponseDiagnostic(result),
        }),
      );
      return NextResponse.json({ error: "unconfirmed" }, { status: 502 });
    }
    return NextResponse.json(
      { success: true, delivery: "submitted" },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
