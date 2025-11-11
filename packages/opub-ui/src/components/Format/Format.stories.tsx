import type { Meta, StoryObj } from '@storybook/react-vite';

import { Format } from './index';

const meta = {
  title: 'Components/Format',
  component: Format,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    fileType: {
      control: 'select',
      options: ['CSV', 'PDF', 'XLS', 'XLSX', 'JSON', 'DOC', 'DOCX'],
    },
    width: {
      control: { type: 'range', min: 20, max: 100, step: 2 },
    },
  },
} satisfies Meta<typeof Format>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fileType: 'CSV',
    width: 38,
  },
};

export const AllFormats = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Format fileType="CSV" />
    <Format fileType="PDF" />
    <Format fileType="XLS" />
    <Format fileType="JSON" />
    <Format fileType="DOC" />
  </div>
);

export const DifferentSizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Format fileType="PDF" width={24} />
    <Format fileType="PDF" width={38} />
    <Format fileType="PDF" width={48} />
    <Format fileType="PDF" width={64} />
  </div>
);
