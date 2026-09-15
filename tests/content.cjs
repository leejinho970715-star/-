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
const directory = html.match(/<section class="internship-sites"[\s\S]*?<\/section>/)[0];
const archive = html.match(/<div class="archive reveal">[^\n]+/)[0];
assert(archive.includes('<span>KDT 프로젝트</span>'));
assert(archive.includes('KDT 개인 프로젝트 PDF'));
assert(archive.includes('N서울타워 팀프로젝트 결과보고서 PDF'));
assert(archive.includes('https://drive.google.com/file/d/1F2LgAqJVbchIqUzNDiqAiSnE5XYNs1sI/view?usp=sharing'));
assert.equal((archive.match(/<a /g)||[]).length, 2);
const directoryLinks = [...directory.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*><span><strong>([^<]+)<\/strong>/g)].map(m => [m[2],m[1]]);
assert.equal((directory.match(/data-og-image="https:\/\//g)||[]).length, 7);
assert.deepEqual(directoryLinks, [
  ['SPLA LABS', 'https://spla-labs.vercel.app/'],
  ['TODL', 'https://splalabs.xyz/todl'],
  ['엘케이브라더스', 'https://lkbrothers.vercel.app/'],
  ['AX/DX 레벨 체크리스트', 'https://axdx-test.vercel.app/'],
  ['아이원디지털웨어', 'https://digital-ware-two.vercel.app/'],
  ['아이원소프트뱅크', 'https://soft-bank-beta.vercel.app/'],
  ['이음스퀘어', 'https://eeumm.vercel.app/']
]);
assert(html.indexOf('class="internship-sites"') > html.indexOf('id="internship-work"'));
assert(html.indexOf('class="internship-sites"') < html.indexOf('id="personal-work"'));
console.log('PASS: 9 projects, 7 company directory links, source order, assets, no FAVIOG references.');
