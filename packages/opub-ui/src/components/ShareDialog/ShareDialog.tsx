import React from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { cn } from '../../utils';
import { useScreenshot } from '../Satori';
import { DesktopDialog } from './DesktopDialog';
import { MobileDialog } from './MobileDialog';

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
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const { copyToClipboard, shareImage, apiSupport } = useScreenshot();
    const isSupported = apiSupport();

    const shareActions: any = ['copyToClipboard', 'shareImage']
      .map((action: string) => {
        if (action === 'copyToClipboard' && isSupported[action]) {
          return {
            content: 'Copy Image',
            onAction: () => {
              copyToClipboard(
                image as string,
                'Image is copied to clipboard',
                isDesktop ? 'bottom-right' : 'top-center'
              );
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

    if (isDesktop) {
      return (
        <div ref={ref} className={cn(className)}>
          <DesktopDialog
            props={{
              size,
              image,
              title,
              alt,
              loading,
              onDownload,
              shareActions,
              children,
              onOpen,
              height: props?.height,
              kind,
              variant,
            }}
          />
        </div>
      );
    }
    return (
      <div ref={ref} className={cn(className)}>
        <MobileDialog
          props={{
            size,
            image,
            title,
            alt,
            loading,
            onDownload,
            shareActions,
            children,
            onOpen,
            height: props?.height,
            kind,
            variant,
          }}
        />
      </div>
    );
  }
);

export { ShareDialog };