import { Meta } from '@storybook/react';
import { Form } from '../Form';
import { TextArea } from './TextArea';

/**
 * TextAreas are multiline text inputs, useful for cases where users have a sizable amount of text to enter. They allow for all customizations that are available to text fields.
 */
export default {
  component: TextArea,
} as Meta<typeof TextArea>;

export const Primary = () => (
  <Form>
    <TextArea name="name" label="label" rows={4} />
  </Form>
);
