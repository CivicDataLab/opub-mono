import React from 'react';
import { IconShare } from '@tabler/icons-react';

import { cn } from '../../utils';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { Divider } from '../Divider';
import { Icon } from '../Icon';
import { useScreenshot } from '../Satori';

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
      alt = '',
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
    const { copyToClipboard, shareImage, apiSupport } = useScreenshot();
    const isSupported = apiSupport();

    const shareActions: any = ['copyToClipboard', 'shareImage']
      .map((action: string) => {
        if (action === 'copyToClipboard' && isSupported[action]) {
          return {
            content: 'Copy Image',
            onAction: () => {
              copyToClipboard(image as string, 'Image is copied to clipboard');
            },
          };
        }
        if (action === 'shareImage' && isSupported[action]) {
          return {
            content: 'Share',
            onAction: () => {
              shareImage(image as string);
            },
          };
        }
        return null;
      })
      .filter(Boolean);

    function handleOpen(e: boolean) {
      setIsOpen(e);
      if (onOpen && e) {
        onOpen();
      }
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
          <Dialog.Content title={title} className="z-max mt-[-20px]">
            <Divider className="mb-2" />
            {image && !loading ? (
              <img
                src={image}
                alt={alt}
                width={768}
                height={props?.height || 384}
                {...props}
                className="h-full w-full overflow-auto object-contain"
              />
            ) : (
              <div
                style={{
                  height: props?.height || 384,
                }}
                className={`flex w-full items-center justify-center`}
              >
                Loading Image...
              </div>
            )}
            <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
              <Button size="slim" kind="secondary" disabled>
                Embed
              </Button>
              <Button
                onClick={onDownload}
                size="slim"
                connectedDisclosure={{
                  actions: shareActions,
                }}
              >
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
