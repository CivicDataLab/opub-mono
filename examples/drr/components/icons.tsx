import {
  IconAnchor,
  IconArrowLeft,
  IconArrowRight,
  IconBarrierBlock,
  IconBellFilled,
  IconChartBar,
  IconChartInfographic,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconChevronsLeft,
  IconDatabase,
  IconDatabaseCog,
  IconDatabasePlus,
  IconDatabaseShare,
  IconDownload,
  IconFileChart,
  IconHelpSquare,
  IconHome,
  IconInfoCircleFilled,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLink,
  IconListSearch,
  IconMinus,
  IconPlus,
  IconReportSearch,
  IconSearch,
  IconShare,
  IconSquareRoundedArrowRight,
  IconUserCog,
  TablerIconsProps,
} from '@tabler/icons-react';

export const Icons: {
  [key: string]: (props: TablerIconsProps) => React.ReactElement;
} = {
  back: IconArrowLeft,
  doubleLeft: IconChevronsLeft,
  logo: IconAnchor,
  dataset: IconDatabase,
  datasetSettings: IconDatabaseCog,
  addDataset: IconDatabasePlus,
  userSettings: IconUserCog,
  arrowRight: IconArrowRight,
  up: IconChevronUp,
  down: IconChevronDown,
  right: IconChevronRight,
  search: IconSearch,
  notification: IconBellFilled,
  department: IconListSearch,
  scheme: IconReportSearch,
  cardLink: IconSquareRoundedArrowRight,
  info: IconInfoCircleFilled,

  construction: IconBarrierBlock,
  link: IconLink,
  collapse: IconLayoutSidebarLeftCollapse,
  expand: IconLayoutSidebarLeftExpand,
  home: IconHome,
  overview: IconFileChart,
  explorer: IconChartInfographic,
  'database-share': IconDatabaseShare,
  download: IconDownload,
  minus: IconMinus,
  plus: IconPlus,
  iconShare: IconShare,
  iconHelpSquare: IconHelpSquare,
  iconChartBar: IconChartBar,
  iconChevronLeft: IconChevronLeft,
};

export default Icons;