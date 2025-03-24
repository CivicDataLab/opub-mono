import type { Meta, StoryFn } from '@storybook/react';
import {
  IconCalendarEvent,
  IconDownload,
  IconWorld,
} from '@tabler/icons-react';

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
    'Natural and man-made environmental resources – fresh water, clean air, forests, grasslands, marine resources, and agro-ecosystems – provide sustenance and a foundation for social and economic development. The need to safeguard these resources crosses all borders.',
  metadataContent: [
    {
      icon: IconCalendarEvent,
      label: 'Date',
      value: '19 July 2024',
    },
    {
      icon: IconDownload,
      label: 'Download',
      value: '500',
    },
    {
      icon: IconWorld,
      label: 'Geography',
      value: 'India',
    },
  ],
  footerContent: [
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
      label: 'Sectors',
    },
    {
      icon: 'https://civicdatalab.in/cdl_logo.png',
      label: 'Published by',
    },
  ],

  variation: 'collapsed',
  tag: ['UseCase', 'Bio diversity'],
  iconColor: 'warning',
  formats: ['CSV', 'PDF'],
};

// Multiple variations as a grid
export const MultipleCollapsedCards = () => {
  const cardsData: CardProps[] = [
    {
      imageUrl: 'https://justicehub.in/assets/khoj1.png',
      title: 'Climate Action in Assam, India',
      description:
        'Climate initiatives are crucial for sustainable development.',
      metadataContent: [
        {
          icon: IconCalendarEvent,
          label: 'Date',
          value: '19 July 2024',
        },
        {
          icon: IconDownload,
          label: 'Download',
          value: '500',
        },
        {
          icon: IconWorld,
          label: 'Geography',
          value: 'India',
        },
      ],

      footerContent: [
        {
          icon: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
          label: 'Sectors',
        },
        {
          icon: 'https://civicdatalab.in/cdl_logo.png',
          label: 'Published by',
        },
      ],
      variation: 'collapsed',
      tag: ['Climate', 'Policy'],
      iconColor: 'warning',
      formats: ['CSV', 'PDF'],
    },
    {
      imageUrl: 'https://justicehub.in/assets/khoj1.png',
      title: 'Biodiversity Conservation Strategies',
      description:
        'Preserving biodiversity is essential for ecological balance.',
      metadataContent: [
        {
          icon: IconCalendarEvent,
          label: 'Date',
          value: '19 July 2024',
        },
        {
          icon: IconDownload,
          label: 'Download',
          value: '500',
        },
        {
          icon: IconWorld,
          label: 'Geography',
          value: 'India',
        },
      ],
      footerContent: [
        {
          icon: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
          label: 'Sectors',
        },
        {
          icon: 'https://civicdatalab.in/cdl_logo.png',
          label: 'Published by',
        },
      ],
      variation: 'collapsed',
      tag: ['Environment', 'Wildlife'],
      iconColor: 'success',
      formats: ['XLSX', 'JSON'],
    },
    {
      imageUrl: 'https://justicehub.in/assets/khoj1.png',
      title: 'Public Procurement in Renewable Energy',
      description:
        'Investments in renewable energy help reduce carbon footprints.',
      metadataContent: [
        {
          icon: IconCalendarEvent,
          label: 'Date',
          value: '19 July 2024',
        },
        {
          icon: IconDownload,
          label: 'Download',
          value: '500',
        },
        {
          icon: IconWorld,
          label: 'Geography',
          value: 'India',
        },
      ],
      footerContent: [
        {
          icon: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
          label: 'Sectors',
        },
        {
          icon: 'https://civicdatalab.in/cdl_logo.png',
          label: 'Published by',
        },
      ],
      variation: 'collapsed',
      tag: ['Renewable', 'Economy'],
      iconColor: 'interactive',
      formats: ['CSV', 'XML'],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cardsData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export const MultipleExpandedCards = () => {
  const cardsData: CardProps[] = [
    {
      imageUrl: 'https://justicehub.in/assets/khoj1.png',
      title: 'Climate Action in Assam, India',
      description:
        'Climate initiatives are crucial for sustainable development.Investments in renewable energy help reduce carbon footprints. Investments in renewable energy help reduce carbon footprints. Investments in renewable energy help reduce carbon footprints. Investments in renewable energy help reduce carbon footprints.',
      metadataContent: [
        {
          icon: IconCalendarEvent,
          label: 'Date',
          value: '19 July 2024',
        },
        {
          icon: IconDownload,
          label: 'Download',
          value: '500',
        },
        {
          icon: IconWorld,
          label: 'Geography',
          value: 'India',
        },
      ],
      footerContent: [
        {
          icon: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
          label: 'Sectors',
        },
        {
          icon: 'https://civicdatalab.in/cdl_logo.png',
          label: 'Published by',
        },
      ],
      variation: 'expanded',
      tag: ['Climate', 'Policy'],
      iconColor: 'warning',
      formats: ['CSV', 'PDF'],
    },
    {
      imageUrl: 'https://justicehub.in/assets/khoj1.png',
      title: 'Biodiversity Conservation Strategies',
      description:
        'Preserving biodiversity is essential for ecological balance. Investments in renewable energy help reduce carbon footprints. Investments in renewable energy help reduce carbon footprints.',
      metadataContent: [
        {
          icon: IconCalendarEvent,
          label: 'Date',
          value: '19 July 2024',
        },
        {
          icon: IconDownload,
          label: 'Download',
          value: '500',
        },
        {
          icon: IconWorld,
          label: 'Geography',
          value: 'India',
        },
      ],
      footerContent: [
        {
          icon: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
          label: 'Sectors',
        },
        {
          icon: 'https://civicdatalab.in/cdl_logo.png',
          label: 'Published by',
        },
      ],
      variation: 'expanded',
      tag: ['Environment', 'Wildlife'],
      iconColor: 'success',
      formats: ['XLSX', 'JSON'],
    },
    {
      imageUrl: 'https://justicehub.in/assets/khoj1.png',
      title: 'Public Procurement in Renewable Energy',
      description:
        'Investments in renewable energy help reduce carbon footprints. Investments in renewable energy help reduce carbon footprints.',
      metadataContent: [
        {
          icon: IconCalendarEvent,
          label: 'Date',
          value: '19 July 2024',
        },
        {
          icon: IconDownload,
          label: 'Download',
          value: '500',
        },
        {
          icon: IconWorld,
          label: 'Geography',
          value: 'India',
        },
      ],
      footerContent: [
        {
          icon: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
          label: 'Sectors',
        },
        {
          icon: 'https://civicdatalab.in/cdl_logo.png',
          label: 'Published by',
        },
      ],
      variation: 'expanded',
      tag: ['Renewable', 'Economy'],
      iconColor: 'interactive',
      formats: ['CSV', 'XML'],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {cardsData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};
