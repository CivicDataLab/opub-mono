import { ShareDialog } from "./ShareDialog";
import { Meta, StoryObj } from "@storybook/react";

/**
 * ShareDialog Description
 *
 * Reference: #
 */
const meta = {
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
      downloadImg({
        url: "https://opub-www.vercel.app/og.png",
        name: "test.png",
      });
    },
  },
};

function downloadImg({ url, name }: { url: string; name: string }) {
  var link = document.createElement("a");
  link.download = name;
  link.href = url;
  link.click();
  link.remove();
}
