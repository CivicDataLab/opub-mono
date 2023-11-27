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
          accessorKey: 'damages-losses',
          header: 'Damages and Losses',
        },
        {
          accessorKey: 'vulnerability',
          header: 'Vulnerability',
        },
        {
          accessorKey: 'government-response',
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
      'damages-losses': [
        {
          accessorKey: 'revenue-circle',
          header: 'Revenue Circle',
        },
        {
          accessorKey: 'damages-losses',
          header: 'Damages and Losses',
        },
        {
          accessorKey: 'population-affected-total',
          header: 'Population Affected',
        },
        {
          accessorKey: 'human-live-lost',
          header: 'Human lives lost',
        },
        {
          accessorKey: 'crop-area',
          header: 'Crop area affected',
        },
        {
          accessorKey: 'total-house-fully-damaged',
          header: 'Number of houses damaged',
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
          accessorKey: 'sum-rain',
          header: 'Sum rainfall value in the revenue circle',
        },
  
        {
          accessorKey: 'inundation-intensity-mean',
          header: 'Mean intensity of inundation',
        },
  
        {
          accessorKey: 'riverlevel-mean',
          header: 'Mean river water level',
        },
  
        {
          accessorKey: 'elevation-mean',
          header: 'Mean elevation',
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
          accessorKey: 'sum-male-population',
          header: 'Total Male Population*',
        },
        {
          accessorKey: 'sum-female-population',
          header: 'Total Female Population*',
        },
        {
          accessorKey: 'households',
          header: 'Total number of households*',
        },
        {
          accessorKey: 'sum-population',
          header: 'Population*',
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
        {
          accessorKey: 'schools-count',
          header: 'Number of Schools in the Revenue Circle',
        },
        {
          accessorKey: 'health-centres-count',
          header: 'Number of health centres in the Revenue Circle',
        },
        {
          accessorKey: 'road-length',
          header: 'Length of road in the Revenue Circle',
        },
        {
          accessorKey: 'road-length',
          header: 'Length of road in the Revenue Circle',
        },
        {
          accessorKey: 'net-sown-area-in-hac',
          header: 'Net sown area',
        },
        {
          accessorKey: 'mean-sexratio',
          header: 'Mean sex ratio in the Revenue Circle*',
        },
      ],
    },
    {
      'government-response': [
        {
          accessorKey: 'revenue-circle',
          header: 'Revenue Circle',
        },
        {
          accessorKey: 'government-response',
          header: 'Government Response',
        },
        {
          accessorKey: 'total-tender-awarded-value',
          header: 'Total value of flood related tenders',
        },
        {
          accessorKey: 'sdrf-tenders-awarded-value',
          header: 'Total value of flood related tenders granted under SDRF Scheme',
        },
        {
          accessorKey: 'restoration-measures-tenders-awarded-value',
          header: 'Total value of flood related tenders related to Preparedness',
        },
        {
          accessorKey: 'immediate-measures-tenders-awarded-value',
          header: 'Total value of flood related tenders related to Immediate Measures',
        },
      ],
    },
  ];
export { platformName , DatasetSource , LastUpdated , UpdateFreq , datasetsPageHeader , datasetsExplorerPageHeader , RevenueColumnData , DistrictColumnData };
