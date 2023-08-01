export const schemes: {
  [key: string]: {
    title: string;
    logo: string;
  };
} = {
  mgnrega: {
    title: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    logo: '/logo/mgnrega.webp',
  },
  nhm: {
    title: 'National Rural Health Mission (NHM)',
    logo: '/logo/nhm.png',
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
  lastUpdaed: `26 July (1d ago)`,
  schemeInfo: [
    `The objective of MGNREGS is to enhance livelihood security of the rural masses. The scheme is meant to provide at least 100 days of wage employment per financial year (FY) to every rural household whose adult members are willing to do unskilled manual work. This is one of the world’s largest public sector employment programmes that provides guaranteed income through employment.`,
  ],
  tabs: [
    {
      label: 'Scheme Narrative',
      value: 'overview',
      icon: 'overview',
    },
    {
      label: 'Scheme Explorer',
      value: 'explorer',
      icon: 'explorer',
    },
  ],
};

export const overview = {
  targetTitle: 'Targets',
  targets: [
    {
      value: 37.6,
      label: 'Person Days Generated',
      description: `The number of person days generated is the total number of days worked by all the workers in the scheme.`,
      type: 'progress',
    },
    {
      value: 37.6,
      label: 'Person Days Generated',
      description: `The number of person days generated is the total number of days worked by all the workers in the scheme.`,
      type: 'progress',
    },
    {
      value: 37.6,
      label: 'Person Days Generated',
      description: `The number of person days generated is the total number of days worked by all the workers in the scheme.`,
      type: 'progress',
    },
    {
      value: 37.6,
      label: 'Person Days Generated',
      description: `The number of person days generated is the total number of days worked by all the workers in the scheme.`,
      type: 'progress',
    },
  ],
  profileTitle: 'District Profile',
  profiles: [
    {
      label:
        'Number of total workers, women workers, and male workers with active job cards',
      description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. `,
      image: '/logo/barPlaceholder.png',
    },
    {
      label:
        'Number of total workers, women workers, and male workers with active job cards',
      description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. `,
      image: '/logo/barPlaceholder.png',
    },
  ],
  performanceTitle: 'District Performance',
  performances: [
    {
      value: '₹ 297',
      label: 'Average Daily Wage',
      description: `The average daily wage is the total amount of wages paid to all the workers divided by the total number of days worked by all the workers.`,
    },
    {
      value: '₹ 297',
      label: 'Average Daily Wage',
      description: `The average daily wage is the total amount of wages paid to all the workers divided by the total number of days worked by all the workers.`,
    },
    {
      value: '₹ 297',
      label: 'Average Daily Wage',
      description: `The average daily wage is the total amount of wages paid to all the workers divided by the total number of days worked by all the workers.`,
    },
  ],
};

export const explorer = {
  indicators: [
    {
      title: 'Targets',
      list: [
        {
          label: 'Person Days Generated',
          slug: 'person-days-generated',
        },
        {
          label:
            'Person Days Generated as a share of Cumulative Projection of Person Days',
          slug: 'person-days-generated-as-a-share-of-cumulative-projection-of-person-days',
        },
        {
          label: 'Cumulative Expenditure in Current Financial Year',
          slug: 'cumulative-expenditure-in-current-financial-year',
        },
        {
          label:
            'Cumulative Expenditure in Current Financial Year as a share of Total Available Funds',
          slug: 'cumulative-expenditure-in-current-financial-year-as-a-share-of-total-available-funds',
        },
        {
          label: 'ABPS Enabled Accounts',
          slug: 'abps-enabled-accounts',
        },
      ],
    },
    {
      title: 'District Profile',
      list: [
        {
          label: 'Person Days Generated',
          slug: 'person-days-generated-1',
        },
        {
          label:
            'Person Days Generated as a share of Cumulative Projection of Person Days',
          slug: 'person-days-generated-1-as-a-share-of-cumulative-projection-of-person-days',
        },
        {
          label: 'Cumulative Expenditure in Current Financial Year',
          slug: 'cumulative-expenditure-1-in-current-financial-year',
        },
        {
          label:
            'Cumulative Expenditure in Current Financial Year as a share of Total Available Funds',
          slug: 'cumulative-expenditure-1-in-current-financial-year-as-a-share-of-total-available-funds',
        },
        {
          label: 'ABPS Enabled Accounts',
          slug: 'abps-enabled-accounts-1',
        },
      ],
    },
    {
      title: 'District Performance',
      list: [
        {
          label: 'Person Days Generated',
          slug: 'person-days-generate-2',
        },
        {
          label:
            'Person Days Generated as a share of Cumulative Projection of Person Days',
          slug: 'person-days-generated-2-as-a-share-of-cumulative-projection-of-person-days',
        },
        {
          label: 'Cumulative Expenditure in Current Financial Year',
          slug: 'cumulative-expenditure-2-in-current-financial-year',
        },
        {
          label:
            'Cumulative Expenditure in Current Financial Year as a share of Total Available Funds',
          slug: 'cumulative-expenditure-2-in-current-financial-year-as-a-share-of-total-available-funds',
        },
        {
          label: 'ABPS Enabled Accounts',
          slug: 'abps-enabled-accounts-2',
        },
      ],
    },
  ],
  tabs: [
    {
      label: 'Map View',
      value: 'map',
    },
    {
      label: 'Bar View',
      value: 'bar',
    },
    {
      label: 'Table View',
      value: 'table',
    },
  ],
};
