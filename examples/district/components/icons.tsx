import {
  IconArrowLeft,
  IconArrowRight,
  IconBarrierBlock,
  IconBellFilled,
  IconDatabase,
  IconDatabaseCog,
  IconDatabasePlus,
  IconFolder,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLink,
  IconSearch,
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
  search: IconSearch,
  notification: IconBellFilled,

  construction: IconBarrierBlock,
  link: IconLink,
  collapse: IconLayoutSidebarLeftCollapse,
  expand: IconLayoutSidebarLeftExpand,
};
