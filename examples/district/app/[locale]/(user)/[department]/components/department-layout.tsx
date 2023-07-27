'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { Breadcrumbs, Icon, Input, Separator, Text } from 'opub-ui';

import { Icons } from '@/components/icons';
import { ContentCard, SchemeCard } from './Card';
import styles from './Content.module.scss';

export function Content({
  data,
  departmentData,
}: {
  data: {
    title: string;
    breadcrumbs: {
      label: string;
      href: string;
    }[];
    collapsible: {
      title: string;
      content: string[];
    };
    highlights: {
      title: string;
      cards: {
        value: string;
        label: string;
        color?: string;
      }[];
    };
    listTitle: string;
    list: {
      label: string;
      href: string;
      image: string;
      lastUpdated: string;
      cards: {
        value: string | number;
        label: string;
        type?: string;
      }[];
    }[];
  };
  departmentData: {
    title: string;
  };
}) {
  const breadcrumbs = [
    ...data.breadcrumbs,
    { label: departmentData.title, href: '#' },
  ];
  return (
    <>
      <Breadcrumbs crumbs={breadcrumbs} />

      <div className="mt-4">
        <Text variant="heading3xl" as="h1">
          {departmentData.title}
        </Text>
      </div>

      <div className="mt-6 bg-surface rounded-05 shadow-card">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className={styles.CollapseTrigger}>
            <Text variant="headingLg" as="h3">
              {data.collapsible.title}
            </Text>
            <Icon source={Icons.down} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4 px-6">
            <Separator />
            <div className="mt-4 flex flex-col gap-3">
              {data.collapsible.content.map((item) => (
                <Text key={item}>{item}</Text>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="mt-6">
        <Text variant="headingLg" as="h3">
          {data.highlights.title}
        </Text>

        <div className="mt-4 flex gap-4 flex-wrap">
          {data.highlights.cards.map((card, index) => (
            <ContentCard
              key={card.label + index}
              value={card.value}
              label={card.label}
              color={card.color}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        <div className="flex gap-5 items-center justify-between flex-wrap">
          <Text variant="heading2xl" as="h3">
            {data.listTitle}
          </Text>
          <div className=" basis-[400px]">
            <Input
              name="department-search"
              label="Department Search"
              labelHidden
              prefix={<Icon source={Icons.search} />}
              placeholder="Search"
            />
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 lg:grid-cols-2">
          {data.list.map((item) => (
            <SchemeCard data={item} key={item.label} />
          ))}
        </div>
      </div>
    </>
  );
}
