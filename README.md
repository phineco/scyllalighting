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

Routes: /en, /zh-CN, and products, manufacturing, oem-odm, about, contact, privacy under each locale. Unsupported routes return 404. Root redirects to /en.

## Configuration

Copy .env.example to .env.local. SITE_URL is the confirmed production origin (no trailing slash). Without it, indexing is disabled. Do not deploy with localhost canonical URLs.

INQUIRY_API_URL is the complete Java enquiry endpoint. INQUIRY_API_TOKEN is optional and server-only. The browser calls POST /api/inquiries. The server validates and forwards name, email, company, market, product, quantity, message, locale and source. The Java endpoint must persist the enquiry and return HTTP 2xx with {"success":true}. Without configuration the form reports failure and preserves input. Do not point it at the old machinery endpoint without adapting the contract.

Before production, configure reverse-proxy rate limiting, durable enquiry persistence, notification delivery, retention/deletion operations and the verified domain. Contact details and certification claims are not invented. No analytics or third-party fonts are loaded.

## Content

src/content/site.ts holds selected series and bilingual copy. Each category initially has one representative visual, not a full SKU catalogue. Listed ranges are catalogue examples, subject to final model confirmation; images represent a product family. Public assets are local WebP exports without original metadata. Original supplier catalogue and videos are not distributed.

DESIGN.md records visual direction. MEMORY.md records decisions. Do not publish supplier references, original source media, private contact data or unverified factory ownership/metrics.

Validation: npm run typecheck; npm run lint; npm run build; npm run test:runtime. Runtime checks start a local production server and mock backend, verify bilingual routes, real 404s, public content and enquiry failure/success contracts. No external service is contacted. GitHub Actions repeats these checks on push and pull requests.
