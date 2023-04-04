// Inspired by https://github.com/rexxars/react-refractor
import cx from 'classnames';
import { toHtml } from 'hast-util-to-html';
import rangeParser from 'parse-numeric-range';
import React from 'react';
import { refractor } from 'refractor';
import bash from 'refractor/lang/bash';
import css from 'refractor/lang/css';
import diff from 'refractor/lang/diff';
import js from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import { highlightLineCode } from '../../utils/rehype-highlight-line';
import { highlightLineWord } from '../../utils/rehype-highlight-word';
import { Pre } from './Pre';
import './CodeBlock.scss';

refractor.register(js);
refractor.register(jsx);
refractor.register(bash);
refractor.register(css);
refractor.register(diff);

type PreProps = Omit<React.ComponentProps<typeof Pre>, 'css' | 'children'>;

type CodeBlockProps = PreProps & {
  language: 'js' | 'jsx' | 'bash' | 'css' | 'diff';
  value: string;
  line?: string;
  showLineNumbers?: boolean;
};

export const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  (_props, forwardedRef) => {
    const {
      language = 'js',
      value,
      line = '0',
      className = '',
      variant = 'violet',
      showLineNumbers,
      ...props
    } = _props;
    let result: any = refractor.highlight(value, language);

    result = highlightLineCode(result, rangeParser(line));
    result = highlightLineWord(result);

    // convert to html
    result = toHtml(result);

    const classes = cx(className && className, `language-${language}`);

    return (
      <Pre
        ref={forwardedRef}
        variant={variant}
        data-line-numbers={showLineNumbers}
        {...props}
      >
        <code
          className={classes}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </Pre>
    );
  }
);
