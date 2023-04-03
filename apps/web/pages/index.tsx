import { switchTheme } from 'utils/helpers';
import {
  Box,
  Button,
  Calendar,
  Divider,
  Flex,
  RangeCalendar,
  Tag,
  Text,
  UncontrolledCheckbox,
} from '@opub-cdl/ui';
import styles from '../styles/pages/home.module.scss';
import { PropsVariationSection } from '../utils/helpers';

export default function Web() {
  return (
    <div className={styles.container}>
      <Text variant="heading2xl" as="h1">
        Components
      </Text>

      <Spacer heading="Button">
        <Button primary onClick={switchTheme}>
          Primary
        </Button>
        <Button destructive>Secondary</Button>
        <Button disabled>Disabled</Button>
        <Button size="large">Large</Button>
        <Button size="slim">Slim</Button>
        <Button size="slim" url="#">
          Link
        </Button>
        <Button fullWidth>Fluid</Button>
      </Spacer>

      <Spacer heading="Calendar">
        <Calendar />
        <RangeCalendar />
      </Spacer>

      <Spacer heading="Tags" divider>
        <PropsVariationSection
          component={Tag}
          common={{ children: 'Tags' }}
          xAxis={{
            default: {},
            disabled: { disabled: true },
            'custom children': {
              children: (
                <Flex alignItems="center" gap={4}>
                  <span>Sun is up</span>
                </Flex>
              ),
            },
          }}
          yAxis={{
            default: {},
            'with remove': {
              onRemove: () => {
                console.log('Remove triggered');
              },
            },
            'with click': {
              onClick: () => {
                console.log('Remove triggered');
              },
            },
            'with link': {
              url: '#',
            },
            'removable with link': {
              url: '#',
              onRemove: () => {
                console.log('Remove triggered');
              },
            },
          }}
        />
      </Spacer>

      <Spacer heading="Checkbox">
        <PropsVariationSection
          withFormik
          component={UncontrolledCheckbox}
          common={{ children: 'Label' }}
          xAxis={{
            default: {},
            disabled: { disabled: true },
            error: { error: true },
          }}
          yAxis={{
            Unchecked: {},
            Checked: { checked: true },
            Indeterminate: { checked: 'indeterminate' },
          }}
        />
      </Spacer>
    </div>
  );
}

const Spacer = ({ children, heading, divider }: any) => {
  return (
    <Box paddingBlockStart="8" paddingBlockEnd="4" width="fit-content">
      <Box paddingBlockEnd="2">
        <Text variant="headingLg" as="h2">
          {heading}
        </Text>
      </Box>
      <Flex alignItems="start" gap={16} wrap="wrap">
        {children}
      </Flex>
      {divider && <Divider borderStyle="divider" />}
    </Box>
  );
};
