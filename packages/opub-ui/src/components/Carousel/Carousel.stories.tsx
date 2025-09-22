import { Meta, StoryObj } from '@storybook/react-vite';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';

/**
 * Web carousels let you display text, graphics, images, and even video in one interactive, “sliding” block
 *
 * Reference: https://ui.shadcn.com/docs/components/carousel
 */

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="rounded-1 border-1 border-solid border-borderDefault p-1 shadow-basicFaint">
                <div className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  },
  args: {},
};
