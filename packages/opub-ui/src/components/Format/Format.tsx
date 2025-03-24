import { IconFileFilled } from '@tabler/icons-react';

import { cn } from '../../utils';
import { Text } from '../Text';
import styles from './Format.module.scss';

export interface FormatProps {
  /** Type of the file (e.g. 'CSV', 'PDF', 'XLS') */
  fileType: string;
  /** Width of the format icon */
  width?: number;
}

const Format = ({ fileType, width = 38 }: FormatProps) => {
  const type = fileType.toUpperCase();

  return (
    <div className={cn(styles.Format)}>
      <div className={styles.IconWrapper} style={{ width, height: width }}>
        <IconFileFilled
          size={width}
          className={cn(styles.FileIcon, styles[type.toLowerCase()])}
        />
        <Text
          variant="bodySm"
          className={styles.FileType}
          style={{ fontSize: `${width / 4.75}px` }}
        >
          {type}
        </Text>
      </div>
    </div>
  );
};

export default Format;
