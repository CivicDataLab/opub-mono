import { RadioItem } from '@opub-cdl/ui';
import { RadioItemProps } from '@opub-cdl/ui/dist/ts/components/RadioGroup/RadioGroup';

import styles from './radio-card.module.scss';

export function RadioCard({ ...props }: RadioItemProps) {
  return <RadioItem className={styles.Item} {...props} />;
}
