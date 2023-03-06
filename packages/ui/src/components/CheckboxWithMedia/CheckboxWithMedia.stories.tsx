import { Meta, StoryObj } from '@storybook/react';
import { Form } from '../Form';
import { CheckboxWithMedia } from './Checkbox';
import { PropsVariationSection } from '@ui/utils/helpers';

/**
 * A control that allows the user to toggle between checked and not checked.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/checkbox
 */
const meta = {
  component: CheckboxWithMedia,
} satisfies Meta<typeof CheckboxWithMedia>;

export default meta;

export const States = () => (
  <PropsVariationSection
    withFormik
    component={CheckboxWithMedia}
    common={{ children: 'Label' }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
      error: { error: true },
    }}
    yAxis={{
      Unchecked: {},
      Checked: { checked: true },
      Indeterminate: { checked: 'indeterminate' },
    }}
  />
);
