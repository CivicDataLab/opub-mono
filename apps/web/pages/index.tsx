import { switchTheme } from '@/utils/helpers';
import React from 'react';
import { Button, Checkbox, Flex, Tag } from '@ui/components';
import styles from '../styles/pages/home.module.scss';
import { PropsVariationSection } from '@ui/utils/helpers';
import { Light } from '@opub-icons/workflow';

export default function Web() {
  return (
    <div className={styles.container}>
      <h1>Components</h1>
      <div className={styles.box}>
        <Button primary onClick={switchTheme}>
          Primary
        </Button>
        <Button destructive>Secondary</Button>
        <Button disabled>Disabled</Button>
      </div>

      <div className={styles.box}>
        <Button size="large">Large</Button>
        <Button size="slim">Slim</Button>

        <Button fullWidth>Fluid</Button>
      </div>

      <div className={styles.box}>
        <Button size="slim" url="#">
          Link
        </Button>
      </div>
      <h2>Tags</h2>
      <div className={styles.box}>
        <PropsVariationSection
          component={Tag}
          common={{ children: 'Tags' }}
          xAxis={{
            default: {},
            disabled: { disabled: true },
            'custom children': {
              children: (
                <Flex alignItems="center" gap={4}>
                  <Light size={14} />
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
      </div>
      <h2>Checkbox</h2>
      <PropsVariationSection
        withFormik
        component={Checkbox}
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
    </div>
  );
}
