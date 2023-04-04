import { toHtml } from 'hast-util-to-html';
import { unified } from 'unified';
import parse from 'rehype-parse';

const CALLOUT = /__(.*?)__/g;

export const highlightLineWord = (code: any) => {
  const html = toHtml(code);
  const result = html.replace(
    CALLOUT,
    (_, text) => `<span class="highlight-word">${text}</span>`
  );
  const hast = unified()
    .use(parse, { emitParseErrors: true, fragment: true })
    .parse(result);
  return hast.children;
};
