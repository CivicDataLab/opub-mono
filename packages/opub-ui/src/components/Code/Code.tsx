'use client';

import { Code as CodeWrapper } from '@atlaskit/code';
import React, { forwardRef } from 'react';

type Props = {
  // Content to be rendered in the inline code block.
  children: React.ReactNode;
  // classname to be applied to the inline code block.
  className?: string;
};

const Code = forwardRef((props: Props, ref: any) => {
  const { children, ...others } = props;

  return (
    <span ref={ref} {...others}>
      <CodeWrapper>{children}</CodeWrapper>
    </span>
  );
});

export { Code };
