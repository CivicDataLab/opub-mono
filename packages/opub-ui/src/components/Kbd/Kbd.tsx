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
        fontWeight="medium"
        variant="bodySm"
        color="inherit"
        className={cn(
          'user-select-none text-secondary mx-0.5 inline-flex h-7 min-w-7 items-center justify-center rounded-1 border-1 border-solid border-borderDefault bg-backgroundSolidDefault px-2 text-center font-primary',
          className
        )}
      >
        {children}
      </Text>
    );
  }
);

export { Kbd };
