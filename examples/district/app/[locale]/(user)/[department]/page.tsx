import { notFound } from 'next/navigation';

import { Content } from './components/department-layout';

const departments: {
  [key: string]: {
    title: string;
  };
} = {
  'panchayat-and-rural-development': {
    title: 'Panchayat & Rural Development',
  },
  'public-health-engineering': {
    title: 'Public Health Engineering',
  },
};

const content = {
  title: 'Morigaon',
  breadcrumbs: [
    {
      label: 'Assan State',
      href: '/',
    },
    {
      label: 'Morigaon District',
      href: '/',
    },
  ],
  collapsible: {
    title: 'Department Information',
    content: [
      `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
      `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`,
    ],
  },
  highlights: {
    title: 'Key Highlights',
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
  },
  listTitle: 'Browse Schemes',
  list: [
    {
      label: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
      href: '#',
      image: '/logo/mgnrega.webp',
      lastUpdated: '26 July (1d ago)',
      cards: [
        {
          value: '₹ 297',
          label: 'Average Daily Wage',
        },
        {
          value: '₹ 425',
          label: 'Cost / PersonDay',
        },
        {
          value: 37.6,
          label: 'Person Days Generated',
          type: 'progress',
        },
      ],
    },
    {
      label: 'National Rural Health Mission (NHM)',
      href: '#',
      image: '/logo/nhm.png',
      lastUpdated: '25 July (2d ago)',
      cards: [
        {
          value: '₹ 297',
          label: 'Average Daily Wage',
        },
        {
          value: '₹ 425',
          label: 'Cost / PersonDay',
        },
        {
          value: '₹ 1.73',
          label: 'Expenditure to generate one rupee wage',
        },
      ],
    },
  ],
};

export default function Home({ params }: { params: { department: string } }) {
  const page: { title: string } = departments[params.department];
  if (!page) {
    notFound();
  }

  return (
    <main className="container py-4">
      <Content data={content} departmentData={page} />
    </main>
  );
}
