import assert from "node:assert/strict";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { once } from "node:events";

// Uses only local mock data. No real enquiries or external services are contacted.
let reply = {
  status: 200,
  body: JSON.stringify({ success: true }),
  type: "application/json",
};
let received;
let receivedPath;
let writes = 0;
const backend = createServer(async (req, res) => {
  let body = "";
  for await (const part of req) body += part;
  received = JSON.parse(body);
  receivedPath = req.url;
  writes++;
  res.statusCode = reply.status;
  res.setHeader("Content-Type", reply.type);
  res.end(reply.body);
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
      INQUIRY_API_URL: "",
      API_BASE_URL: "http://127.0.0.1:" + backendPort + "/api/",
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
  company: "Scylla contract check",
  quantity: "1000",
  phoneNumber: "+1234567890",
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
      assert.ok(
        !/世林|shilin|machinery100|excavator/i.test(
          html.replaceAll("info@machinery100.com", ""),
        ),
      );
      assert.ok(html.includes("mailto:info@machinery100.com"));
      assert.ok(html.includes("https://wa.me/8618949813729"));
      if (path === "contact") {
        for (const field of ["name", "phoneNumber", "email"]) {
          const input = html.match(new RegExp('<input\\b[^>]*name="' + field + '"[^>]*>'))?.[0];
          assert.ok(input, "Contact input must exist: " + field);
          assert.match(input, /maxLength="64"/i);
        }
        assert.match(html, /<textarea\b[^>]*maxLength="1024"/i);
      }
    }
  for (const path of [
    "/en/unknown",
    "/fr",
    "/en/products/invalid",
    "/en/toString",
    "/en/constructor",
  ])
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
  assert.equal((await post({ ...data, name: "x".repeat(65) })).status, 400);
  assert.equal(
    (await post({ ...data, phoneNumber: "1".repeat(65) })).status,
    400,
  );
  assert.equal(
    (await post({ ...data, email: "a".repeat(53) + "@example.com" })).status,
    400,
  );
  assert.equal((await post({ ...data, product: "not-a-product" })).status, 400);
  const tooLong = await post({ ...data, message: "x".repeat(1000) });
  assert.equal(tooLong.status, 400);
  assert.equal((await tooLong.json()).error, "message_too_long");
  assert.equal(
    writes,
    0,
    "Invalid or over-length enquiries must not reach the backend",
  );
  const boundaryData = {
    ...data,
    name: "名".repeat(64),
    phoneNumber: "+" + "1".repeat(63),
    email: "a".repeat(52) + "@example.com",
  };
  assert.equal((await post(boundaryData)).status, 201);
  assert.equal(received.name, boundaryData.name);
  assert.equal(received.phoneNumber, boundaryData.phoneNumber);
  assert.equal(received.email, boundaryData.email);
  const overhead = received.message.length - data.message.length;
  assert.equal(
    (await post({ ...data, message: "x".repeat(1024 - overhead) })).status,
    201,
  );
  assert.equal(received.message.length, 1024);
  const boundaryWrites = writes;
  const overBudget = await post({ ...data, message: "x".repeat(1025 - overhead) });
  assert.equal(overBudget.status, 400);
  assert.equal((await overBudget.json()).error, "message_too_long");
  assert.equal(writes, boundaryWrites, "A 1025-character message must not be forwarded");
  for (const body of [
    { success: false },
    { code: 500 },
    { code: 200, success: false, message: "保存留言信息成功" },
    { error: "Failed" },
    {},
  ]) {
    reply = {
      status: 200,
      body: JSON.stringify(body),
      type: "application/json",
    };
    assert.equal((await post(data)).status, 502);
  }
  reply = {
    status: 200,
    type: "application/json",
    body: JSON.stringify({
      statusCode: 200,
      data: { email: "private-response@example.com" },
      message: "PRIVATE_RESPONSE_MESSAGE",
      error: "PRIVATE_RESPONSE_ERROR",
      arbitraryKey: "PRIVATE_RESPONSE_FIELD",
    }),
  };
  const unconfirmed = await post(data);
  assert.equal(unconfirmed.status, 502);
  assert.deepEqual(await unconfirmed.json(), { error: "unconfirmed" });
  for (let i = 0; i < 50 && !log.includes('"statusCode":200'); i++)
    await new Promise((resolve) => setTimeout(resolve, 10));
  assert.match(log, /\[inquiries\] unconfirmed/);
  assert.ok(log.includes('"statusCode":200'));
  assert.ok(log.includes('"data":"object"'));
  assert.ok(!/private-response@example|PRIVATE_RESPONSE_/.test(log));
  reply = { status: 200, body: "<html>Login</html>", type: "text/html" };
  assert.equal(
    (await post(data)).status,
    502,
    "An HTML login page cannot acknowledge a submission",
  );
  reply = { status: 401, body: "Unauthorized", type: "text/plain" };
  assert.equal((await post(data)).status, 502);
  for (const [status, body, type] of [
    [200, "保存留言信息失败", "text/plain"],
    [200, JSON.stringify("保存留言信息失败"), "application/json"],
    [200, "未保存留言信息成功", "text/plain"],
    [200, "<html>保存留言信息成功</html>", "text/html"],
    [500, "保存留言信息成功", "text/plain"],
  ]) {
    reply = { status, body, type };
    assert.equal((await post(data)).status, 502);
  }
  for (const [body, type] of [
    ["保存留言信息成功", "text/plain"],
    [" \n保存留言信息成功\n", "text/plain"],
    [JSON.stringify("保存留言信息成功"), "application/json"],
    ['"\\u4fdd\\u5b58\\u7559\\u8a00\\u4fe1\\u606f\\u6210\\u529f"', "application/json"],
  ]) {
    reply = { status: 200, body, type };
    const response = await post(data);
    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), {
      success: true,
      delivery: "submitted",
    });
  }
  for (const body of [
    { code: 0 },
    { code: 200 },
    { code: "200" },
    { success: true },
    true,
  ]) {
    reply = {
      status: 200,
      body: JSON.stringify(body),
      type: "application/json",
    };
    assert.equal((await post(data)).status, 201);
  }
  reply = { status: 204, body: "", type: "application/json" };
  assert.equal(
    (await post(data)).status,
    201,
    "Legacy empty 2xx response acknowledges submission",
  );
  reply = {
    status: 200,
    body: JSON.stringify({ success: true }),
    type: "application/json",
  };
  const success = await post(data);
  assert.equal(success.status, 201);
  assert.equal((await success.json()).success, true);
  assert.equal(receivedPath, "/api/machiapi/saveInquiry");
  assert.deepEqual(
    Object.keys(received).sort(),
    ["name", "email", "phoneNumber", "message", "productId"].sort(),
  );
  assert.equal(received.productId, "");
  assert.equal(received.phoneNumber, data.phoneNumber);
  assert.ok(received.message.includes("[Scylla Lighting]"));
  assert.ok(received.message.includes("Market: Kazakhstan"));
  assert.ok(received.message.includes("Company: Scylla contract check"));
  assert.ok(received.message.includes("Quantity: 1000"));
  assert.ok(received.message.includes("LED Floodlights"));
  assert.ok(received.message.endsWith(data.message));
  assert.ok(received.message.length <= 1024);
  console.log(
    "PASS: 18 production pages, real contact links, downloads, strict validation, legacy saveInquiry fields/path, message limit and success/failure acknowledgement handling. No production writes.",
  );
} catch (error) {
  console.error(log);
  throw error;
} finally {
  server.kill("SIGTERM");
  await new Promise((resolve) => backend.close(resolve));
}
