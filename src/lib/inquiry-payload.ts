import { categories } from "@/content/site";
export const MESSAGE_LIMIT = 1024;
export function legacyMessage(data: Record<string, string>): string {
  const product = categories.find((c) => c.id === data.product);
  const series = product
    ? product.en + " / " + product.zh
    : data.product === "custom"
      ? "OEM / ODM"
      : "Selection assistance";
  const header = [
    "[Scylla Lighting]",
    data.company?.trim() ? "Company: " + data.company.trim() : "",
    "Market: " + (data.market || "").trim(),
    "Product: " + series,
    data.quantity?.trim() ? "Quantity: " + data.quantity.trim() : "",
    "Language: " + (data.locale || "en"),
  ]
    .filter(Boolean)
    .join("\n");
  return header + "\n\nEnquiry:\n" + (data.message || "").trim();
}

// Confirmed by the operator as the Java saveInquiry success response.
const legacySuccessMessage = "保存留言信息成功";

// Recognise submission acknowledgements, not database verification.
export function legacyAcknowledged(body: string, status: number): boolean {
  if (status < 200 || status >= 300) return false;
  if (!body.trim()) return true;
  let value: unknown;
  try {
    value = JSON.parse(body);
  } catch {
    return (
      body.trim() === legacySuccessMessage || /^(ok|success)$/i.test(body.trim())
    );
  }
  if (
    value === true ||
    value === "success" ||
    value === "OK" ||
    value === legacySuccessMessage
  )
    return true;
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const result = value as Record<string, unknown>;
  if (
    result.success === false ||
    result.success === "false" ||
    result.error ||
    result.result === false ||
    result.result === "false"
  )
    return false;
  if (
    "code" in result &&
    !new Set<unknown>([0, 200, "0", "200", "success", "SUCCESS"]).has(
      result.code,
    )
  )
    return false;
  if (
    "status" in result &&
    !new Set<unknown>([0, 200, "0", "200", "ok", "success", "SUCCESS"]).has(
      result.status,
    )
  )
    return false;
  return (
    result.success === true ||
    result.result === true ||
    "code" in result ||
    "status" in result
  );
}
