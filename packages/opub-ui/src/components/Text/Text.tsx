import { TextProps, VariantFontWeightMapping } from '../../types/text';
import styles from './Text.module.scss';
import cx from 'classnames';

const Text = ({
  alignment,
  as = 'span',
  breakWord,
  noBreak,
  children,
  color,
  fontWeight,
  id,
  numeric = false,
  truncate = false,
  variant = 'bodyMd',
  visuallyHidden = false,
  className,
}: TextProps) => {
  const Component = as || (visuallyHidden ? 'span' : 'p');

  const style = cx(
    styles.root,
    styles[variant],
    fontWeight ? styles[fontWeight] : styles[VariantFontWeightMapping[variant]],
    (alignment || truncate) && styles.block,
    alignment && styles[alignment],
    breakWord && styles.break,
    noBreak && styles.noBreak,
    color && styles[color],
    numeric && styles.numeric,
    truncate && styles.truncate,
    visuallyHidden && styles.visuallyHidden,
    className
  );

  return (
    <Component className={style} {...(id && { id })}>
      {children}
    </Component>
  );
};

export { Text };
