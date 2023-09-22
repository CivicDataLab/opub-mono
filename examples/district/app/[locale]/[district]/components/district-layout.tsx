'use client';

import { ContentCard, DepartmentCard } from './Card';
import styles from './Content.module.scss';
import { Icons } from '@/components/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import Link from 'next/link';
import { Breadcrumbs, Icon, Separator, Text } from 'opub-ui';

export interface IProps {
  title: string;
  href: string;
  collapsible: {
    title: string;
    content: {
      cards: {
        value: string;
        label: string;
        color: string;
      }[];
      rightTitle: string;
      description: string[];
    };
  };
  listTitle: string;
  list: {
    label: string;
    href: string;
  }[];
}

export function Content({ data }: { data: IProps }) {
  const breadcrumbs = [
    {
      label: 'Assam',
      href: '/',
    },
    {
      label: data.title,
      href: `/${data.href}`,
    },
  ];

  return (
    <>
      <Breadcrumbs crumbs={breadcrumbs} />

      <div className="mt-4 flex gap-4 items-center">
        <Link href="/">
          <Text visuallyHidden>Go to State Page</Text>
          <Icon source={Icons.back} size={32} color="base" />
        </Link>
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
                <Text variant="headingMd" as="h3">
                  Key Highlights
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
                  About {data.title}
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
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {data.list.map((item) => (
          <DepartmentCard data={item} district={data.href} key={item.label} />
        ))}
      </div>
    </>
  );
}
