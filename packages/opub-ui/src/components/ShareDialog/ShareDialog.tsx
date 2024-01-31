import React from 'react';
import { IconShare, IconX } from '@tabler/icons-react';

import { cn } from '../../utils';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { Divider } from '../Divider';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Text } from '../Text';

type Props = {
  image?: string;
  alt: string;
  title: string;
  children: React.ReactNode;
  onDownload?: () => void;
  onOpen?: () => void;
  kind?: 'primary' | 'secondary' | 'tertiary';

  variant?: 'basic' | 'interactive' | 'critical' | 'success';

  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: 'slim' | 'medium' | 'large';

  /**
   * Custom class name for the wrapper
   */
  className?: string;

  /**
   * whether the image is loading
   */
  loading?: boolean;

  props?: {
    [key: string]: any;
  };
};

const ShareDialog = React.forwardRef(
  (
    {
      image,
      alt,
      onDownload,
      title,
      onOpen,
      children,
      kind = 'primary',
      variant = 'basic',
      size = 'slim',
      className,
      loading,
      props,
    }: Props,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);

    function handleOpen() {
      if (onOpen && !isOpen) {
        onOpen();
      }
      setIsOpen(!isOpen);
    }

    return (
      <div ref={ref} className={cn(className)}>
        <Dialog open={isOpen} onOpenChange={handleOpen}>
          <Dialog.Trigger>
            <Button
              icon={
                <Icon
                  source={IconShare}
                  size={14}
                  color={kind === 'primary' ? 'onBgDefault' : 'highlight'}
                />
              }
              kind={kind}
              variant={variant}
              size={size}
              onClick={() => setIsOpen(true)}
            >
              {children}
            </Button>
          </Dialog.Trigger>
          <Dialog.Content headerHidden title="Share" className="z-max">
            <div className="flex items-center justify-between gap-2">
              <Text variant="headingMd">{title}</Text>
              <IconButton
                onClick={() => setIsOpen(false)}
                size="slim"
                icon={IconX}
              >
                Close Dialog
              </IconButton>
            </div>
            <Divider className="my-2" />
            {image && !loading ? (
              <img
                src={image}
                alt={alt}
                width={768}
                height={384}
                {...props}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-[240px] w-full items-center justify-center">
                Loading Image...
              </div>
            )}
            <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
              <Button size="slim" kind="secondary" disabled>
                Share via
              </Button>
              <Button size="slim" kind="secondary" disabled>
                Embed
              </Button>
              <Button onClick={onDownload} size="slim">
                Download
              </Button>
            </div>
          </Dialog.Content>
        </Dialog>
      </div>
    );
  }
);

export { ShareDialog };
