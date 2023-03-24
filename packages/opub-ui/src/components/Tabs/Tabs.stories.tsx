import { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/tabs
 */
const meta = {
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Tabs defaultValue="1" {...args}>
          <TabList>
            <Tab value="1">Tab Name 1</Tab>
            <Tab value="2">Tab Name 2</Tab>
            <Tab value="3">Tab Name 3</Tab>
          </TabList>
          <TabPanel value="1">
            <Box padding="5">1</Box>
          </TabPanel>
          <TabPanel value="2">
            <Box padding="5">2</Box>
          </TabPanel>
          <TabPanel value="3">
            <Box padding="5">3</Box>
          </TabPanel>
        </Tabs>
      </>
    );
  },
  args: {},
};

export const Fitted: Story = {
  render: () => {
    return (
      <>
        <Tabs defaultValue="1">
          <TabList fitted>
            <Tab value="1">Tab 1</Tab>
            <Tab value="2">Tab 2</Tab>
            <Tab value="3">Tab 3</Tab>
          </TabList>
          <TabPanel value="1">
            <Box padding="5">1</Box>
          </TabPanel>
          <TabPanel value="2">
            <Box padding="5">2</Box>
          </TabPanel>
          <TabPanel value="3">
            <Box padding="5">3</Box>
          </TabPanel>
        </Tabs>
      </>
    );
  },
  args: {},
};
