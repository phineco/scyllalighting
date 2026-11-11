"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { categories, Locale, t } from "@/content/site";
import { legacyMessage, MESSAGE_LIMIT } from "@/lib/inquiry-payload";
import ContactChannels from "./ContactChannels";
export default function InquiryForm({
  locale,
  initialProduct = "",
  initialMessage = "",
}: {
  locale: Locale;
  initialProduct?: string;
  initialMessage?: string;
}) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [messageLength, setMessageLength] = useState(
    () =>
      legacyMessage({
        message: initialMessage,
        product: initialProduct,
        locale,
      }).length,
  );
  const tr = (en: string, zh: string) => t(locale, en, zh);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;
    if (legacyMessage({ ...values, locale }).length > MESSAGE_LIMIT) {
      setStatus("error");
      setError(
        tr(
          "Please shorten your enquiry or send the complete brief by email.",
          "请精简询盘，或通过邮箱发送完整需求。",
        ),
      );
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form)),
          locale,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error === "message_too_long"
            ? tr(
                "The combined enquiry is too long. Please shorten it or send the full brief by email.",
                "合并后的询盘过长，请精简内容或通过邮箱发送完整需求。",
              )
            : data.error === "unconfigured"
              ? tr(
                  "Online enquiries are not connected yet. Your message has not been sent. Please retain your details and try again later.",
                  "在线询盘尚未接通，信息未发送。请保留需求并稍后重试。",
                )
              : tr(
                  "We could not deliver your enquiry. Your details have been kept. Please try again or contact us directly below.",
                  "询盘暂时无法送达，填写内容已保留。请稍后重试，或通过下方联系方式直接联系我们。",
                ),
        );
      }
      setStatus("success");
      form.reset();
      setMessageLength(
        legacyMessage({
          message: initialMessage,
          product: initialProduct,
          locale,
        }).length,
      );
    } catch (e) {
      setStatus("error");
      setError(
        e instanceof Error
          ? e.message
          : tr("Connection error. Please try again.", "连接异常，请重试。"),
      );
    }
  }
  return (
    <form
      className="inquiry-form"
      onSubmit={submit}
      onChange={(event) => {
        const values = Object.fromEntries(
          new FormData(event.currentTarget),
        ) as Record<string, string>;
        setMessageLength(legacyMessage({ ...values, locale }).length);
      }}
    >
      <div className="form-grid">
        <label>
          {tr("Your name", "姓名")} *
          <input required name="name" maxLength={64} autoComplete="name" />
        </label>
        <label>
          {tr("Work email", "工作邮箱")} *
          <input
            required
            name="email"
            type="email"
            maxLength={160}
            autoComplete="email"
          />
        </label>
        <label>
          {tr("Company", "公司")}
          <input name="company" maxLength={160} autoComplete="organization" />
        </label>
        <label>
          {tr("Phone / WhatsApp (optional)", "电话 / WhatsApp（选填）")}
          <input
            name="phoneNumber"
            type="tel"
            maxLength={20}
            autoComplete="tel"
          />
        </label>
        <label>
          {tr("Target market", "目标市场")} *
          <input
            required
            name="market"
            maxLength={100}
            placeholder={tr("e.g. Kazakhstan", "例如：哈萨克斯坦")}
          />
        </label>
        <label>
          {tr("Product interest", "意向产品")}
          <select
            key={initialProduct}
            name="product"
            defaultValue={initialProduct}
          >
            <option value="">{tr("Help me choose", "请协助选品")}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {locale === "en" ? c.en : c.zh}
              </option>
            ))}
            <option value="custom">OEM / ODM</option>
          </select>
        </label>
        <label>
          {tr("Estimated quantity", "预计数量")}
          <input
            name="quantity"
            maxLength={60}
            placeholder={tr("e.g. 1,000 units", "例如：1,000 件")}
          />
        </label>
      </div>
      <label>
        {tr("Tell us about your project", "项目需求")} *
        <textarea
          key={initialMessage}
          defaultValue={initialMessage}
          required
          name="message"
          maxLength={MESSAGE_LIMIT}
          rows={5}
          placeholder={tr(
            "Application, specifications, branding and timeline…",
            "应用场景、规格、品牌定制与采购计划……",
          )}
        />
      </label>
      <p
        className={
          messageLength > MESSAGE_LIMIT
            ? "message-budget over"
            : "message-budget"
        }
      >
        {tr("Combined enquiry", "合并询盘")} {messageLength} / {MESSAGE_LIMIT} ·{" "}
        {tr(
          "Includes the product and market details. For longer briefs, please use email.",
          "含产品与市场信息，较长需求请使用邮箱。",
        )}
      </p>
      <label className="trap" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>
          {tr(
            "I agree to the use of my information to respond to this enquiry.",
            "我同意使用本次提交的信息回复我的询盘。",
          )}{" "}
          <Link href={"/" + locale + "/privacy"}>
            {tr("Privacy notice", "隐私说明")}
          </Link>
        </span>
      </label>
      <button className="button" disabled={status === "sending"} type="submit">
        {status === "sending"
          ? tr("Sending…", "发送中……")
          : tr("Send your enquiry", "发送需求")}
        <ArrowUpRight size={18} />
      </button>
      <div aria-live="polite">
        {status === "success" && (
          <p className="form-success">
            {tr(
              "Your enquiry has been submitted. Thank you.",
              "您的询盘已提交，谢谢。",
            )}
          </p>
        )}
        {status === "error" && (
          <div>
            <p role="alert" className="form-error">
              {error}
            </p>
            <ContactChannels locale={locale} compact />
          </div>
        )}
      </div>
    </form>
  );
}
