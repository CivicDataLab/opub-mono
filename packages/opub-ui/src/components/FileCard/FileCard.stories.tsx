import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '../Text';
import { toast } from '../Toast';
import { Tray } from '../Tray';
import { FileCard } from './FileCard';

/**
 * A compact card for an uploaded file: name, type, metadata, status,
 * and optional rename / preview / delete actions. Preview is a callback
 * so the parent can open a tray, dialog, or any other surface.
 */
const meta = {
  title: 'Components/FileCard',
  component: FileCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    name: 'Climate Risk Indicators 2025',
    format: 'CSV',
    size: '2.0MB',
    uploadedAt: '10/08/2026 17:30:00',
    originalName: 'climate_risk_indicators_2025.csv',
    status: 'ready',
  },
  argTypes: {
    onRename: { control: false },
    onView: { control: false },
    onDelete: { control: false },
    className: { control: false },
  },
} satisfies Meta<typeof FileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [name, setName] = useState(args.name);
    const [open, setOpen] = useState(false);

    return (
      <>
        <FileCard
          {...args}
          name={name}
          onRename={setName}
          onView={() => setOpen(true)}
          onDelete={() => toast('File deleted')}
        />
        <Tray
          open={open}
          onOpenChange={setOpen}
          trigger={<span />}
          size="medium"
        >
          <div style={{ padding: '16px 0', display: 'grid', gap: 8 }}>
            <Text as="p" variant="headingMd">
              {name}
            </Text>
            <Text as="p" variant="bodyMd" color="subdued">
              Preview is rendered by the parent. This story uses a Tray; swap
              it for a Dialog or a route if that fits the product better.
            </Text>
          </div>
        </Tray>
      </>
    );
  },
};

export const ReadOnly: Story = {};

export const Statuses: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <FileCard {...args} status="ready" />
      <FileCard
        {...args}
        name="Household Survey Wave 3"
        format="XLSX"
        status="processing"
        onView={() => {}}
        onDelete={() => {}}
      />
      <FileCard
        {...args}
        name="Invalid schema dump"
        format="JSON"
        status="error"
        statusLabel="Failed"
        onRename={() => {}}
        onDelete={() => toast('File deleted')}
      />
    </div>
  ),
};
