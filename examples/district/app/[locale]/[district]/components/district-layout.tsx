'use client';

import { Icons } from '@/components/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { Icon, Divider, Text, SearchInput } from 'opub-ui';
import { BreadCrumb } from '.';
import { ContentCard, DepartmentCard } from './Card';
import styles from './Content.module.scss';
import Link from 'next/link';

export interface IProps {
  title: string;
  href: string;
  link?: string;
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
      label: <Icon source={Icons.home} />,
      href: '/',
    },
    {
      label: data.title,
      href: `/${data.href}`,
    },
  ];

  return (
    <>
      <BreadCrumb backUrl="/" crumbs={breadcrumbs} />
      <div className="container py-1 lg:py-2">
        <Text variant="heading3xl" as="h1" color="subdued" className="mt-7">
          {data.title} District
        </Text>

        <div className="mt-6 bg-surfaceDefault rounded-05 shadow-elementCard">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className={styles.CollapseTrigger}>
              <Text variant="headingMd" as="h2">
                {data.collapsible.title}
              </Text>
              <Icon source={Icons.down} />
            </CollapsibleTrigger>

            <CollapsibleContent className="pb-4 px-3 md:px-6">
              <Divider />
              <div className="mt-4 grid lg:grid-cols-2 gap-7">
                <div className="flex flex-col gap-4">
                  <Text variant="headingSm" as="h3" color="subdued">
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
                <div className="flex flex-col gap-3 md:gap-4">
                  <div className="flex flex-wrap items-center gap-2 justify-between">
                    <Text variant="headingSm" as="h3" color="subdued">
                      About {data.title}
                    </Text>
                    {data.link && (
                      <Text
                        variant="bodyMd"
                        className="underline text-textInteractive"
                      >
                        <Link href={data.link} target="_blank">
                          <span className="flex items-center gap-2">
                            Go to District Website
                            <Icon
                              color="interactive"
                              source={Icons.externalLink}
                            />
                          </span>
                        </Link>
                      </Text>
                    )}
                  </div>
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
            <Text variant="headingLg" as="h2">
              {data.listTitle}
            </Text>
            <SearchInput
              name="district-search"
              label="district Search"
              withButton
            />
          </div>
          <Divider />
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {data.list.map((item) => (
            <DepartmentCard data={item} district={data.href} key={item.label} />
          ))}
        </div>
      </div>
    </>
  );
}
