import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

/**
 * Avatars are used to show a thumbnail representation of an individual or business in the interface.
 *
 * Reference: https://polaris.shopify.com/components/images-and-icons/avatar
 */
const meta = {
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'Medium',
    type: 'initials',
    name: 'Oluwayemisi Eun-Jung',
  },
};

export const InitialLarge: Story = {
  args: {
    size: 'Large',
    type: 'initials',
    name: 'Oluwayemisi Eun-Jung',
  },
};

export const InitialSmall: Story = {
  args: {
    size: 'Small',
    type: 'initials',
    name: 'Oluwayemisi Eun-Jung',
  },
};

export const InitialExtraSmall: Story = {
  args: {
    size: 'ExtraSmall',
    type: 'initials',
  },
};

export const CustomerMedium: Story = {
  args: {
    size: 'Medium',
    type: 'customer',
  },
};

export const CustomerLarge: Story = {
  args: {
    size: 'Large',
    type: 'customer',
  },
};

export const CustomerSmall: Story = {
  args: {
    size: 'Small',
    type: 'customer',
  },
};

export const CustomerExtraSmall: Story = {
  args: {
    size: 'ExtraSmall',
    type: 'customer',
  },
};

export const ProfilePictureMedium: Story = {
  args: {
    size: 'Medium',
    type: 'customer',
    image: 'public/vite.svg',
  },
};

export const ProfilePictureLarge: Story = {
  args: {
    size: 'Large',
    type: 'customer',
    image: 'public/vite.svg',
  },
};

export const ProfilePictureSmall: Story = {
  args: {
    size: 'Small',
    type: 'customer',
    image: 'public/vite.svg',
  },
};

export const ProfilePictureExtraSmall: Story = {
  args: {
    size: 'ExtraSmall',
    type: 'customer',
    image: 'public/vite.svg',
  },
};

export const LabeledAvatar: Story = {
  args: {
    size: 'Medium',
    type: 'initials',
    label: true,
  },
};
