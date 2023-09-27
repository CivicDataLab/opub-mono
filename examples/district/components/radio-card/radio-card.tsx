import styles from './radio-card.module.scss';
import { RadioItem } from 'opub-ui';
import { RadioItemProps } from 'opub-ui/dist/ts/components/RadioGroup/RadioGroup';
import { twMerge } from 'tailwind-merge';

export function RadioCard({ ...props }: RadioItemProps) {
  return (
    <RadioItem className={twMerge(styles.Item, 'inherit p-0')} {...props} />
  );
}
