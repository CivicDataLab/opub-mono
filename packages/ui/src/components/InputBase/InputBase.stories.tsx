import { ChevronDown, Circle } from '@opub-icons/workflow';
import { Meta } from '@storybook/react';
import { PropsVariationSection } from '@utils/helpers';
import { InputBase } from './InputBase';

export default {
  component: InputBase,

  argTypes: {
    validationState: {
      options: ['valid', 'invalid'],
      control: { type: 'select' },
      description: 'whether the state is `valid` or `invalid`',
    },
  },
} as Meta<typeof InputBase>;

export const Primary = {
  args: {
    label: 'Label Text',
  },
};

export const Required = {
  args: {
    label: 'Label Text',
    isRequired: true,
  },
};

export const Variations = () => {
  const variants = [
    {
      label: 'Default',
    },
    {
      label: 'Placeholder',
      placeholder: 'Placeholder Text',
    },
    {
      validationState: 'valid',
      label: 'Valid',
    },
    {
      validationState: 'invalid',
      label: 'Invalid',
    },
    {
      isDisabled: true,
      label: 'Disabled',
    },
  ];
  return (
    <>
      <h4 style={{ marginTop: '0' }}>Default</h4>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {variants.map((story: any, index) => (
          <InputBase key={index} {...story} />
        ))}
      </div>

      <hr style={{ marginTop: '20px' }} />
      <h4 style={{ marginBottom: '8px' }}>With Captions</h4>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {variants.map((story: any, index) => (
          <InputBase key={index} {...story} description="Caption" />
        ))}
      </div>
    </>
  );
};

export const ErrorMessage = {
  args: {
    label: 'With Error',
    defaultValue: 'abc@email.co',
    errorMessage: 'Wrong Email',
    isReadOnly: true,
  },
};

export const ReadOnly = {
  args: {
    label: 'Label',
    defaultValue: 'abc@email.com',
    isReadOnly: true,
  },
};

export const WithIcon = () => {
  const variants = [
    {
      label: 'Icon Start',
      iconStart: <Circle />,
    },
    {
      label: 'Icon End',
      iconEnd: <ChevronDown />,
    },
  ];
  return (
    <>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {variants.map((story: any, index) => (
          <InputBase key={index} {...story} />
        ))}
      </div>
    </>
  );
};

export const States = () => (
  <PropsVariationSection
    component={InputBase}
    common={{ onChange: () => {} }}
    xAxis={{
      default: {},
      'with placeholder': { placeholder: 'Placeholder' },
      'with value': { defaultValue: 'Value' },
      // 'with icon': { addon: <Icon name='edit' size='x20' />, value: 'Value' },
    }}
    yAxis={{
      default: {},
      hover: { className: 'hover' },
      // active: { className: 'active' },
      // focus: { className: 'focus' },
      // disabled: { disabled: true },
      // errored: { error: 'Error' },
      // 'errored + hover': { className: 'hover', error: 'Error' },
      // 'errored + active': { className: 'active', error: 'Error' },
      // 'errored + focus': { className: 'focus', error: 'Error' },
    }}
  />
);
