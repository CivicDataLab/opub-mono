import React, { forwardRef } from 'react';

import { TextProps } from '../../types';
import { cn } from '../../utils';
import { Text } from '../Text';

const Kbd = forwardRef(
  (
    props: TextProps & React.HTMLAttributes<HTMLElement>,
    ref: React.LegacyRef<HTMLLegendElement>
  ) => {
    const { children, className, ...rest } = props;

    return (
      <Text
        as="kbd"
        {...rest}
        ref={ref}
        fontWeight="semibold"
        variant="bodySm"
        className={cn(
          'rounded-2 border-1 border-solid border-borderDefault px-1.5 py-1 text-75',
          className
        )}
      >
        {children}
      </Text>
    );
  }
);

export { Kbd };
