import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { TextField } from '../TextField';
import { FormLayout } from './FormLayout';

/**
 * Use form layout to arrange fields within a form using standard spacing. By
 *
 * Reference: https://polaris.shopify.com/components/layout-and-structure/form-layout
 */
const meta = {
  title: 'Components/FormLayout',
  component: FormLayout,
} satisfies Meta<typeof FormLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
        }}
      >
        <FormLayout>
          <TextField
            name="name1"
            label="Store name"
            onChange={() => {}}
            autoComplete="off"
          />
          <TextField
            type="email"
            name="name2"
            label="Account email"
            onChange={() => {}}
            autoComplete="email"
          />
          <Button submit>Submit</Button>
        </FormLayout>
      </form>
    );
  },
  args: {},
};

export const Group: Story = {
  render: () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
        }}
      >
        <FormLayout>
          <FormLayout.Group>
            <TextField
              type="number"
              name="number1"
              label="Minimum order"
              onChange={() => {}}
              autoComplete="off"
            />
            <TextField
              name="number2"
              type="number"
              label="Maximum order"
              onChange={() => {}}
              autoComplete="off"
            />
          </FormLayout.Group>
        </FormLayout>
      </form>
    );
  },
  args: {},
};

export const Condensed: Story = {
  render: () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
        }}
      >
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField
              name="abc-1"
              label="Length"
              onChange={() => {}}
              autoComplete="off"
            />
            <TextField
              name="abc-2"
              label="Width"
              onChange={() => {}}
              autoComplete="off"
            />
            <TextField
              name="abc-3"
              label="Height"
              onChange={() => {}}
              autoComplete="off"
            />
            <TextField
              name="abc-4"
              label="Unit"
              onChange={() => {}}
              autoComplete="off"
            />
          </FormLayout.Group>
        </FormLayout>
      </form>
    );
  },
  args: {},
};
