import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { Divider } from "../Divider";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import { Text } from "../Text";
import { IconShare, IconX } from "@tabler/icons-react";
import React from "react";

type Props = {
  image?: string;
  alt: string;
  title: string;
  children: React.ReactNode;
  onDownload?: () => void;
  onOpen?: () => void;
  kind?: "primary" | "secondary" | "tertiary";

  variant?: "basic" | "interactive" | "critical" | "success";

  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: "slim" | "medium" | "large";

  /**
   * Custom class name for the wrapper
   */
  className?: string;
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
      kind = "primary",
      variant = "basic",
      size = "slim",
      className,
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
      <div ref={ref} className={className}>
        <Dialog open={isOpen} onOpenChange={handleOpen}>
          <Dialog.Trigger>
            <Button
              icon={
                <Icon
                  source={IconShare}
                  size={14}
                  color={kind === "primary" ? "onBgDefault" : "highlight"}
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
            <Divider className="my-2" />
            {image ? (
              <img
                src={image}
                alt={alt}
                width={768}
                height={384}
                className="object-contain w-full h-96"
              />
            ) : (
              <div className="w-full h-20 flex items-center justify-center">
                Loading Image...
              </div>
            )}
            <div className="flex items-center gap-2 justify-end flex-wrap mt-4">
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
