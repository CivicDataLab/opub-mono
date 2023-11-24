import { DividerProps } from '../../types/divider';
import { cn } from '../../utils';
import styles from './Divider.module.scss';

export const Divider = ({ className, direction }: DividerProps) => {
  const style = cn(styles.Divider, className, direction && styles[direction]);

  return <hr className={style} />;
};
