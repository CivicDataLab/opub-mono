import { DuplicateMinor, TickMinor } from '@shopify/polaris-icons';
import React from 'react';
import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { Tooltip } from '../../../Tooltip';
import styles from '../../CodeBlock.module.scss';

interface Props {
  code: string;
}

const CopyButton = ({ code }: Props) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCopied(false);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [copied]);

  function handleClick() {
    navigator.clipboard.writeText(code);
    setCopied(true);
  }
  return (
    <div className={styles.Copy}>
      <Tooltip content={copied ? 'Copied' : 'Copy Code'} hideArrow>
        <Button
          onClick={handleClick}
          disabled={copied}
          icon={
            <Icon source={copied ? TickMinor : DuplicateMinor} color="base" />
          }
          plain
        />
      </Tooltip>
    </div>
  );
};

export { CopyButton };
