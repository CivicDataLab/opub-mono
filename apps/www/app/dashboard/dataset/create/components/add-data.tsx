import { InProgress } from '@/app/dashboard/components/in-progress';
import { Box, Form, Icon, Text } from '@opub-cdl/ui';
import { IconSource } from '@opub-cdl/ui/dist/ts/components/Icon/Icon';

import { RadioCard } from '@/components/radio-card';
import styles from '../create.module.scss';

const defaultValBase = {
  type: 'file',
  name: '',
  description: '',
  terms: false,
};

export function AddData() {
  return (
    <Box minHeight="100%">
      <InProgress />
    </Box>
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
