const platformName = 'Intelligent Data Solution';

// Datasets page
const DatasetSource = 'Source'
const LastUpdated = 'Last Updated'
const UpdateFreq = 'Update Frequency'
const datasetsPageHeader = 'DRR : Datasets'
const datasetsExplorerPageHeader = 'DRR : Dataset Explorer'

type ColumnData = Array<{
  [key: string]: Array<{
    accessorKey: string;
    header: string;
  }>;
}>;

const DistrictColumnData : ColumnData = [
    {
      'composite-score': [
        {
          accessorKey: 'district',
          header: 'District',
        },
        {
          accessorKey: 'composite-score',
          header: 'Composite Score',
        },
        {
          accessorKey: 'damages-and-losses',
          header: 'Damages and Losses',
        },
        {
          accessorKey: 'vulnerability',
          header: 'Vulnerability',
        },
        {
          accessorKey: 'governance-response',
          header: 'Governance response',
        },
        {
          accessorKey: 'flood-hazard',
          header: 'Flood Hazard',
        },
        {
          accessorKey: 'exposure',
          header: 'Exposure',
        },
      ],
    },
    {
      'damages-and-losses': [
        {
          accessorKey: 'district',
          header: 'District',
        },
        {
          accessorKey: 'damages-and-losses',
          header: 'Damages and Losses',
        },
        {
          accessorKey: 'population-affected',
          header: 'Population Affected',
        },
      ],
    },
    {
      'flood-hazard': [
        {
          accessorKey: 'district',
          header: 'District',
        },
        {
          accessorKey: 'flood-hazard',
          header: 'Flood Hazard',
        },
        {
          accessorKey: 'elevation',
          header: 'Elevation',
        },
  
        {
          accessorKey: 'inundation',
          header: 'Inundation',
        },
  
        {
          accessorKey: 'rainfall',
          header: 'Rainfall',
        },
  
        {
          accessorKey: 'river-water-level',
          header: 'River Water Level',
        },
      ],
    },
    {
      exposure: [
        {
          accessorKey: 'district',
          header: 'District',
        },
        {
          accessorKey: 'exposure',
          header: 'Exposure',
        },
        {
          accessorKey: 'population',
          header: 'Population',
        },
        {
          accessorKey: 'sex-ratio',
          header: 'Sex Ratio',
        },
      ],
    },
    {
      vulnerability: [
        {
          accessorKey: 'district',
          header: 'District',
        },
        {
          accessorKey: 'vulnerability',
          header: 'Vulnerability',
        },
      ],
    },
    {
      'governance-response': [
        {
          accessorKey: 'district',
          header: 'District',
        },
        {
          accessorKey: 'governance-response',
          header: 'Governance Response',
        },
      ],
    },
  ];

  const RevenueColumnData : ColumnData = [
    {
      'composite-score': [
        {
          accessorKey: 'revenue-circle',
          header: 'Revenue Circle',
        },
        {
          accessorKey: 'composite-score',
          header: 'Composite Score',
        },
        {
          accessorKey: 'damages-and-losses',
          header: 'Damages and Losses',
        },
        {
          accessorKey: 'vulnerability',
          header: 'Vulnerability',
        },
        {
          accessorKey: 'governance-response',
          header: 'Governance response',
        },
        {
          accessorKey: 'flood-hazard',
          header: 'Flood Hazard',
        },
        {
          accessorKey: 'exposure',
          header: 'Exposure',
        },
      ],
    },
    {
      'damages-and-losses': [
        {
          accessorKey: 'revenue-circle',
          header: 'Revenue Circle',
        },
        {
          accessorKey: 'damages-and-losses',
          header: 'Damages and Losses',
        },
     
        {
          accessorKey: 'population-affected',
          header: 'Population Affected',
        },
      ],
    },
    {
      'flood-hazard': [
        {
          accessorKey: 'revenue-circle',
          header: 'Revenue Circle',
        },
        {
          accessorKey: 'flood-hazard',
          header: 'Flood Hazard',
        },
        {
          accessorKey: 'elevation',
          header: 'Elevation',
        },
  
        {
          accessorKey: 'inundation',
          header: 'Inundation',
        },
  
        {
          accessorKey: 'rainfall',
          header: 'Rainfall',
        },
  
        {
          accessorKey: 'river-water-level',
          header: 'River Water Level',
        },
      ],
    },
    {
      exposure: [
        {
          accessorKey: 'revenue-circle',
          header: 'Revenue Circle',
        },
        {
          accessorKey: 'exposure',
          header: 'Exposure',
        },
        {
          accessorKey: 'population',
          header: 'Population',
        },
        {
          accessorKey: 'sex-ratio',
          header: 'Sex Ratio',
        },
      ],
    },
    {
      vulnerability: [
        {
          accessorKey: 'revenue-circle',
          header: 'Revenue Circle',
        },
        {
          accessorKey: 'vulnerability',
          header: 'Vulnerability',
        },
      ],
    },
    {
      'governance-response': [
        {
          accessorKey: 'revenue-circle',
          header: 'Revenue Circle',
        },
        {
          accessorKey: 'governance-response',
          header: 'Governance Response',
        },
      ],
    },
  ];
export { platformName , DatasetSource , LastUpdated , UpdateFreq , datasetsPageHeader , datasetsExplorerPageHeader , RevenueColumnData , DistrictColumnData };
