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
    'Natural and man-made environmental resources – fresh water, clean air, forests, grasslands, marine resources, and agro-ecosystems – provide sustenance and a foundation for social and economic development. The need to safeguard these resources crosses all borders.',
  date: '19 July 2024',
  downloads: '500+',
  geography: 'India',
  sectorLogo: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
  publisherLogo: 'https://civicdatalab.in/cdl_logo.png',
  variation: 'Collapsed',
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
      date: '19 July 2024',
      downloads: '500+',
      geography: 'India',
      sectorLogo: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
      publisherLogo: 'https://civicdatalab.in/cdl_logo.png',
      variation: 'Collapsed',
      tag: ['Climate', 'Policy'],
      iconColor: 'warning',
      formats: ['CSV', 'PDF'],
    },
    {
      imageUrl: 'https://justicehub.in/assets/khoj1.png',
      title: 'Biodiversity Conservation Strategies',
      description:
        'Preserving biodiversity is essential for ecological balance.',
      date: '10 June 2023',
      downloads: '300+',
      geography: 'Global',
      sectorLogo: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
      publisherLogo: 'https://civicdatalab.in/cdl_logo.png',
      variation: 'Collapsed',
      tag: ['Environment', 'Wildlife'],
      iconColor: 'success',
      formats: ['XLSX', 'JSON'],
    },
    {
      imageUrl: 'https://justicehub.in/assets/khoj1.png',
      title: 'Public Procurement in Renewable Energy',
      description:
        'Investments in renewable energy help reduce carbon footprints.',
      date: '5 March 2022',
      downloads: '800+',
      geography: 'Europe',
      sectorLogo: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
      publisherLogo: 'https://civicdatalab.in/cdl_logo.png',
      variation: 'Collapsed',
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
      date: '19 July 2024',
      downloads: '500+',
      geography: 'India',
      sectorLogo: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
      publisherLogo: 'https://civicdatalab.in/cdl_logo.png',
      variation: 'Expanded',
      tag: ['Climate', 'Policy'],
      iconColor: 'warning',
      formats: ['CSV', 'PDF'],
    },
    {
      imageUrl: 'https://justicehub.in/assets/khoj1.png',
      title: 'Biodiversity Conservation Strategies',
      description:
        'Preserving biodiversity is essential for ecological balance. Investments in renewable energy help reduce carbon footprints. Investments in renewable energy help reduce carbon footprints.',
      date: '10 June 2023',
      downloads: '300+',
      geography: 'Global',
      sectorLogo: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
      publisherLogo: 'https://civicdatalab.in/cdl_logo.png',
      variation: 'Expanded',
      tag: ['Environment', 'Wildlife'],
      iconColor: 'success',
      formats: ['XLSX', 'JSON'],
    },
    {
      imageUrl: 'https://justicehub.in/assets/khoj1.png',
      title: 'Public Procurement in Renewable Energy',
      description:
        'Investments in renewable energy help reduce carbon footprints. Investments in renewable energy help reduce carbon footprints.',
      date: '5 March 2022',
      downloads: '800+',
      geography: 'Europe',
      sectorLogo: 'https://cdn-icons-png.flaticon.com/512/9286/9286057.png',
      publisherLogo: 'https://civicdatalab.in/cdl_logo.png',
      variation: 'Expanded',
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
