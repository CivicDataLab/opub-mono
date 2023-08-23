export const departments: {
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

export const content = {
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
  listTitle: 'Browse Schemes and Surveys',
  list: [
    {
      label: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
      href: 'mgnrega',
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
      href: 'nhm',
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
