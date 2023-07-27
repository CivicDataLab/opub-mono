'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { Breadcrumbs, Icon, Input, Separator, Text } from 'opub-ui';

import { Icons } from '@/components/icons';
import { ContentCard, DepartmentCard } from './Card';
import styles from './Content.module.scss';

export function Content({
  data,
}: {
  data: {
    title: string;
    breadcrumbs: {
      label: string;
      href: string;
    }[];
    collapsible: {
      title: string;
      content: {
        leftTitle: string;
        cards: {
          value: string;
          label: string;
          color?: string;
        }[];
        rightTitle: string;
        description: string[];
      };
    };
    listTitle: string;
    list: {
      label: string;
      href: string;
      cards: {
        value: string;
        label: string;
      }[];
    }[];
  };
}) {
  return (
    <>
      <Breadcrumbs crumbs={data.breadcrumbs} />

      <div className="mt-4">
        <Text variant="heading3xl" as="h1">
          {data.title}
        </Text>
      </div>
      <div className="mt-6 bg-surface rounded-05 shadow-card">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className={styles.CollapseTrigger}>
            <Text variant="headingLg" as="h2">
              {data.collapsible.title}
            </Text>
            <Icon source={Icons.down} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4 px-6">
            <Separator />
            <div className="mt-4 grid lg:grid-cols-2 gap-7">
              <div className="flex flex-col gap-4">
                <Text variant="headingMd">
                  {data.collapsible.content.leftTitle}
                </Text>

                <div className="grid gap-4 sm:grid-cols-2">
                  {data.collapsible.content.cards.map((card, index) => (
                    <ContentCard
                      key={card.label + index}
                      value={card.value}
                      label={card.label}
                      color={card.color}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Text variant="headingMd" as="h3">
                  {data.collapsible.content.rightTitle}
                </Text>
                <div className="flex flex-col gap-3">
                  {data.collapsible.content.description.map((item) => (
                    <Text variant="bodyLg" as="p" key={item}>
                      {item}
                    </Text>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="mt-12 flex flex-col gap-4">
        <div className="flex gap-5 items-center justify-between flex-wrap">
          <Text variant="heading2xl" as="h2">
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
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {data.list.map((item) => (
          <DepartmentCard data={item} key={item.label} />
        ))}
      </div>
    </>
  );
}
