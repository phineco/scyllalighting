import assert from 'node:assert/strict';
import { readFile, rename, writeFile } from 'node:fs/promises';
import ts from 'typescript';

async function loadContent(filename) {
  const source = await readFile(new URL('../src/content/' + filename, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  return import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
}
const { categories, categorySeo } = await loadContent('site.ts');
const { localizeSpec } = await loadContent('specification.ts');

const { siteOrigin: site } = await loadContent('origin.ts');
const content = new URL('../src/content/', import.meta.url);
const data = JSON.parse(await readFile(new URL('catalogue-products.json', content), 'utf8'));
const byId = new Map(categories.map(category => [category.id, category]));
const bilingual = (en, zh) => ({ en, 'zh-CN': zh });
const localizedUrls = path => bilingual(site + '/en' + path, site + '/zh-CN' + path);
const unitField = { W: 'power_w', K: 'cct_k', V: 'voltage_v', mm: 'length_mm', m: 'length_m', '°': 'beam_angle_deg' };

// Only parse complete specification segments. Options in free text retain their original scope.
function referenceFacets(spec) {
  const facets = {};
  for (const raw of spec.split(' · ')) {
    const value = raw.trim();
    const measurement = value.match(/^(\d+(?:\.\d+)?(?:\s*(?:\/|–|-)\s*\d+(?:\.\d+)?)*)\s*(mm|m|W|K|V|°)(?:\s+(DC|AC))?$/u);
    if (measurement) {
      const [, numbers, unit, current] = measurement;
      const values = numbers.match(/\d+(?:\.\d+)?/g).map(Number);
      const range = /[–-]/.test(numbers);
      facets[unitField[unit]] = range ? { min: values[0], max: values[1] } : { values };
      if (current) facets.current_type = current;
    } else if (/^\d+(?:\s*×\s*\d+){1,2}(?:\s*\/\s*\d+(?:\s*×\s*\d+){1,2})*\s*mm$/.test(value)) {
      facets.dimensions_mm = value.replace(/\s*mm$/, '').split('/').map(size => size.split('×').map(Number));
    } else if (/^(?:E\d+|B\d+D?|GU[\d.]+|G13)(?:\s*\/\s*(?:E\d+|B\d+D?|GU[\d.]+|G13))*$/.test(value)) {
      facets.base_options = value.split('/').map(base => base.trim());
    }
  }
  return facets;
}

assert.equal(new Set(data.products.map(p => p.id)).size, data.products.length, 'Duplicate series ID');
const series = data.products.map(p => {
  const category = byId.get(p.categoryId);
  assert.ok(category, 'Unknown category for ' + p.id);
  const categoryPath = '/products/' + category.slug;
  return {
    series_id: p.id, category_id: category.id, name: bilingual(p.titleEn, p.titleZh),
    description: bilingual(p.descEn, p.descZh),
    reference_spec: bilingual(p.spec, localizeSpec('zh-CN', p.spec)),
    reference_facets: referenceFacets(p.spec),
    configuration_notes: bilingual(p.variantsEn, p.variantsZh),
    page: localizedUrls(categoryPath + '#' + p.id),
    selection_guide: ['bulb-24v', 'flood-sensor'].includes(p.id) ? localizedUrls('/products/series/' + p.id) : null,
    inquiry: localizedUrls('/contact?product=' + category.id + '&context=series-' + p.id),
    primary_image: { url: site + p.image, role: p.applicationImage ? 'application_reference' : 'series_example' },
    gallery: p.gallery.map(g => ({ url: site + g.src, caption: bilingual(g.altEn, g.altZh) })),
  };
});
const catalogue = {
  schema_version: '1.0', brand: 'Scylla Lighting', record_level: 'product_series',
  quote_policy: {
    status: 'requires_supplier_confirmation', authorized_prices: [],
    confirm_with_buyer: ['selected_configuration', 'quantity', 'destination', 'packaging', 'required_documents', 'delivery_target'],
    confirm_with_sales: ['sku', 'unit_price', 'currency', 'quantity_breaks', 'MOQ', 'availability', 'lead_time', 'warranty', 'Incoterm_and_named_place', 'quotation_validity'],
  },
  categories: categories.map(c => ({
    category_id: c.id, name: bilingual(c.en, c.zh), description: categorySeo[c.id] ? bilingual(...categorySeo[c.id].description) : bilingual(c.descEn, c.descZh),
    applications: bilingual(c.useEn, c.useZh), reference_spec: bilingual(c.spec, localizeSpec('zh-CN', c.spec)),
    page: localizedUrls('/products/' + c.slug),
    scenes: data.scenes.filter(s => s.categoryId === c.id).map(s => ({ url: site + s.image, caption: bilingual(s.titleEn, s.titleZh) })),
  })),
  series,
};
const target = new URL('../data/scylla-catalogue.json', import.meta.url);
const temp = new URL('../data/scylla-catalogue.' + process.pid + '.tmp', import.meta.url);
await writeFile(temp, JSON.stringify(catalogue, null, 2) + '\n');
await rename(temp, target);
console.log(catalogue.categories.length + ' categories, ' + series.length + ' series');
