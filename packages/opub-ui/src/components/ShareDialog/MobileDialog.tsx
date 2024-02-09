import React from 'react';
import {
  IconBrandWhatsapp,
  IconCode,
  IconCopy,
  IconDownload,
  IconLink,
  IconShare,
} from '@tabler/icons-react';
import { toast } from 'sonner';
import { useCopyToClipboard } from 'usehooks-ts';

import { IconSource } from '../../types/icon';
import { Button } from '../Button';
import { Divider } from '../Divider';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../Drawer/Drawer';
import { Icon } from '../Icon';
import { ScrollArea } from '../ScrollArea';
import { ScrollBar } from '../ScrollArea/ScrollArea';
import { Text } from '../Text';

export const MobileDialog = ({
  props,
}: {
  props: {
    size: 'slim' | 'medium' | 'large';
    image?: string;
    title: string;
    alt: string;
    loading?: boolean;
    onDownload?: () => void;
    shareActions: any;
    children: React.ReactNode;
    onOpen?: () => void;
    height: number;
    kind?: 'primary' | 'secondary' | 'tertiary';
    variant?: 'basic' | 'interactive' | 'critical' | 'success';
  };
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [_, copy] = useCopyToClipboard();

  const {
    size,
    image,
    alt,
    loading,
    onDownload,
    shareActions,
    onOpen,
    kind,
    variant,
  } = props;

  function handleOpen(e: boolean) {
    setIsOpen(e);
    if (onOpen && e) {
      onOpen();
    }
  }
  const shareList = [
    {
      content: 'Download',
      onAction: onDownload,
    },
    {
      content: 'Copy Link',
      onAction: () => {
        copy(window.location.href)
          .then(() => {
            toast('Current URL copied', {
              position: 'top-center',
              action: {
                label: 'cancel',
                onClick: () => {},
              },
            });
          })
          .catch(() => {
            toast.error('Error while copying URL', {
              position: 'top-center',
              action: {
                label: 'cancel',
                onClick: () => {},
              },
            });
          });
      },
    },
    ...shareActions,

    {
      content: 'Embed',
      onAction: () => {
        toast.error('Embed is currently not supported', {
          position: 'top-center',
          action: {
            label: 'cancel',
            onClick: () => {},
          },
        });
      },
    },
  ];

  const iconMap: {
    [key: string]: IconSource;
  } = {
    'Copy Image': IconCopy,
    'Copy Link': IconLink,
    Download: IconDownload,
    Share: IconShare,
    WhatsApp: IconBrandWhatsapp,
    Embed: IconCode,
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleOpen}>
      <DrawerTrigger asChild>
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
        >
          Share
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="px-4">
          <DrawerHeader>
            <DrawerTitle>Share Chart</DrawerTitle>
          </DrawerHeader>
          <Divider className="mb-4" />
          {image && !loading ? (
            <img
              src={image}
              alt={alt}
              width={768}
              height={props?.height || 384}
              className="max-h-[50svh] w-full overflow-auto object-contain"
            />
          ) : (
            <div
              style={{
                height: props?.height || 384,
                maxHeight: '50svh',
              }}
              className={`flex w-full items-center justify-center`}
            >
              Loading Image...
            </div>
          )}
        </div>
        <DrawerFooter className="border-t-1 border-solid border-borderSubdued p-0">
          <ScrollArea className="whitespace-nowrap px-2">
            <div className="flex w-max gap-2 px-2 py-4">
              {shareList.map((item, index) => (
                <SharButton
                  onAction={item.onAction}
                  key={index}
                  icon={iconMap[item.content]}
                >
                  {item.content}
                </SharButton>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const SharButton = ({
  children,
  icon,
  onAction,
}: {
  children: React.ReactNode;
  icon: IconSource;
  onAction?: () => void;
}) => {
  return (
    <button
      onClick={onAction}
      className="flex w-20 flex-col items-center gap-2 border-none bg-transparent active:[&>div]:scale-90"
    >
      <div className="transform rounded-full bg-surfaceHighlightDefault p-3 shadow-insetButton transition-transform duration-150">
        <Icon source={icon} color="highlight" size={16} />
      </div>
      <Text variant="bodySm">{children}</Text>
    </button>
  );
};
