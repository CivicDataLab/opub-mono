import { Content } from './components/district-layout';

const content = {
  title: 'Morigaon',
  breadcrumbs: [
    {
      label: 'District Listing',
      href: '/',
    },
    {
      label: 'Morigaon District',
      href: '/',
    },
  ],
  collapsible: {
    title: 'District Highlights & Information',
    content: {
      leftTitle: 'Key Highlights',
      cards: [
        {
          value: '₹ 4,20,672 Cr.',
          label: 'Total Receipts',
          color: 'highlight',
        },
        {
          value: '₹ 4,20,672 Cr.',
          label: 'Total Receipts',
          color: 'highlight',
        },
        {
          value: '₹ 4,20,672 Cr.',
          label: 'Total Receipts',
          color: 'highlight',
        },
        {
          value: '₹ 4,20,672 Cr.',
          label: 'Total Receipts',
          color: 'highlight',
        },
      ],
      rightTitle: 'About Morigaon',
      description: [
        `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
        `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`,
      ],
    },
  },
  listTitle: 'Browse Line Departments',
  list: [
    {
      label: 'Panchayat & Rural Development',
      href: 'panchayat-and-rural-development',
      cards: [
        {
          value: '₹ 4,20,672 Cr.',
          label: 'Total Receipts',
        },
        {
          value: '₹ 4,20,672 Cr.',
          label: 'Total Receipts',
        },
        {
          value: '₹ 4,20,672 Cr.',
          label: 'Total Receipts',
        },
        {
          value: '₹ 4,20,672 Cr.',
          label: 'Total Receipts',
        },
      ],
    },
    {
      label: 'Public Health Engineering',
      href: 'public-health-engineering',
      cards: [
        {
          value: '₹ 4,20,672 Cr.',
          label: 'Total Receipts',
        },
        {
          value: '₹ 4,20,672 Cr.',
          label: 'Total Receipts',
        },
        {
          value: '₹ 4,20,672 Cr.',
          label: 'Total Receipts',
        },
        {
          value: '₹ 4,20,672 Cr.',
          label: 'Total Receipts',
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <main className="container py-4">
      <Content data={content} />
    </main>
  );
}
