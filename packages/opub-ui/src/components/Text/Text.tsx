import { forwardRef } from 'react';

import { TextProps, VariantFontWeightMapping } from '../../types/text';
import { cn } from '../../utils';
import styles from './Text.module.scss';

const Text = forwardRef(
  (
    {
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
      ...rest
    }: TextProps & React.HTMLAttributes<HTMLElement>,
    ref: React.LegacyRef<HTMLLegendElement>
  ) => {
    const Component = as || (visuallyHidden ? 'span' : 'p');

    const style = cn(
      styles.root,
      styles[variant],
      fontWeight
        ? styles[fontWeight]
        : styles[VariantFontWeightMapping[variant]],
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
      <Component {...rest} ref={ref} className={style} {...(id && { id })}>
        {children}
      </Component>
    );
  }
);

export { Text };
