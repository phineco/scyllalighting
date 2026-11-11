import { Mail, Phone, MessageCircle } from "lucide-react";
import { contact, displayPhone, whatsappLink } from "@/content/contact";
import { Locale, t } from "@/content/site";
export default function ContactChannels({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "contact-channels compact" : "contact-channels"}>
      <a href={whatsappLink(locale)} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={17} />
        <span>
          <small>WhatsApp</small>
          {displayPhone}
        </span>
      </a>
      <a href={"mailto:" + contact.email}>
        <Mail size={17} />
        <span>
          <small>{t(locale, "Email", "邮箱")}</small>
          {contact.email}
        </span>
      </a>
      {!compact && (
        <a href={"tel:+" + contact.phone.replace(/\D/g, "")}>
          <Phone size={17} />
          <span>
            <small>{t(locale, "Phone", "电话")}</small>
            {displayPhone}
          </span>
        </a>
      )}
    </div>
  );
}
export function FloatingContact({ locale }: { locale: Locale }) {
  return (
    <a
      className="floating-contact"
      href={whatsappLink(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(
        locale,
        "Chat with Scylla Lighting on WhatsApp",
        "通过 WhatsApp 联系锡拉照明",
      )}
    >
      <MessageCircle size={20} />
      <span>WhatsApp</span>
    </a>
  );
}
