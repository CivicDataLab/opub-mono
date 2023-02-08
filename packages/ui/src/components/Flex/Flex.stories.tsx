import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flex } from './Flex';

export default {
  title: 'Components/Flex',
  component: Flex,
  argTypes: {
    children: {
      control: null,
      description: 'Children for Flex container',
    },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (props) => <Flex {...props} />;
export const Primary = Template.bind({});
Primary.args = {
  wrap: 'wrap',
  gap: 12,

  children: (
    <>
      <div
        style={{ backgroundColor: 'red', width: '150px', height: '150px' }}
      />
      <div
        style={{ backgroundColor: 'blue', width: '150px', height: '150px' }}
      />
    </>
  ),
};
