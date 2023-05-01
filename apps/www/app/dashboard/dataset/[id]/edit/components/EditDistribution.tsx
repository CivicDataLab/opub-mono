import React from 'react';
import { EditDatasetProps } from '@/types';
import { Box, Form, FormLayout, Input, Select, Text } from '@opub-cdl/ui';

import styles from '../edit.module.scss';

export function EditDistribution({
  defaultVal,
}: {
  defaultVal: EditDatasetProps;
}) {
  const [val, setVal] = React.useState(defaultVal);

  return (
    <Box paddingBlockStart="6" maxWidth="944px">
      <Form
        onSubmit={(e) => console.log(e)}
        onChange={setVal}
        formOptions={{ defaultValues: defaultVal }}
      >
        <div className={styles.EditDataset}>
          <Text variant="headingMd">Add Metadata</Text>

          <Box paddingBlockStart="3">
            <FormLayout>
              <Input
                name="source"
                label="Source"
                placeholder="example: https://data.gov.in"
                maxLength={30}
                showCharacterCount
              />
              <Select
                name="frequency"
                label="Update Frequency"
                options={[
                  { label: 'Daily', value: 'daily' },
                  { label: 'Weekly', value: 'weekly' },
                  { label: 'Monthly', value: 'monthly' },
                  { label: 'Yearly', value: 'yearly' },
                ]}
                placeholder="Select an option"
              />
            </FormLayout>
          </Box>
        </div>
      </Form>
    </Box>
  );
}
