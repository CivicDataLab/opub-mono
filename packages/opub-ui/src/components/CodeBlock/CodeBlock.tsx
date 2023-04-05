// Inspired by https://github.com/rexxars/react-refractor
import { CodeBlock as CodeBlockWrapper } from '@atlaskit/code';
import React from 'react';
import { CodeBlockProps } from '../../types';
import styles from './CodeBlock.module.scss';
import { Collapse, CopyButton } from './components';

export const CodeBlock = (_props: CodeBlockProps) => {
  const [isNavigator, setIsNavigator] = React.useState<boolean>();
  const { language = 'js', collapse = false, ...props } = _props;

  React.useEffect(() => {
    if (window.navigator.clipboard) setIsNavigator(true);
  }, []);

  return (
    <div className={styles.CodeBlock}>
      <Collapse>
        {isNavigator && <CopyButton code={props.text} />}
        <CodeBlockWrapper language={language} {...props} />
      </Collapse>
    </div>
  );
};
