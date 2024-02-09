import React from 'react';
import { IconShare } from '@tabler/icons-react';
import { Controlled as Zoom } from 'react-medium-image-zoom';

import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { Divider } from '../Divider';
import { Icon } from '../Icon';

export const DesktopDialog = ({
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
  const [lockDialog, setLockDialog] = React.useState(false);
  const [zoom, setZoom] = React.useState(false);

  const {
    size,
    image,
    title,
    alt,
    loading,
    onDownload,
    shareActions,
    children,
    onOpen,
    height,
    kind,
    variant,
  } = props;

  function handleOpen(e: boolean) {
    setIsOpen(e);
    if (onOpen && e) {
      onOpen();
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        if (lockDialog) {
          setZoom(false);
          setLockDialog(false);
        } else {
          handleOpen(e);
        }
      }}
    >
      <Dialog.Trigger>
        <Button
          size={size}
          kind={kind}
          variant={variant}
          onClick={() => setIsOpen(true)}
          icon={
            <Icon
              source={IconShare}
              size={14}
              color={kind === 'primary' ? 'onBgDefault' : 'highlight'}
            />
          }
        >
          {children}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content title={title} className="z-max mt-[-20px]">
        <Divider className="mb-2" />
        {image && !loading ? (
          <Zoom
            zoomMargin={40}
            isZoomed={zoom}
            onZoomChange={(e) => {
              setZoom(e);
              setLockDialog(e);
            }}
            classDialog="[&_img]:select-none"
          >
            <img
              src={image}
              alt={alt}
              width={768}
              height={height || 384}
              className="h-full w-full  overflow-auto object-contain"
            />
          </Zoom>
        ) : (
          <div
            style={{
              height: height || 384,
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
  );
};
