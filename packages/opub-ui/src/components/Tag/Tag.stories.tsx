import { Meta, StoryObj } from '@storybook/react-vite';
import { IconSun } from '@tabler/icons-react';

import { PropsVariationSection } from '../../utils/storybook';
import { Icon } from '../Icon';
import Tag from './Tag';

/**
 * Tag represent a set of interactive keywords that help label, organize, and categorize objects
 *
 * Reference: https://polaris.shopify.com/components/selection-and-input/tag
 */
const meta = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    variation: {
      options: ['filled', 'outlined'],
      control: { type: 'radio' },
    },
    textColor: {
      control: 'color',
    },
    borderColor: {
      control: 'color',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tag',
  },
  parameters: { pseudo: { focus: true } },
};

export const Long: Story = {
  ...Default,
  args: {
    onRemove: () => {},
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at ipsumquam. Aliquam fermentum bibendum vestibulum. Vestibulum condimentum luctusmetus, sed sagittis magna pellentesque eget. Duis dapibus pretium nisi, etvenenatis tortor dignissim ut. Quisque eget lacus ac ex eleifend ultrices.Phasellus facilisis ex sit amet leo elementum condimentum. Ut vel maximusfelis. Etiam eget diam eu eros blandit interdum. Sed eu metus sed justoaliquam iaculis ac sit amet ex. Curabitur justo magna, porttitor nonpulvinar eu, malesuada at leo. Cras mollis consectetur eros, quis maximuslorem dignissim at. Proin in rhoncus massa. Vivamus lectus nunc, fringillaeuismod risus commodo, mattis blandit nulla.',
  },
};

export const TagVariations = () => (
  <div className="flex gap-2">
    <Tag variation="filled">Filled Tag</Tag>
    <Tag variation="outlined">Outlined Tag</Tag>
    <Tag variation="outlined" textColor="#0066CC" borderColor="#FF6B00">
      Custom Colors
    </Tag>
    <Tag
      variation="filled"
      fillColor="#002a7f"
      textColor="#ffffff"
      borderColor="#f18100"
    >
      Custom Tag
    </Tag>
  </div>
);

export const States = () => (
  <PropsVariationSection
    component={Tag}
    common={{ children: 'Tags' }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
      'custom children': {
        children: (
          <div className="flex items-center gap-1">
            <Icon source={IconSun} />
            <span>Sun is up</span>
          </div>
        ),
      },
    }}
    yAxis={{
      default: {},
      'with remove': {
        onRemove: () => {
          console.log('Remove triggered');
        },
      },
      'with click': {
        onClick: () => {
          console.log('Remove triggered');
        },
      },
      'with link': {
        url: '#',
      },
      'removable with link': {
        url: '#',
        onRemove: () => {
          console.log('Remove triggered');
        },
      },
    }}
  />
);
