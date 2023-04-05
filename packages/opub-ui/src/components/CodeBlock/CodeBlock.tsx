// Inspired by https://github.com/rexxars/react-refractor
import { CodeBlock as CodeBlockWrapper } from '@atlaskit/code';
import { CodeBlockProps } from '../../types';
import styles from './CodeBlock.module.scss';

export const CodeBlock = (_props: CodeBlockProps) => {
  const { language = 'js', ...props } = _props;

  return (
    <div className={styles.CodeBlock}>
      <CodeBlockWrapper language={language} {...props} />
    </div>
  );
};
