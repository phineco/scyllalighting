import assert from "node:assert/strict";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { once } from "node:events";

// Uses only local mock data. No real enquiries or external services are contacted.
let confirmed = true;
let received;
const backend = createServer(async (req, res) => {
  let body = "";
  for await (const part of req) body += part;
  received = JSON.parse(body);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ success: confirmed }));
});
backend.listen(0, "127.0.0.1");
await once(backend, "listening");
const backendPort = backend.address().port;
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3107",
  ],
  {
    env: {
      ...process.env,
      INQUIRY_API_URL: "http://127.0.0.1:" + backendPort,
      INQUIRY_API_TOKEN: "",
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
let log = "";
server.stdout.on("data", (chunk) => {
  log += chunk;
});
server.stderr.on("data", (chunk) => {
  log += chunk;
});
const base = "http://127.0.0.1:3107";
const data = {
  name: "Integration test",
  email: "test@example.com",
  market: "Kazakhstan",
  message: "Local contract check",
  locale: "en",
  consent: "yes",
  product: "flood",
};
async function post(body, headers = {}) {
  return fetch(base + "/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}
try {
  let ready = false;
  for (let i = 0; i < 120; i++) {
    if (server.exitCode !== null) throw new Error(log);
    try {
      if ((await fetch(base + "/en")).ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  assert.ok(ready, "Production server should start");
  for (const locale of ["en", "zh-CN"])
    for (const path of [
      "",
      "products",
      "applications",
      "manufacturing",
      "oem-odm",
      "about",
      "resources",
      "contact",
      "privacy",
    ]) {
      const response = await fetch(
        base + "/" + locale + (path ? "/" + path : ""),
      );
      assert.equal(response.status, 200, path);
      const html = await response.text();
      assert.ok(html.includes('lang="' + locale + '"'));
      assert.ok(!/世林|shilin|machinery100|excavator/i.test(html));
    }
  for (const path of ["/en/unknown", "/fr", "/en/products/invalid", "/en/toString", "/en/constructor"])
    assert.equal((await fetch(base + path)).status, 404);
  for (const locale of ["en", "zh-CN"])
    for (const type of ["selection", "brief"]) {
      const response = await fetch(
        base + "/api/resources?locale=" + locale + "&type=" + type,
      );
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-disposition"), /attachment/);
      const content = await response.text();
      assert.ok(
        content.includes("Scylla Lighting") ||
          content.includes("SCYLLA LIGHTING"),
      );
      assert.ok(!/世林|shilin|machinery100/i.test(content));
      if (type === "selection")
        assert.equal(content.trim().split("\r\n").length, 9);
      if (locale === "zh-CN")
        assert.ok(content.includes(type === "brief" ? "目标市场" : "参考规格"));
    }
  assert.equal(
    (await fetch(base + "/api/resources?locale=fr&type=brief")).status,
    400,
  );
  assert.equal(
    (await fetch(base + "/api/resources?locale=en&type=unknown")).status,
    400,
  );
  assert.equal((await post({ ...data, email: "invalid" })).status, 400);
  assert.equal((await post({ ...data, name: 123 })).status, 400);
  assert.equal((await post(null)).status, 400);
  assert.equal((await post({ ...data, website: "spam" })).status, 400);
  assert.equal((await post({ ...data, consent: "" })).status, 400);
  assert.equal(
    (await post(data, { origin: "https://untrusted.example" })).status,
    403,
  );
  confirmed = false;
  assert.equal(
    (await post(data)).status,
    502,
    "Unconfirmed upstream must never produce success",
  );
  confirmed = true;
  const success = await post(data);
  assert.equal(success.status, 201);
  assert.equal((await success.json()).success, true);
  assert.equal(received.source, "scylla-lighting");
  assert.equal(received.product, "flood");
  assert.equal(received.market, "Kazakhstan");
  console.log(
    "PASS: 18 production pages, locale HTML, public term scan, bilingual file downloads, real 404s, validation, origin check and confirmed enquiry delivery contract.",
  );
} catch (error) {
  console.error(log);
  throw error;
} finally {
  server.kill("SIGTERM");
  await new Promise((resolve) => backend.close(resolve));
}
