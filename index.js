const fs = require('fs');
const lodash = require('lodash');
const translate = require('@iamtraction/google-translate');

async function main() {
  const args = process.argv;
  if (!args[2]) {
    console.error('执行命令: node index.js [文件名不带后缀]，如: node index.js sample');
    process.exit(0);
  }

  const current = args[2];
  const obj = {};
  const statistic = {};
  const originalJSON = require(`./${current}`);
  const arr = Object.keys(originalJSON);

  async function trans(text, k, idx) {
    const res = await translate(text, { to: 'en' });
    const result = lodash.upperFirst(res.text);
    console.log(`${idx}/${arr.length}`, result);
    obj[k] = result;
    statistic[k] = {
      seq: `${idx}/${arr.length}`,
      zh: text,
      en: result,
    };
    // 输出内容
    fs.writeFileSync(`./${current}_en.json`, Buffer.from(JSON.stringify(obj)));
    // 统计使用
    fs.writeFileSync(`./${current}_stat.json`, Buffer.from(JSON.stringify(statistic)));
  }

  for (let [idx, it] of arr.entries()) {
    let zh = originalJSON[it];
    await trans(zh, it, idx + 1);
  }
}

main();
