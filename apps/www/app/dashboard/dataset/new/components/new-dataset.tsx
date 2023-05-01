import {
  Box,
  Checkbox,
  Form,
  Icon,
  Input,
  RadioGroup,
  Text,
} from '@opub-cdl/ui';
import { IconSource } from '@opub-cdl/ui/dist/ts/components/Icon/Icon';

import { Icons } from '@/components/icons';
import { RadioCard } from '@/components/radio-card';
import styles from '../new.module.scss';

type valueProps = {
  type: string;
  name: string;
  description: string;
  terms: boolean;
};

const defaultValBase: valueProps = {
  type: 'file',
  name: '',
  description: '',
  terms: false,
};

export function CreateDataset({ defaultVal }: { defaultVal?: valueProps }) {
  const defaultValue = defaultVal || defaultValBase;
  return (
    <Form
      onSubmit={(e) => console.log(e)}
      formOptions={{ defaultValues: defaultValue }}
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
          <Box paddingBlockStart="3" flex direction="column" gap="4">
            <Input
              name="name"
              label="Name of Dataset"
              placeholder="example: Population of India"
              maxLength={30}
              showCharacterCount
            />
            <Input
              name="description"
              label="Description"
              multiline={5}
              placeholder="some information about this dataset."
              maxLength={300}
              showCharacterCount
            />
          </Box>

          <Box paddingBlockStart="8">
            <Text variant="headingMd">Terms & Conditions</Text>
            <Box paddingBlockStart="2">
              <Checkbox name="terms">
                I agree to the terms and conditions as set out by the user
                agreement. I state that I have read and understood the terms and
                conditions.
              </Checkbox>
            </Box>
          </Box>
        </Box>
      </div>
    </Form>
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
        <Icon source={icon} />
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
