'use client';

import React from 'react';
import { graphql } from '@/gql';
import { CreateDatasetInput } from '@/gql/generated/graphql';
import { usePRouter } from '@/hooks/use-prouter';
import { useMutation } from '@tanstack/react-query';

import { GraphQL } from '@/lib/api';
import { loadingStart } from '@/lib/navigation';
import { ActionBar } from '../components/action-bar';
import { CreateDataset } from './components/new-dataset';

const createDatasetMutationDoc = graphql(`
  mutation createDatasetMutation($dataset_data: CreateDatasetInput) {
    create_dataset(dataset_data: $dataset_data) {
      success
      errors
      dataset {
        id
        title
        description
        dataset_type
      }
    }
  }
`);

export const Page = () => {
  const router = usePRouter();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  const { mutate, isLoading } = useMutation(
    (data: { dataset_data: CreateDatasetInput }) =>
      GraphQL(createDatasetMutationDoc, data),
    {
      onSuccess: (data) => {
        router.push(
          `/dashboard/dataset/${data.create_dataset?.dataset?.id}/edit/metadata`
        );
      },
    }
  );
  return (
    <>
      <ActionBar
        title="Add New Dataset"
        primaryAction={{
          content: 'Save & Next',
          onAction: () => {
            submitRef.current?.click();
          },
        }}
        secondaryAction={{
          content: 'Cancel',
          onAction: () => router.push('/dashboard/dataset'),
        }}
        previousPage={{
          content: 'My Datasets',
          link: '/dashboard/dataset',
        }}
        isLoading={isLoading}
      />

      <CreateDataset
        submitRef={submitRef}
        mutate={mutate}
        isLoading={isLoading}
      />
    </>
  );
};
