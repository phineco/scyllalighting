# Internal catalogue provenance

Reviewed 2026-11-12. Internal reference only; this file and source documents are not public downloads.

- Supplied PDF: /Users/louisw/Documents/世林照明/SHILIN Catalogue 2026.pdf, 44 physical PDF pages. References below use physical page numbers; printed folios are inconsistent.
- The official category page http://www.shilinlighting.com/Products.html was retrieved read-only. Its broader navigation was translated into the catalogue's more specific families.
- The supplied detail page http://www.shilinlighting.com/Products_details/113.html describes a 10W floodlight and multi-angle black/white photos. Its CDN rejected retrieval (403/567), so usable public assets come from the supplied PDF. Its lumen figure differs from the PDF; no combined lumen claim is made.
- The user expanded category-page scope from 1–3 representatives to every identifiable series. Power, size, finish and control variants remain grouped; no SKU codes, stock or availability are invented.
- Contents lists 16 categories but includes product pages for only 15. Table lamps remain unpublished pending source pages.

| Category | Physical pages | Series | Extra views | Scenes |
| --- | --- | ---: | ---: | ---: |
| Panels and mounting accessories | 5–10 | 16 | 3 | 2 |
| Ceiling lights | 11–13 | 7 | 8 | 0 |
| Downlights | 14–16 | 7 | 7 | 1 |
| Battens | 17 | 7 | 0 | 0 |
| T8 tubes | 18–21 | 9 | 0 | 2 |
| Strip lighting | 22–24 | 12 | 1 | 3 |
| LED bulbs | 25–31 | 16 | 3 | 1 |
| Filament bulbs | 32–34 | 6 | 2 | 0 |
| Smart lighting | 35–37 | 6 | 2 | 1 |
| Floodlights | 38–39 | 3 | 5 | 2 |
| Tri-proof lights | 40 | 1 | 4 | 3 |
| High bays | 41 | 1 | 2 | 1 |
| Street lights | 42 | 2 | 2 | 1 |
| Moisture-proof lights | 43 | 2 | 0 | 1 |
| Solar lighting | 44 | 2 | 0 | 1 |
| **Total** | | **97** | **39** | **19** |

## Review decisions

- Panels: sparkling-panel table has inconsistent final wattage/lumens; publish confirmed sizes/CCT only. Selectable panel heading says 3CCT but table lists four temperatures; use actual settings without a 3CCT assertion. Standard panel model name ends 60W but table says 62W; use table power without copying source codes.
- Battens: four covered-housing ranges but two photographs; shared photos explicitly labelled family references. Inconsistent open-batten 18W entries are replaced with tube count and dimensions.
- Tubes: waterproof model code says 12W/table 18W, coloured code says 18W/table 12W. Use table power without source codes. Regional electrical variants grouped with a family-reference photo; no regional certification claims copied.
- Strips: tables do not explicitly establish W/m; publish voltage, construction, density, colour and packing without inferred wattage-per-metre.
- Bulbs: 5CCT is selected on the body. Remote page mixes Bluetooth/2.4G/IR labels; require configuration confirmation. A60 photos with headings behind the body are replaced with explicitly labelled clean family references.
- Filaments: implausible lumen rows (e.g. 7291 lm) omitted. High-efficacy photo has an efficiency-label watermark; use a clean A60 family reference without class-A claims.
- Smart: page 36 shows recessed and surface-mounted aluminium families. ST64 CCT table likely misses a zero; publish tunable-white without inventing the endpoint. Confirm app, network and region per order; no third-party assistant logos copied.
- Solar: flood close-up carries upstream branding; its primary public image is the clean installed scene, explicitly labelled application reference. Street crop excludes an unrelated partial panel. No battery brand, runtime, cycle-life, warranty or maintenance-free claims copied.

## Media pipeline

assets/catalogue-products.json is the private crop/provenance manifest. scripts/export-catalogue-assets.py reads the source locally, generates src/content/catalogue-products.json with only public bilingual fields, and exports 155 WebP files (97 primaries, 39 extra views, 19 scenes; about 2.64 MiB) into public/images/catalogue/series and scenes.

Product photograph crops are centred on white; application crops keep photographic framing. A few unrelated heading fragments outside product silhouettes are cropped away with white background trims; the solar street crop excludes a partial panel. Product geometry is not generated or altered. Files carry no EXIF, XMP or ICC metadata. Existing category representatives remain for overview cards and original application illustrations.

scripts/catalogue-ocr.swift uses local macOS Vision. OCR output and contact sheets stay in temporary folders, never public/. Source footers, upstream names/logos/URLs, contacts and certification marks must not appear in public imagery, alt, metadata, downloads or responses. Application scenes are references, never described as Scylla-delivered projects.
