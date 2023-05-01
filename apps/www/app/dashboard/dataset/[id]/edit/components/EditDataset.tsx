import { CreateDataset as Props } from '@/types';

import { CreateDataset } from '../../../new/components/new-dataset';

export function EditDataset({ defaultVal }: { defaultVal: Props }) {
  return <CreateDataset defaultVal={defaultVal} />;
}
