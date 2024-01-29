import { ShareDialog } from "./ShareDialog";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

/**
 * ShareDialog component can be used to share/download/embed an image.
 */
const meta = {
  title: "Components/ShareDialog",
  component: ShareDialog,
} satisfies Meta<typeof ShareDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const image = "https://opub-www.vercel.app/og.png";
const alt = "visualisation";

export const Default: Story = {
  render: (args) => {
    const [blob, setBlob] = React.useState<Blob>();

    async function onOpen(image: RequestInfo | URL) {
      fetch(image)
        .then((response) => response.blob())
        .then(async (blob) => {
          console.log(blob);
          await navigator.clipboard
            .write([
              new ClipboardItem({
                [blob.type]: blob,
              }),
            ])
            .then(() => {
              console.log("Copied image to clipboard.");
            })
            .catch((error) => {
              console.log(error);
            });
          setBlob(blob);
        })
        .catch(() => {
          throw new Error("Error while generating Blob");
        });
    }

    const download = (blob: Blob | MediaSource | undefined, name: string) => {
      if (!blob) {
        throw new Error("Blob is undefined");
      }
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobURL;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    return (
      <div className="flex flex-col gap-2 items-center">
        <img
          src={image}
          alt={alt}
          width={768}
          height={384}
          className="object-contain w-full h-96"
        />
        <ShareDialog
          {...args}
          onOpen={() => onOpen(image)}
          onDownload={() => download(blob, "test")}
        />
      </div>
    );
  },
  args: {
    image,
    alt,
    title: "Share Visualization",
  },
};
