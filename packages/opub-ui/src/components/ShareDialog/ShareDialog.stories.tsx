import { ShareDialog } from "./ShareDialog";
import { Meta, StoryObj } from "@storybook/react";

/**
 * ShareDialog component can be used to share/download/embed an image.
 */
const meta = {
  title: "Components/ShareDialog",
  component: ShareDialog,
} satisfies Meta<typeof ShareDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: "https://opub-www.vercel.app/og.png",
    alt: "visualisation",
    title: "Share Visualization",
    onDownload: () => {
      download("https://opub-www.vercel.app/og.png", "test");
    },
  },
};

const download = (url: RequestInfo | URL, name: string) => {
  if (!url) {
    throw new Error("Resource URL not provided");
  }
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobURL;
      a.download = name;
      document.body.appendChild(a);
      a.click();
    })
    .catch(() => {
      throw new Error("Error while downloading file");
    });
};
