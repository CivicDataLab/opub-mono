import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { User } from '@opub-icons/workflow';

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
    name: 'Oluwayemisi Eun-Jung',
  },
};

export const CustomerMedium: Story = {
  args: {
    size: 'Medium',
    type: 'customer',
    image: 'public/user.svg',
  },
};

export const CustomerLarge: Story = {
  args: {
    size: 'Large',
    type: 'customer',
    image: 'public/user.svg',
  },
};

export const CustomerSmall: Story = {
  args: {
    size: 'Small',
    type: 'customer',
    image: 'public/user.svg',
  },
};

export const CustomerExtraSmall: Story = {
  args: {
    size: 'ExtraSmall',
    type: 'customer',
    image: 'public/user.svg',
  },
};

export const ProfilePictureMedium: Story = {
  args: {
    size: 'Medium',
    type: 'Profile_Customer',
    image: 'public/profile.svg',
  },
};

export const ProfilePictureLarge: Story = {
  args: {
    size: 'Large',
    type: 'Profile_Customer',
    image: 'public/profile.svg',
  },
};

export const ProfilePictureSmall: Story = {
  args: {
    size: 'Small',
    type: 'Profile_Customer',
    image: 'public/profile.svg',
  },
};

export const ProfilePictureExtraSmall: Story = {
  args: {
    size: 'ExtraSmall',
    type: 'Profile_Customer',
    image: 'public/profile.svg',
  },
};

export const LabeledAvatar: Story = {
  args: {
    size: 'Medium',
    type: 'initials',
    name: 'Oluwayemisi Eun-Jung',
    label: true,
  },
};
