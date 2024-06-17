# Google Translate Script

使用 Google 的 API，用来做国际化的文件机翻。

## Prerequisites

保证文件都在程序的根目录下。
待翻译文件格式: 如：**common.js**

```js
export default {
  btn: '按钮',
  reset: '重置',
};
```

**这里文件的导入方式需要修改为：`module.exports`**

## Usage

针对 **common.js** 文件，执行脚本:

```bash
node index.js common
```

然后会生成额外的两个文件：

- `common_en.json` 翻译后的英文语言文件。
- `common_stat.json` 带有执行序号、中英文的统计文件，用来做翻译结果校验。

## Attention

由于接口的调用限制，不能并行执行脚本，原因是来自同一 IP 地址的 API 调用，有等待限制，并不会因为脚本的并发而加快速度。
