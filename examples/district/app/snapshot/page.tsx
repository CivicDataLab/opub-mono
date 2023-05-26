'use client';

import React from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Divider,
  Menu,
  RadioGroup,
  RadioItem,
  Sheet,
  Tabs,
  Text,
  Carousel
} from '@opub-cdl/ui';

import styles from './snapshot.module.scss';

import { SummaryCarousel } from '@/components/Carousel';

export default function Snapshot() {

  const [open, setOpen] = React.useState(false);


  const indicators = [
    {
      value: '1',
      helpText:
        'Total funds available for the scheme in the selected financial year (FY)',
      text: 'Funds Available',
    },
    {
      value: '2',
      helpText:
        'Amount spent under the scheme in the selected financial year (FY)',
      text: 'Funds Available',
    },
    {
      value: '3',
      helpText:
        'Total funds available for the scheme in the selected financial year (FY)',
      text: 'Funds Available',
    },
    {
      value: '4',
      helpText:
        'Total funds available for the scheme in the selected financial year (FY)',
      text: 'Funds Available',
    },
    {
      value: '5',
      helpText:
        'Total funds available for the scheme in the selected financial year (FY)',
      text: 'Funds Available',
    },
    {
      value: '6',
      helpText:
        'Total funds available for the scheme in the selected financial year (FY)',
      text: 'Funds Available',
    },
    {
      value: '7',
      helpText:
        'Total funds available for the scheme in the selected financial year (FY)',
      text: 'Funds Available',
    },
    {
      value: '8',
      helpText:
        'Total funds available for the scheme in the selected financial year (FY)',
      text: 'Funds Available',
    },
    {
      value: '9',
      helpText:
        'Total funds available for the scheme in the selected financial year (FY)',
      text: 'Funds Available',
    },
  ];

  return (
    <div className={styles.Container}>
      <Text as="h1" variant="heading3xl" fontWeight="bold">
        Araria
      </Text>
      <SummaryCarousel />
      <Divider borderStyle="divider" />

      <div className="mt-8 mb-8">
        <Text as="h1" variant="heading2xl" fontWeight="bold">
          Scheme Performance Snapshots
        </Text>
      </div>
      <div className={styles.MobileIndicator}>
        <span className={styles.MobileIndicatorText}>Budget</span>
        <Box
          flex
          width="12vh"
          minHeight="5vh"
          alignItems="center"
          justifyContent="center"
        >
          <Button primary onClick={() => setOpen((val) => !val)}>
            Indicators
          </Button>
          <Sheet onOpenChange={() => setOpen((val) => !val)} isOpen={open}>
            <div className={styles.IndicatorAlterText}>Alter Indicators</div>
            <RadioGroup className={styles.Radio} name="radio1">
              {indicators.map((indicator) => {
                return (
                  <div className="mb-4">
                    <RadioItem
                      value={indicator.value}
                      helpText={indicator.helpText}
                    >
                      {indicator.text}
                    </RadioItem>
                  </div>
                );
              })}
            </RadioGroup>
          </Sheet>
        </Box>
      </div>
      <div className="flex gap-11 mt-8">
        <div className={styles.Indicators}>
          <div className="pb-4">
            <Text as="h1" variant="bodyLg" fontWeight="bold">
              Indicators
            </Text>
          </div>

          <Divider borderStyle="divider" />
          <div className="mt-3">
            <RadioGroup name="radio1">
              {indicators.map((indicator) => {
                return (
                  <div className="mb-4">
                    <RadioItem
                      value={indicator.value}
                      helpText={indicator.helpText}
                    >
                      {indicator.text}
                    </RadioItem>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <Box
            background="surface"
            padding="6"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text as="h2" variant="headingLg" fontWeight="medium">
              All schemes
            </Text>
            <Text as="h2" variant="bodyMd" fontWeight="regular">
              Financial Year : &nbsp;
              <Menu
                trigger={
                  <Button size="large" disclosure>
                    2018-19
                  </Button>
                }
                items={[
                  {
                    content: '2019-20',
                    onAction: () => console.log('Imported action'),
                  },
                  {
                    content: '2020-21',
                    onAction: () => console.log('Exported action'),
                  },
                ]}
              />
            </Text>
          </Box>
          <ul className="mt-4 flex flex-col gap-4">
            <li className="flex flex-wrap bg-[color:var(--surface)] p-4 gap-5 items-center rounded">
              <div className="flex gap-8 basis-72 items-center">
                <figure>
                  <Image
                    src={'/assets/'}
                    width={72}
                    height={72}
                    layout="fixed"
                    alt=""
                    className="img-cover"
                  />
                </figure>
                <Text as="h4" variant="bodyMd" fontWeight="medium">
                  Mahatma Gandhi National Rural Employment Guarantee Scheme
                  (MGNREGS)
                </Text>
              </div>
              <span
                role="none"
                className="bg-[color:var(--background-invert)] h-12 w-px"
              />
              <div className="flex flex-col gap-2 basis-80 ">
                <div>
                  <span>District value</span>
                </div>
              </div>
              <Button outline size="large">
                Explore More
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
