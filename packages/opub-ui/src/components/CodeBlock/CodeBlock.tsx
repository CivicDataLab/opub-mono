// Inspired by https://github.com/rexxars/react-refractor
import { CodeBlock as CodeBlockWrapper } from '@atlaskit/code';
import React from 'react';
import { CodeBlockProps } from '../../types';
import styles from './CodeBlock.module.scss';
import { CopyButton } from './components';

export const CodeBlock = (_props: CodeBlockProps) => {
  const [isNavigator, setIsNavigator] = React.useState(
    () => !!navigator.clipboard || false
  );
  const { language = 'js', ...props } = _props;

  return (
    <div className={styles.CodeBlock}>
      {isNavigator && <CopyButton code={props.text} />}
      <CodeBlockWrapper language={language} {...props} />
    </div>
  );
};
