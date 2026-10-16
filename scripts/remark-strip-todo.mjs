/**
 * remark 插件：把正文里以 `TODO` 开头的提示块从页面上摘掉。
 *
 * 为什么需要：
 *   每个 app 的 markdown 正文里都留了 `> TODO（待补充）…` 的占位块，
 *   提醒我们自己补内容。但如果直接渲染出去，访客和搜索引擎看到的
 *   就是"半成品外露"——既难看，也会被当成低质量内容。
 *
 * 做法：
 *   源文件（.md）保持原样，TODO 块继续留在仓库里当填写清单；
 *   只在构建产物里删掉这些块。
 *
 * 判定规则：块级节点递归取纯文本后，以 `TODO` / `TODO：` / `TODO:` 开头即删除。
 *
 * 关闭方式：把 astro.config.mjs 里 mdx() 的 remarkPlugins 去掉这一项即可。
 */

/** 递归取节点纯文本 */
function toText(node) {
  if (typeof node.value === 'string') return node.value;
  if (Array.isArray(node.children)) return node.children.map(toText).join('');
  return '';
}

const TODO_RE = /^TODO\s*[:：]?/i;

export function stripTodoBlocks() {
  return (tree) => {
    // 第一步：删掉所有以 TODO 开头的块
    const walk = (node) => {
      if (!Array.isArray(node.children)) return;
      node.children = node.children.filter((child) => {
        const text = toText(child).trim();
        return !TODO_RE.test(text);
      });
      for (const child of node.children) walk(child);
    };
    walk(tree);

    // 第二步：删掉「删完就空了」的标题
    // 典型场景：## 适合谁 下面只有一条 TODO 清单，
    // 删掉 TODO 后会剩一个没有内容的空标题，读起来像坏了。
    const dropEmptyHeadings = (node) => {
      if (!Array.isArray(node.children)) return;
      for (let i = node.children.length - 1; i >= 0; i--) {
        const child = node.children[i];
        if (child.type === 'heading') {
          const next = node.children[i + 1];
          if (!next || next.type === 'heading') {
            node.children.splice(i, 1);
          }
        }
        dropEmptyHeadings(child);
      }
    };
    dropEmptyHeadings(tree);
  };
}

export default stripTodoBlocks;
