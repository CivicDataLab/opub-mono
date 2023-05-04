import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { Tooltip } from '../../../Tooltip';
import styles from '../../CodeBlock.module.scss';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import React from 'react';

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
          icon={<Icon source={copied ? IconCheck : IconCopy} color="base" />}
          plain
        />
      </Tooltip>
    </div>
  );
};

export { CopyButton };
