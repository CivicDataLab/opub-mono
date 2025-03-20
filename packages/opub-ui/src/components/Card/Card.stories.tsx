import type { Meta, StoryFn } from '@storybook/react';

import Card, { CardProps } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryFn<typeof Card>;

const Template: Story = (args: CardProps) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageUrl: 'https://justicehub.in/assets/khoj1.png',
  title:
    'Green Tagged Public Procurement Data related to Climate Action in Assam, India',
  description:
    'Researchers used procurement data and geospatial data to review public procurement and spending in Assam, India.',
  date: '19 July 2024',
  views: '500+',
  geography: 'India',
  sectorLogo: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
  publisherLogo: 'https://civicdatalab.in/cdl_logo.png',
  variation: 'Collapsed',
  tag: ['UseCase'],
  iconColor: 'warning',
};
