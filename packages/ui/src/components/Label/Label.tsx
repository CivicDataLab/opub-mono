import React from 'react';
import * as LabelRadix from '@radix-ui/react-label';

type LabelProps = React.ComponentProps<typeof LabelRadix.Root> & {};

const Label = React.forwardRef<
  React.ElementRef<typeof LabelRadix.Root>,
  LabelProps
>(({ children, ...props }: LabelProps) => (
  <LabelRadix.Root {...props}>{children}</LabelRadix.Root>
));

export { Label };
