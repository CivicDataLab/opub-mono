'use client';

import type { LinkLikeComponentProps } from '../../types/link';
import { memo } from 'react';

export interface UnstyledLinkProps extends LinkLikeComponentProps {}

export const UnstyledLink = memo(function UnstyledLink(
  props: UnstyledLinkProps
) {
  const { external, url, ...rest } = props;
  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;
  return <a target={target} {...rest} href={url} rel={rel} />;
});
