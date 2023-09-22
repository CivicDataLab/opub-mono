'use client';

import { ContentCard, SchemeCard } from './Card';
import styles from './Content.module.scss';
import { Icons } from '@/components/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import Link from 'next/link';
import { Breadcrumbs, Icon, Input, Separator, Text } from 'opub-ui';

export interface IProps {
  district: string;
  department: string;
  districtName: string;
  departmentData: {
    deptTitle: string;
    collapsible: {
      title: string;
      content: string[];
    };
    highlights?: {
      title: string;
      cards: { value: string; label: string; color?: string }[];
    };
    listTitle: string;
    list: {
      label: string;
      href: string;
      image: string;
      lastUpdated: string;
      cards: { value: string; label: string; type?: string }[];
    }[];
  };
}

export function Content({ data }: { data: IProps }) {
  const { departmentData } = data;

  const breadcrumbs = [
    {
      label: 'Assam',
      href: '/',
    },
    {
      label: data.districtName,
      href: `/${data.district}`,
    },
    {
      label: departmentData.deptTitle,
      href: `/${data.district}/${data.department}`,
    },
  ];
  return (
    <>
      <Breadcrumbs crumbs={breadcrumbs} />

      <div className="mt-4 flex gap-4 items-center">
        <Link href={`/${data.district}`}>
          <Text visuallyHidden>Go to {data.districtName}</Text>
          <Icon source={Icons.back} size={32} color="base" />
        </Link>
        <Text variant="heading3xl" as="h1">
          {departmentData.deptTitle}
        </Text>
      </div>

      <div className="mt-6 bg-surface rounded-05 shadow-card">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className={styles.CollapseTrigger}>
            <Text variant="headingLg" as="h3">
              {departmentData.collapsible.title}
            </Text>
            <Icon source={Icons.down} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4 px-6">
            <Separator />
            <div className="mt-4 flex flex-col gap-3">
              {departmentData.collapsible.content.map((item) => (
                <Text key={item}>{item}</Text>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {departmentData.highlights && (
        <div className="mt-6">
          <Text variant="headingLg" as="h3">
            {departmentData.highlights.title}
          </Text>

          <div className="mt-4 flex gap-4 flex-wrap">
            {departmentData.highlights.cards.map((card, index) => (
              <ContentCard
                key={card.label + index}
                value={card.value}
                label={card.label}
                color={card.color}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 flex flex-col gap-4">
        <div className="flex gap-5 items-center justify-between flex-wrap">
          <Text variant="heading2xl" as="h3">
            {departmentData.listTitle}
          </Text>
          {/* <div className=" basis-[400px]">
            <Input
              name="department-search"
              label="Department Search"
              labelHidden
              prefix={<Icon source={Icons.search} />}
              placeholder="Search"
            />
          </div> */}
        </div>
        <Separator />
        <div className="grid gap-4 lg:grid-cols-2">
          {departmentData.list.map((item) => (
            <SchemeCard
              data={{ ...item, departmentHref: data.department }}
              key={item.label}
            />
          ))}
        </div>
      </div>
    </>
  );
}
