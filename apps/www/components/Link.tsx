import NextLink, { LinkProps } from 'next/link';
import { Button } from '@opub-cdl/ui';
import { ButtonProps } from '@opub-cdl/ui/dist/ts/components/Button/Button';

interface Props extends ButtonProps {
  href: string;
}

export function LinkButton({ href, ...props }: Props) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Button {...props} url={href}>
        Add New Dataset
      </Button>
    </NextLink>
  );
}
