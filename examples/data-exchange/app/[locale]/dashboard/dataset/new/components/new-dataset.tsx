import React from 'react';
import { CreateDatasetInput, PatchDatasetInput } from '@/gql/generated/graphql';
import { PatchDataset, CreateDataset as Props } from '@/types';
import {
  Checkbox,
  FormLayout,
  Icon,
  IconProps,
  Input,
  RadioGroup,
  Text,
} from 'opub-ui';

import { Icons } from '@/components/icons';
import { RadioCard } from '@/components/radio-card';
import { DatasetForm } from '../../components/dataset-form';
import styles from '../new.module.scss';

const defaultValBase: Props = {
  type: 'file',
  title: '',
  description: '',
  terms: false,
};

export function CreateDataset({
  defaultVal,
  submitRef,
  isLoading,
  mutate,
  mutatePatch,
}: {
  defaultVal?: PatchDataset;
  submitRef: React.RefObject<HTMLButtonElement>;
  isLoading?: boolean;
  mutate?: (res: { dataset_data: CreateDatasetInput }) => void;
  mutatePatch?: (res: { dataset_data: PatchDatasetInput }) => void;
}) {
  const defaultValue = defaultVal || defaultValBase;

  return (
    <DatasetForm
      onSubmit={(value: any) => {
        mutatePatch &&
          defaultVal &&
          mutatePatch({
            dataset_data: {
              title: value.title,
              description: value.description,
              id: defaultVal.id,
            },
          });

        mutate &&
          mutate({
            dataset_data: {
              title: value.title,
              description: value.description,
              dataset_type: value.type,
            },
          });
      }}
      formOptions={{ defaultValues: defaultValue }}
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
        <div className="max-w-[656px] pt-8">
          <Text variant="headingMd">Dataset Details</Text>
          <div className="pt-3">
            <FormLayout>
              <Input
                name="title"
                label="Name of Dataset"
                placeholder="example: Population of India"
                maxLength={100}
                showCharacterCount
                autoComplete="off"
                required
                error="This field is required"
                readOnly={isLoading}
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
                readOnly={isLoading}
              />
            </FormLayout>
          </div>

          <div className="pt-6">
            <Text variant="headingMd">Terms & Conditions</Text>
            <div className="pt-2">
              <Checkbox
                name="terms"
                required
                error="This field is required"
                disabled={isLoading}
              >
                I agree to the terms and conditions as set out by the user
                agreement. I state that I have read and understood the terms and
                conditions.
              </Checkbox>
            </div>
          </div>
        </div>
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
  icon: IconProps['source'];
}) => {
  return (
    <RadioCard {...props}>
      <div className={styles.RadioItem}>
        <Icon source={icon} size={32} />
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
