import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { User } from '@opub-icons/workflow';
import { PropsVariationSection } from '@ui/utils/helpers';

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
      Default: {},
    }}
    yAxis={{
      'Extra small + Initials': {
        size: 'ExtraSmall',
        type: 'initials',
        name: 'Oluwayemisi Eun-Jung',
      },
      'Small + Initials': {
        size: 'Small',
        type: 'initials',
        name: 'Oluwayemisi Eun-Jung',
      },
      'Medium + Initials': {
        size: 'Medium',
        type: 'initials',
        name: 'Oluwayemisi Eun-Jung',
      },
      'Large + Initials': {
        size: 'Large',
        type: 'initials',
        name: 'Oluwayemisi Eun-Jung',
      },
      'Extra small + customer': {
        size: 'ExtraSmall',
        type: 'customer',
        image: 'public/user.svg',
      },
      'Small + customer': {
        size: 'Small',
        type: 'customer',
        image: 'public/user.svg',
      },
      'Medium + customer': {
        size: 'Medium',
        type: 'customer',
        image: 'public/user.svg',
      },
      'Large + customer': {
        size: 'Large',
        type: 'customer',
        image: 'public/user.svg',
      },
      'ExtraSmall + Profile Picture + customer ': {
        size: 'ExtraSmall',
        type: 'Profile_Customer',
        image: 'public/profile.svg',
      },
      'Small + Profile Picture + customer ': {
        size: 'Small',
        type: 'Profile_Customer',
        image: 'public/profile.svg',
      },

      'Medium + Profile Picture + customer ': {
        size: 'Medium',
        type: 'Profile_Customer',
        image: 'public/profile.svg',
      },
      'Large + Profile Picture + customer ': {
        size: 'Large',
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
