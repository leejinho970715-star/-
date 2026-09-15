const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert(!/faviog|favicon-generator|1OR2ymg7SXSJA9PBsSH4mOpVvsuBomlZ9/i.test(html));
assert.equal((html.match(/class="project"/g) || []).length, 9);
for (const match of html.matchAll(/(?:src|href|data-document)="(assets\/[^"]+)"/g)) {
  assert(fs.existsSync(path.join(root, match[1])), `Missing asset: ${match[1]}`);
}
for (const url of ['https://gpters-khaki.vercel.app/', 'https://n-seoul-main.vercel.app/intro.html', 'https://space-world-rosy.vercel.app/', 'https://synapse-labs-lmaw.vercel.app/', 'https://cloud-labs-brown.vercel.app/', 'https://n-seoul-tower.vercel.app/']) {
  assert(html.includes(`href="${url}"`), `Missing updated link: ${url}`);
}
for (const id of ['1Y1zDJps_9hbn9HsMFzslLdpoSL1ibTar', '1BS1de4a1T29yio-ib_vo8mzGgqly-SOj', '1F2LgAqJVbchIqUzNDiqAiSnE5XYNs1sI']) assert(html.includes(id));
const titles = [...html.matchAll(/<div class="project-copy reveal"><span>[^<]+<\/span><h3>([^<]+)<\/h3>/g)].map(m => m[1]);
assert.deepEqual(titles, ['LKBROTHERS','I-ONE Softbank','GPTers Renewal','N Seoul Tower','Space World','SYNAPSE LABS','CLOUD LABS','Airbnb Marketing','N서울타워 팀프로젝트']);
console.log('PASS: 9 projects, source order, updated links, local assets, no FAVIOG references.');
