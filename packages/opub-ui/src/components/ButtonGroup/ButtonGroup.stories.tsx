import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { ButtonGroup } from './ButtonGroup';

/**
 * Button group displays multiple related actions stacked or in a horizontal row to help with arrangement and spacing.
 *
 * Reference: https://polaris.shopify.com/components/actions/button-group
 */
const meta = {
  component: ButtonGroup,
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <ButtonGroup>
        <Button>Cancel</Button>
        <Button primary>Save</Button>
      </ButtonGroup>
    );
  },
  args: {},
};

export const Segmented: Story = {
  render: () => {
    return (
      <ButtonGroup segmented>
        <Button>Bold</Button>
        <Button>Italic</Button>
        <Button>Underline</Button>
      </ButtonGroup>
    );
  },
  args: {},
};

export const SegmentedOutline: Story = {
  render: () => {
    return (
      <ButtonGroup segmented>
        <Button outline>Bold</Button>
        <Button outline>Italic</Button>
        <Button outline>Underline</Button>
      </ButtonGroup>
    );
  },
  args: {},
};

export const NoWrap: Story = {
  render: () => {
    return (
      <>
        <p>Default (width: 300px)</p>
        <div
          style={{
            width: '300px',
            padding: '10px',
            overflowX: 'scroll',
          }}
        >
          <ButtonGroup>
            <Button>Fourth</Button>
            <Button>Third</Button>
            <Button>Second</Button>
            <Button primary>First</Button>
          </ButtonGroup>
        </div>
        <br />
        <p>With noWrap</p>
        <div
          style={{
            width: '300px',
            padding: '10px',
            overflowX: 'scroll',
          }}
        >
          <ButtonGroup noWrap>
            <Button>Fourth</Button>
            <Button>Third</Button>
            <Button>Second</Button>
            <Button primary>First</Button>
          </ButtonGroup>
        </div>
      </>
    );
  },
  args: {},
};
