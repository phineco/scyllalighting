# Scylla Lighting / 锡拉照明

Bilingual B2B LED lighting website operated by 安徽锡拉科技有限公司. Based on the machinery project baseline, with a rebuilt lighting experience.

## Run

Node.js 20.9+:

```sh
npm ci
npm run dev
npm run build
npm run start
```

Routes: /en, /zh-CN, and products, applications, manufacturing, oem-odm, about, resources, contact, privacy under each locale. Unsupported routes return 404. Root redirects to /en.

Application and OEM links pass only known context keys to the contact page; the form is prefilled with a localized brief. Language switching preserves the product/context selection and section anchor, but not personal information entered in the form. The resources page downloads actual bilingual selected-range CSV and enquiry-template TXT files through /api/resources. Model-specific reports and conformity documents remain available by enquiry and require review; there are no placeholder certificate downloads or supplier catalogues.

## Configuration

Copy .env.example to .env.local. SITE_URL is the confirmed production origin (no trailing slash). Without it, indexing is disabled. Do not deploy with localhost canonical URLs.

The enquiry adapter now reuses machinery's Java contract. The browser posts to this site's `/api/inquiries`; the server posts to `/machiapi/saveInquiry` below the Java API root. Endpoint precedence is:

1. `INQUIRY_API_URL` — optional complete endpoint override.
2. `API_BASE_URL` — server-only root; the confirmed production root is `https://q.scyllatech.cn/quant`.
3. `NEXT_PUBLIC_API_BASE_URL` — supported for compatibility with the original deployment.
4. `http://127.0.0.1:8082/api` — original same-host default.

`INQUIRY_API_TOKEN` is optional and server-only. Configure the Java service's private or HTTPS address if it runs on another host; the new site does not automatically send enquiries through the old public HTTP website.

### Production enquiry configuration

The operator confirmed the Java root on 2026-11-12. In the production project root, set `.env.local` to:

```dotenv
SITE_URL=http://www.machinery100.com
INQUIRY_API_URL=
API_BASE_URL=https://q.scyllatech.cn/quant
INQUIRY_API_TOKEN=
```

This resolves to `https://q.scyllatech.cn/quant/machiapi/saveInquiry`. Alternatively, set `INQUIRY_API_URL` to that complete endpoint; a nonempty value overrides `API_BASE_URL`. Do not add `/api` to the confirmed root or escape `:` and `.` in the file. The previous `127.0.0.1:8082/api` example only works when that exact Java service is available on the Next.js server (or inside its container).

Restart the website process after changing server-only enquiry settings; these settings do not require a rebuild. If using PM2, use the actual process name and `--update-env`, and correct any stale values in its ecosystem configuration or exported process environment, which take precedence over `.env.local`. Changes to `SITE_URL` or public contact variables still require rebuilding the generated pages.

On the deployment host, a non-writing connectivity check is:

```sh
curl -i --max-time 15 -X OPTIONS https://q.scyllatech.cn/quant/machiapi/saveInquiry
```

The 2026-11-12 check returned HTTP 200 with `Allow: POST,OPTIONS`. This confirms route reachability, not enquiry persistence. No production test enquiry was submitted. The browser should continue posting to the website's `/api/inquiries`; forward that route to Next.js in Nginx so validation and the Java adapter run. A JSON `delivery_failed`/`unconfirmed` 502 comes from the adapter; an Nginx HTML 502 calls for checking Nginx's Next.js upstream and process port.

| Java field | Lighting form mapping |
| --- | --- |
| `name` | Customer name, maximum 64 characters |
| `email` | Customer email, maximum 64 characters |
| `phoneNumber` | Optional customer phone/WhatsApp, maximum 64 characters |
| `message` | Scylla Lighting source marker, company, market, selected family, quantity, locale and original enquiry; maximum 1024 characters combined |
| `productId` | Empty string: a lighting family is not a machinery database entity ID |

Input is validated and sanitized. Over-length messages are rejected without contacting Java or silently truncating information. The form shows the combined length and offers direct email/WhatsApp when delivery fails. It preserves the entered details after failure.

Limits follow the operator-provided `m_inquiry` schema (2026-11-12) and are shared by browser `maxLength` attributes and server validation: name/phone/email 64, combined message 1024. Company, market, product, quantity and language are included in that message budget. Internal columns such as `memo`, `status`, IDs and audit fields are not customer-editable form fields.

The original client treats HTTP 2xx as submission acknowledgement. This adapter supports empty successful responses, JSON `true`, explicit `success:true`, and conventional `code` 0/200 results. On 2026-11-12 the operator confirmed the Java success body is `保存留言信息成功`; that exact text is accepted as plain text (ignoring surrounding whitespace) or a JSON string. Failure messages, substring matches, non-2xx responses, explicit business failures, unrecognised bodies and HTML login/error pages are rejected. Success copy says “submitted”, not database-verified. Actual persistence still depends on the Java endpoint. Contract tests use only a local mock; no production inquiry was created for verification.

If `/api/inquiries` returns `{"error":"unconfirmed"}`, Java returned HTTP 2xx but its body did not match the acknowledgement contract. The enquiry may already have been saved: check the existing Java record/response before retrying. Next.js logs `[inquiries] unconfirmed` with the upstream HTTP status and a redacted response description. Only allowlisted field names, value types and known status values are logged; customer fields, messages, raw response bodies and tokens are not logged or returned to the browser. Check the website process's stderr (for PM2, `pm2 logs`); the original response or Java controller contract is still needed to confirm any new success format. Do not accept every HTTP 200 body as success to bypass a business error.

Business contacts were checked against upstream/main and the original public contact page: WhatsApp/phone `+86 189 4981 3729`, `info@machinery100.com`, Hefei, Anhui, China. Override with `NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_CONTACT_EMAIL` before building if needed. The inherited email domain is intentionally retained at the user's request; no new mailbox is invented.

Before production, configure reverse-proxy rate limiting, verify durable enquiry persistence and notification delivery in Java, set retention/deletion operations and the verified domain. No analytics or third-party fonts are loaded.

## Content

src/content/site.ts holds selected series and bilingual copy. Each category initially has one representative visual, not a full SKU catalogue. Listed ranges are catalogue examples, subject to final model confirmation; images represent a product family. Public assets are local WebP exports without original metadata. Original supplier catalogue and videos are not distributed.

DESIGN.md records visual direction. MEMORY.md records decisions. Do not publish supplier references, original source media, private contact data or unverified factory ownership/metrics.

Validation: npm run typecheck; npm run lint; npm run build; npm run test:runtime. Runtime checks start a local production server and mock backend, verify bilingual routes, real 404s, public content and enquiry failure/success contracts. No external service is contacted. GitHub Actions repeats these checks on push and pull requests.
