const platformName = 'Intelligent Data Solution';

//General
const RiskColorMap: {
  [key: number]: { backgroundColor: string; indicatorColor: string };
} = {
  5: { backgroundColor: '#d416057a', indicatorColor: '#D41505' },
  4: { backgroundColor: '#fb8b357a', indicatorColor: '#FB8C35' },
  3: { backgroundColor: '#ffee6e82', indicatorColor: '#FFED6E' },
  2: { backgroundColor: '#65a4bd77', indicatorColor: '#65A4BD' },
  1: { backgroundColor: '#4575b480', indicatorColor: '#4575b4' },
};

// Datasets page
const DatasetSource = 'Source';
const LastUpdated = 'Last Updated';
const UpdateFreq = 'Update Frequency';
const datasetsPageHeader = 'DRR : Datasets';
const datasetsExplorerPageHeader = 'DRR : Dataset Explorer';
const DatasetsURL = `/datasets`;

//analytics page
const AnalyticsURL = `/analytics/?indicator=risk-score&time-period=2023_08&boundary=district`;

//home page
const AboutText = 'About IDS DRR';
const AboutTextContentOne =
  'Intelligent Data Solution for Disaster Risk Reduction is an initiative to create data-driven solutions to address disaster related issues.';

const AboutTextContentTwo =
  'Under this initiative we at CivicDataLab have created data models to assess flood preparedness levels of different districts in Assam.';

const AboutTextContentThree =
  'The data model outputs are now available on this easy-to-use dashboard for decision-makers to consume the insights on a near real-time basis. The insights from our data model can assist the Government authorities in identifying high risk regions within Assam, and in streamlining funds where they are needed the most.';

const HeroSectionText =
  'A dashboard for data-driven disaster risk reduction. Discover insights, assess risks, and empower action towards disaster resilience!';

export {
  platformName,
  DatasetSource,
  LastUpdated,
  UpdateFreq,
  datasetsPageHeader,
  datasetsExplorerPageHeader,
  AnalyticsURL,
  DatasetsURL,
  AboutText,
  AboutTextContentOne,
  AboutTextContentTwo,
  AboutTextContentThree,
  HeroSectionText,
  RiskColorMap,
};
