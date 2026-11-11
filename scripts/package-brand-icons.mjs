import { readFile, writeFile } from 'node:fs/promises';

// ICO supports embedded PNGs. Package the supplied files without resampling.
const entries = await Promise.all([32, 64].map(async size => ({
  size,
  png: await readFile(new URL('../public/brand/favicon-' + size + '.png', import.meta.url)),
})));
const header = Buffer.alloc(6 + entries.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(entries.length, 4);
let offset = header.length;
for (let i = 0; i < entries.length; i++) {
  const { size, png } = entries[i];
  const start = 6 + i * 16;
  header[start] = size;
  header[start + 1] = size;
  header.writeUInt16LE(1, start + 4);
  header.writeUInt16LE(32, start + 6);
  header.writeUInt32LE(png.length, start + 8);
  header.writeUInt32LE(offset, start + 12);
  offset += png.length;
}
await writeFile(new URL('../src/app/favicon.ico', import.meta.url), Buffer.concat([header, ...entries.map(e => e.png)]));
