import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { Divider } from "../Divider";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import { Text } from "../Text";
import { IconShare, IconX } from "@tabler/icons-react";
import React from "react";

type Props = {
  image: string;
  alt: string;
  title: string;
  onDownload?: () => void;
  onOpen?: () => void;
};

const ShareDialog = React.forwardRef(
  (
    { image, alt, onDownload, title, onOpen }: Props,
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
      <div ref={ref}>
        <Dialog open={isOpen} onOpenChange={handleOpen}>
          <Dialog.Trigger>
            <Button
              icon={<Icon source={IconShare} size={14} color="highlight" />}
              kind="secondary"
              onClick={() => setIsOpen(true)}
            >
              Share
            </Button>
          </Dialog.Trigger>
          <Dialog.Content headerHidden title="Share">
            <div className="flex items-center gap-2 justify-between">
              <Text variant="headingMd">{title}</Text>
              <IconButton
                onClick={() => setIsOpen(false)}
                size="slim"
                icon={IconX}
              >
                Close Dialog
              </IconButton>
            </div>
            <Divider className="mt-2" />
            <img
              src={image}
              alt={alt}
              width={768}
              height={384}
              className=" object-contain w-full h-96"
            />
            <div className="flex items-center gap-2 justify-end flex-wrap">
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
