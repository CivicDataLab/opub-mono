import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { PropsVariationSection } from '../../utils';

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

export const Basic = () => (
  <PropsVariationSection
    component={Avatar}
    common={{}}
    xAxis={{
      ExtraSmall: {
        size: 'ExtraSmall',
      },
      Small: {
        size: 'Small',
      },
      Medium: {
        size: 'Medium',
      },
      Large: {
        size: 'Large',
      },
    }}
    yAxis={{
      ' Initials': {
        type: 'initials',
        name: 'Oluwayemisi Eun-Jung',
      },
      Customers: {
        type: 'customer',
        image: 'public/user.svg',
      },
      ' Profile Picture  ': {
        type: 'Profile_Customer',
        image: 'public/profile.svg',
      },
    }}
  />
);

export const LabeledAvatar: Story = {
  args: {
    size: 'Medium',
    type: 'initials',
    name: 'Oluwayemisi Eun-Jung',
    label: true,
  },
};
