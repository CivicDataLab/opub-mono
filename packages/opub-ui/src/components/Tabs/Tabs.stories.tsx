import { Meta, StoryObj } from '@storybook/react';

import { Tab, TabList, TabPanel, Tabs } from './Tabs';

/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/tabs
 */
const meta = {
  title: 'Components/Tabs',
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
            <div className="p-5">1</div>
          </TabPanel>
          <TabPanel value="2">
            <div className="p-5">2</div>
          </TabPanel>
          <TabPanel value="3">
            <div className="p-5">3</div>
          </TabPanel>
        </Tabs>
      </>
    );
  },
  args: {},
};

export const GreenTheme: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Tabs defaultValue="1" {...args}>
          <TabList fitted>
            <Tab theme="climate" value="1">
              Tab Name 1
            </Tab>
            <Tab theme="climate" value="2">
              Tab Name 2
            </Tab>
            <Tab theme="climate" value="3">
              Tab Name 3
            </Tab>
          </TabList>
          <TabPanel value="1">
            <div className="p-5">1</div>
          </TabPanel>
          <TabPanel value="2">
            <div className="p-5">2</div>
          </TabPanel>
          <TabPanel value="3">
            <div className="p-5">3</div>
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
            <div className="p-5">1</div>
          </TabPanel>
          <TabPanel value="2">
            <div className="p-5">2</div>
          </TabPanel>
          <TabPanel value="3">
            <div className="p-5">3</div>
          </TabPanel>
        </Tabs>
      </>
    );
  },
  args: {},
};

export const WithoutBorder: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Tabs defaultValue="1" {...args}>
          <TabList>
            <Tab activeBorder={false} value="1">
              Tab Name 1
            </Tab>
            <Tab activeBorder={false} value="2">
              Tab Name 2
            </Tab>
            <Tab activeBorder={false} value="3">
              Tab Name 3
            </Tab>
          </TabList>
          <TabPanel value="1">
            <div className="p-5">1</div>
          </TabPanel>
          <TabPanel value="2">
            <div className="p-5">2</div>
          </TabPanel>
          <TabPanel value="3">
            <div className="p-5">3</div>
          </TabPanel>
        </Tabs>
      </>
    );
  },
  args: {},
};
