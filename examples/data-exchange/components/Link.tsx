import NextLink from 'next/link';
import { Button, ButtonProps } from 'opub-ui';

interface Props extends ButtonProps {
  href: string;
}

export function LinkButton({
  href,
  children = 'Add New Dataset',
  ...props
}: Props) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Button {...props} url={href}>
        {children}
      </Button>
    </NextLink>
  );
}
