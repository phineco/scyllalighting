const knownStatuses = new Set<unknown>([
  0, 1, 200, 400, 401, 403, 404, 500,
  "0", "1", "200", "400", "401", "403", "404", "500",
  "true", "false", "ok", "OK", "success", "SUCCESS", "error", "ERROR",
]);

// Describe an unrecognised response without logging customer data or raw bodies.
export function inquiryResponseDiagnostic(body: string) {
  let value: unknown;
  try {
    value = JSON.parse(body);
  } catch {
    return { format: /^\s*</.test(body) ? "markup" : "text" };
  }
  if (value === null) return { format: "null" };
  if (Array.isArray(value)) return { format: "array" };
  if (typeof value !== "object") return { format: typeof value };
  const result = value as Record<string, unknown>;
  const fields: Record<string, string | number | boolean | null> = {};
  for (const key of [
    "code", "status", "statusCode", "success", "result", "error",
    "data", "message", "msg", "returnCode", "retCode", "errcode",
  ]) {
    if (!Object.hasOwn(result, key)) continue;
    const field = result[key];
    // Only known status values can appear verbatim; all other values are types.
    const statusField = !["data", "message", "msg"].includes(key);
    if (
      statusField &&
      (typeof field === "boolean" || field === null || knownStatuses.has(field))
    ) {
      fields[key] = field as string | number | boolean | null;
    } else {
      fields[key] = Array.isArray(field) ? "array" : typeof field;
    }
  }
  return { format: "object", fields };
}
