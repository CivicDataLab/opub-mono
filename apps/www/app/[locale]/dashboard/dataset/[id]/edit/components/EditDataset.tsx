import { CreateDataset } from '../../../new/components/new-dataset';
import { PatchDataset } from '@/types';
import React from 'react';

export function EditDataset({
  defaultVal,
  submitRef,
  mutate,
  isLoading,
}: {
  defaultVal: PatchDataset;
  submitRef: React.RefObject<HTMLButtonElement>;
  mutate: any;
  isLoading: boolean;
}) {
  return (
    <CreateDataset
      mutatePatch={mutate}
      isLoading={isLoading}
      defaultVal={defaultVal}
      submitRef={submitRef}
    />
  );
}
