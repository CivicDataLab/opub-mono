import { createColumnHelper } from '@tanstack/react-table';

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

type Person = {
  firstName: any;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

export const columnContentTypes: Array<'text' | 'numeric'> = [
  'text',
  'text',
  'numeric',
  'numeric',
  'numeric',
  'text',
];

const columnHelper = createColumnHelper<Person>();

export const columns = [
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
    header: () => 'First Name',
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    header: 'Last Name',
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('visits', {
    header: 'Visits',
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
];
