'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { graphql } from '@/gql';
import { CreateDataset as Props } from '@/types';
import {
  Box,
  Checkbox,
  FormLayout,
  Icon,
  Input,
  RadioGroup,
  Text,
} from '@opub-cdl/ui';
import { IconSource } from '@opub-cdl/ui/dist/ts/components/Icon/Icon';
import { useMutation } from '@tanstack/react-query';

import { GraphQL } from '@/lib/api';
import { Icons } from '@/components/icons';
import { RadioCard } from '@/components/radio-card';
import { DatasetForm } from '../../components/dataset-form';
import styles from '../new.module.scss';

const createDatasetMutation = graphql(`
  mutation create_dataset($dataset_data: CreateDatasetInput) {
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

const defaultValBase: Props = {
  type: 'file',
  title: '',
  description: '',
  terms: false,
};

export function CreateDataset({
  defaultVal,
  submitRef,
}: {
  defaultVal?: Props;
  submitRef: React.RefObject<HTMLButtonElement>;
}) {
  const [val, setVal] = React.useState<Props>(defaultVal || defaultValBase);
  const router = useRouter();
  const defaultValue = defaultVal || defaultValBase;

  const { mutate } = useMutation(
    () =>
      GraphQL(createDatasetMutation, {
        dataset_data: {
          title: val.title,
          description: val.description,
        },
      }),
    {
      onSuccess: (data: any) => {
        console.log(data);
      },
    }
  );

  return (
    <DatasetForm
      onSubmit={(value) => {
        mutate();
      }}
      formOptions={{ defaultValues: defaultValue }}
      onChange={(e) => {
        setVal(e);
      }}
      submitRef={submitRef}
    >
      <div className={styles.CreateDataset}>
        <Text variant="headingMd">Source Type</Text>
        <RadioGroup name="type" title="Select Source Type" titleHidden>
          <div className={styles.RadioWrapper}>
            <RadioItem
              value="file"
              title="Upload File(s)"
              subtitle=".csv, .txt, .xls, .xlsx"
              icon={Icons.dataset}
            />
            <RadioItem
              value="api"
              title="Link API"
              subtitle="currently unavailable"
              icon={Icons.link}
              disabled
            />
          </div>
        </RadioGroup>
        <Box paddingBlockStart="8" maxWidth="656px">
          <Text variant="headingMd">Dataset Details</Text>
          <Box paddingBlockStart="3">
            <FormLayout>
              <Input
                name="title"
                label="Name of Dataset"
                placeholder="example: Population of India"
                maxLength={30}
                showCharacterCount
                autoComplete="off"
                required
                error="This field is required"
              />
              <Input
                name="description"
                label="Description"
                multiline={5}
                placeholder="some information about this dataset."
                maxLength={300}
                showCharacterCount
                autoComplete="off"
                required
                error="This field is required"
              />
            </FormLayout>
          </Box>

          <Box paddingBlockStart="8">
            <Text variant="headingMd">Terms & Conditions</Text>
            <Box paddingBlockStart="2">
              <Checkbox name="terms" required error="This field is required">
                I agree to the terms and conditions as set out by the user
                agreement. I state that I have read and understood the terms and
                conditions.
              </Checkbox>
            </Box>
          </Box>
        </Box>
      </div>
    </DatasetForm>
  );
}

const RadioItem = ({
  title,
  subtitle,
  icon,
  ...props
}: {
  value: string;
  title: string;
  subtitle: string;
  disabled?: boolean;
  icon: IconSource;
}) => {
  return (
    <RadioCard {...props}>
      <div className={styles.RadioItem}>
        <Icon source={icon} size="8" />
        <div className={styles.RadioContent}>
          <Text
            variant="headingSm"
            color={props.disabled ? 'disabled' : 'default'}
          >
            {title}
          </Text>
          <Text
            variant="headingXs"
            color={props.disabled ? 'disabled' : 'subdued'}
          >
            {subtitle}
          </Text>
        </div>
      </div>
    </RadioCard>
  );
};
