import { TextProps, VariantFontWeightMapping } from '@ui/types/text';
import cx from 'classnames';
import styles from './Text.module.scss';

const Text = ({
  alignment,
  as,
  breakWord,
  children,
  color,
  fontWeight,
  id,
  numeric = false,
  truncate = false,
  variant,
  visuallyHidden = false,
}: TextProps) => {
  const Component = as || (visuallyHidden ? 'span' : 'p');

  const className = cx(
    styles.root,
    styles[variant],
    fontWeight ? styles[fontWeight] : styles[VariantFontWeightMapping[variant]],
    (alignment || truncate) && styles.block,
    alignment && styles[alignment],
    breakWord && styles.break,
    color && styles[color],
    numeric && styles.numeric,
    truncate && styles.truncate,
    visuallyHidden && styles.visuallyHidden
  );

  return (
    <Component className={className} {...(id && { id })}>
      {children}
    </Component>
  );
};

export { Text };
