import { PropsVariationSection } from '../../utils';
import { Avatar } from './Avatar';
import { Meta, StoryObj } from '@storybook/react';

/**
 * Avatars are used to show a thumbnail representation of an individual or business in the interface.
 *
 * Reference: https://polaris.shopify.com/components/images-and-icons/avatar
 */
const meta = {
  title: 'Verified/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = () => (
  <PropsVariationSection
    component={Avatar}
    common={{}}
    xAxis={{
      ExtraSmall: {
        size: 'extraSmall',
      },
      Small: {
        size: 'small',
      },
      Medium: {
        size: 'medium',
      },
      Large: {
        size: 'large',
      },
    }}
    yAxis={{
      ' Initials': {
        name: 'Oluwayemisi Eun-Jung',
      },
      Customers: {
        image: '/user.svg',
      },
      ' Profile Picture  ': {
        showInitials: true,
        image: '/profile.svg',
      },
    }}
  />
);

export const LabeledAvatar: Story = {
  args: {
    size: 'medium',
    name: 'Oluwayemisi Eun-Jung',
    showLabel: true,
  },
};
