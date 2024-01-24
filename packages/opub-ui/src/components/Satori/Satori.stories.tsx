import Card from "./Card";
import { MapExample } from "./MapExample";
import Satori from "./Satori";
import { Meta, StoryObj } from "@storybook/react";

/**
 * An utility to generate and download reports.
 *
 * Reference: https://github.com/vercel/satori
 */
const meta = {
  title: "Components/Satori",
  component: Satori,
} satisfies Meta<typeof Satori>;
export default meta;
type Story = StoryObj<typeof meta>;

const width = 1760;
const height = 800;

export const Default: Story = {
  args: {
    Component: Card,
    props: {
      width,
      height,
    },
  },
};

export const Map: Story = {
  args: {
    Component: MapExample,
  },
};
