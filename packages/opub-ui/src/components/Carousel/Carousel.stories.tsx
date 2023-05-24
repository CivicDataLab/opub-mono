import { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

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
    prevBtn: <IconArrowLeft/>,
    nextBtn: <IconArrowRight/>,
    label:"This is the carousel",
  },
};