import { CreateDataset as Props } from '@/types';

import { CreateDataset } from '../../../new/components/new-dataset';

export function EditDataset({
  defaultVal,
  submitRef,
}: {
  defaultVal: Props;
  submitRef: React.RefObject<HTMLButtonElement>;
}) {
  return <CreateDataset defaultVal={defaultVal} submitRef={submitRef} />;
}
