// Public business contacts reused at the user's request from machinery.
export const contact = {
  phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+8618949813729",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@machinery100.com",
};
export const phoneDigits = contact.phone.replace(/\D/g, "");
export const displayPhone = contact.phone.replace(
  /^(\+86)(\d{3})(\d{4})(\d{4})$/,
  "$1 $2 $3 $4",
);
export function whatsappLink(locale: "en" | "zh-CN") {
  const message =
    locale === "en"
      ? "Hello Scylla Lighting, I would like to discuss LED lighting and OEM/ODM requirements."
      : "您好，我想向锡拉照明咨询 LED 灯具及 OEM/ODM 合作。";
  return (
    "https://wa.me/" + phoneDigits + "?text=" + encodeURIComponent(message)
  );
}
