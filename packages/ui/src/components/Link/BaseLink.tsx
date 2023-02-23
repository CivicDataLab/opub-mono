import { forwardRef, memo } from 'react';

import { LinkLikeComponentProps, useLink } from '@ui/utils/link';
import { unstyled } from '../shared';

export interface UnstyledLinkProps extends LinkLikeComponentProps {}

export const UnstyledLink = memo(
  forwardRef<unknown, UnstyledLinkProps>(function UnstyledLink(props, _ref) {
    const LinkComponent = useLink();
    if (LinkComponent) {
      return <LinkComponent {...unstyled.props} {...props} />;
    }

    const { external, url, ...rest } = props;
    const target = external ? '_blank' : undefined;
    const rel = external ? 'noopener noreferrer' : undefined;
    return (
      <a target={target} {...rest} href={url} rel={rel} {...unstyled.props} />
    );
  })
);
