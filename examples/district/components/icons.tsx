import {
  IconArrowLeft,
  IconArrowRight,
  IconBarrierBlock,
  IconBellFilled,
  IconChevronDown,
  IconDatabase,
  IconDatabaseCog,
  IconDatabasePlus,
  IconFolder,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLink,
  IconListSearch,
  IconReportSearch,
  IconSearch,
  IconSquareRoundedArrowRight,
  IconUserCog,
  TablerIconsProps,
} from '@tabler/icons-react';

export const Icons: {
  [key: string]: (props: TablerIconsProps) => React.ReactElement;
} = {
  back: IconArrowLeft,
  logo: IconFolder,
  dataset: IconDatabase,
  datasetSettings: IconDatabaseCog,
  addDataset: IconDatabasePlus,
  userSettings: IconUserCog,
  arrowRight: IconArrowRight,
  down: IconChevronDown,
  search: IconSearch,
  notification: IconBellFilled,
  department: IconListSearch,
  scheme: IconReportSearch,
  cardLink: IconSquareRoundedArrowRight,

  construction: IconBarrierBlock,
  link: IconLink,
  collapse: IconLayoutSidebarLeftCollapse,
  expand: IconLayoutSidebarLeftExpand,
};
