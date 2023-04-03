import { AppsMinor } from '@shopify/polaris-icons';
import { Meta, StoryObj } from '@storybook/react';
import { PropsVariationSection } from '../../utils/helpers';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { Tag } from './Tag';

/**
 * Tag represent a set of interactive keywords that help label, organize, and categorize objects
 *
 * Reference: https://polaris.shopify.com/components/selection-and-input/tag
 */
const meta = {
  component: Tag,
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

export const Colors = () => (
  <PropsVariationSection
    component={Tag}
    common={{ children: 'Tag' }}
    xAxis={{
      colors: {},
    }}
    yAxis={{
      standard: {},
      one: {
        color: 'one',
      },
      two: {
        color: 'two',
      },
      three: {
        color: 'three',
      },
      four: {
        color: 'four',
      },
      five: {
        color: 'five',
      },
    }}
  />
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
          <Flex alignItems="center" gap={4}>
            <Icon source={AppsMinor} />
            <span>Sun is up</span>
          </Flex>
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
