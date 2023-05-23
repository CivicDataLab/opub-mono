import { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';

/**
 * Web carousels let you display text, graphics, images, and even video in one interactive, “sliding” block
 *
 * Reference: #
 */

const meta = {
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const svgIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="62"
    height="62"
    fill="none"
    viewBox="0 0 56 56"
    className="x"
  >
    <path
      fill="#fff"
      d="M56 28c0 15.464-12.536 28-28 28S0 43.464 0 28 12.536 0 28 0s28 12.536 28 28Z"
      opacity=".63"
    />
    <path
      fill="#000"
      d="M21 29h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L32.17 27H21c-.55 0-1 .45-1 1s.45 1 1 1Z"
    />
  </svg>
);

const carouselData = [
<ul>
  <li>
    Carousel Item 1
  </li>
</ul>,
<ul>
  <li>
    Carousel Item 2
  </li>
</ul>
]

export const Default: Story = {
  args: {
    children: carouselData,
    prevBtn: svgIcon,
    nextBtn: svgIcon,
    label:"This is the carousel",
  },
};