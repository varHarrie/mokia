const fs = require('fs');
const path = require('path');
const http = require('http');

// @references: http://www.mca.gov.cn/article/sj/xzqh/1980/
const ZH_CN_REGIONS_URL = 'http://www.mca.gov.cn/article/sj/xzqh/2020/20201201.html';
const ZH_CN_REGIONS_FILE = path.resolve(__dirname, '../src/zhCN/regions.json');

async function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method: 'GET', timeout: 60000 }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.end();
  });
}

async function fetchZhCNRegions() {
  const html = await fetch(ZH_CN_REGIONS_URL);
  const list = [];
  const map = {};

  Array.from(html.matchAll(/<tr[^>]+>[\s\S]*?<\/tr>/g)).forEach((trResult, index) => {
    if (index < 3) return;

    const values = Array.from(trResult[0].matchAll(/<td[^>]+>([\s\S]*?)<\/td>/g)).map((tdResult) => tdResult[1]);
    const code = values[1]?.trim();
    const name = values[2]?.replace(/<span[^>]+>\s+<\/span>/g, '').trim();

    if (!code || !name) return;

    const region = { code, name };
    map[code] = region;

    // 省
    if (code.endsWith('0000')) {
      region.level = 0;
      list.push(region);
      return;
    }

    // 市
    if (code.endsWith('00')) {
      const province = map[`${code.slice(0, 2)}0000`];

      if (!province) return console.log('Parent not found:', code);
      if (!province.children) province.children = [];

      region.level = 1;
      province.children.push(region);
      return;
    }

    // 县
    const city = map[`${code.slice(0, 4)}00`] || map[`${code.slice(0, 2)}0000`];

    if (!city) return console.log('Parent not found:', code);
    if (!city.children) city.children = [];
    if (city.code.endsWith('0000')) city.level = 1;

    region.level = 2;
    city.children.push(region);
  });

  const json = JSON.stringify(list, undefined, 2);
  await fs.promises.writeFile(ZH_CN_REGIONS_FILE, json, 'utf-8');
}

fetchZhCNRegions();
