import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';
import { Meta, StoryObj } from '@storybook/react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

/**
 * Web carousels let you display text, graphics, images, and even video in one interactive, “sliding” block
 *
 * Reference: https://ui.shadcn.com/docs/components/carousel
 */

const meta = {
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
              <div className="p-1 border-borderDefault border-1 border-solid shadow-basicFaint rounded-1">
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
