'use client';

import { Icons } from '@/components/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { Divider, Icon, SearchInput, Text } from 'opub-ui';
import { BreadCrumb } from '../../components';
import { ContentCard, SchemeCard } from './Card';
import styles from './Content.module.scss';

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
      label: <Icon source={Icons.home} />,
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
      <BreadCrumb backUrl={`/${data.district}`} crumbs={breadcrumbs} />

      <div className="container py-1 lg:py-2">
        <Text variant="heading3xl" as="h1" color="subdued" className="mt-7">
          {departmentData.deptTitle}
        </Text>

        <div className="mt-6 bg-surfaceDefault rounded-05 shadow-elementCard">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className={styles.CollapseTrigger}>
              <Text variant="headingLg" as="h3">
                {departmentData.collapsible.title}
              </Text>
              <Icon source={Icons.down} />
            </CollapsibleTrigger>

            <CollapsibleContent className="pb-4 px-3 md:px-6">
              <Divider />
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
            <Text variant="headingSmSpaced" color="subdued" as="h2">
              {departmentData.highlights.title}
            </Text>

            <div className="mt-3 flex gap-4 flex-wrap">
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

        <div className="mt-8">
          <div className="flex gap-5 items-center justify-between flex-wrap">
            <Text variant="headingLg" as="h3">
              {departmentData.listTitle}
            </Text>
            <SearchInput
              name="department-search"
              label="Department Search"
              withButton
            />
          </div>
          <Divider className="mt-3 mb-4" />
          <div className="grid gap-4 lg:grid-cols-2">
            {departmentData.list.map((item) => (
              <SchemeCard
                data={{ ...item, departmentHref: data.department }}
                key={item.label}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
