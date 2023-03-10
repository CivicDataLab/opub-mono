import { LinkLikeComponentProps } from '@ui/types/link';
import { forwardRef, memo } from 'react';
import { useLink } from './helpers';

export interface UnstyledLinkProps extends LinkLikeComponentProps {}

export const UnstyledLink = memo(function UnstyledLink(
  props: UnstyledLinkProps
) {
  const LinkComponent = useLink();
  if (LinkComponent) {
    return <LinkComponent {...props} />;
  }

  const { external, url, ...rest } = props;
  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;
  return <a target={target} {...rest} href={url} rel={rel} />;
});
