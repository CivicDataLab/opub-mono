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
} from '@opub-cdl/ui';
import { Carousel } from '@opub-cdl/ui/src';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

import styles from './snapshot.module.scss';

export default function Snapshot() {
  const res = [
    {
      text: 'Area \r\n(Sq. Km.)',
      value: '2,830',
    },
    {
      text: 'Total Population',
      value: '28,11,569',
    },
    {
      text: 'Female Population ',
      value: '13,48,236',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
    {
      text: 'Sex Ratio (Females per 1,000 Males)',
      value: '1,094',
    },
  ];

  const [currentSlide, setCurrentSlide] = React.useState(1);
  const [childrenLength, setChildrenLength] = React.useState(3);

  function current(data: number, length: number) {
    setCurrentSlide(data);
    setChildrenLength(length);
  }

  function chunk(items: any, size: any) {
    const chunks = [];
    items = [].concat(...items);

    while (items.length) {
      chunks.push(items.splice(0, size));
    }

    return chunks;
  }

  let a: any, b: any, c: any;

  [a, b, c] = chunk(res, 8);

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
      value: '5',
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
      value: '5',
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
      value: '5',
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
      <Box padding="5">
        <div className="flex justify-between">
          <Text as="h1" variant="headingXl" fontWeight="bold">
            <div className=" mb-2">Demographic highlights</div>
          </Text>
          <div className="rounded-sm p-2">
            SHOWING 0{currentSlide} / 0{childrenLength}
          </div>
        </div>
        <div className={styles.Carousel}>
          <Carousel
            label=" "
            nextBtn={<IconArrowRight />}
            prevBtn={<IconArrowLeft />}
            current={current}
          >
            <ul>
              {a?.map((item: any, index: any) => (
                <li key={`summary-${index}`}>
                  <div></div>
                  <strong>{item.value}</strong>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <ul>
              {b?.map((item: any, index: any) => (
                <li key={`summary-${index}`}>
                  <div></div>
                  <strong>{item.value}</strong>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <ul>
              {c?.map((item: any, index: any) => (
                <li key={`summary-${index}`}>
                  <div></div>
                  <strong>{item.value}</strong>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </Carousel>
        </div>
      </Box>

      <Divider borderStyle="divider" />

      <div className="mt-8 mb-8">
        <Text as="h1" variant="heading2xl" fontWeight="bold">
          Scheme Performance Snapshots
        </Text>
      </div>
      <div className="flex gap-11">
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
              <Button outline size="large">Explore More</Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
