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
const AboutUsURL = '/';
const AboutTextContentOne =
  'Intelligent Data Solution for Disaster Risk Reduction (IDS-DRR) is an open-source platform that helps state-level and district-level Disaster Management Authorities to make timely data-driven decisions, prioritise expenditure of public funds and conduct public procurement in a manner that strengthens long-term disaster risk reduction and protects the most vulnerable people from the adverse effects of extreme weather events and climate change. ';

const AboutTextContentTwo =
  'In this platform, we bring together diverse high-value datasets from satellite, environmental, social, economic, demographic, infrastructure, loss & damages to data regarding government response to derive timely insights.';

const AboutTextContentThree =
  'This 4-year project led by CivicDataLab & Open Contracting Partnership is planned to improve disaster risk reduction processes & practices in the state of Assam. It is supported by the Rockefeller Foundation.';

const HeroSectionText =
  'A dashboard for data-driven disaster risk reduction. Discover insights, assess risks, and empower action towards disaster resilience!';

const AnalyticsQuickLinksText =
  'Browse data analytics for a range of flood risk indicators and scores from our data model, to understand the disaster risk of your region.';

const YouTubeLink = 'https://www.youtube.com/watch?v=gTqcyUQ7esg';

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
  AnalyticsQuickLinksText,
  AboutUsURL,
  YouTubeLink,
};
