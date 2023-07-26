'use client';

import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { Breadcrumbs, Icon, Input, Separator, Text } from 'opub-ui';

import { Icons } from '@/components/icons';
import { ContentCard, DepartmentCard } from './Card';
import styles from './Content.module.scss';

const breadcrumbs = [
  {
    label: 'District Listing Page',
    href: '#',
  },
  {
    label: 'Morigaon District Page',
    href: '#',
  },
];

export function Content() {
  return (
    <>
      <Breadcrumbs crumbs={breadcrumbs} />

      <div className="mt-4">
        <Text variant="heading3xl" as="h1">
          Morigaon
        </Text>
      </div>
      <div className="mt-6 bg-surface rounded-05 shadow-card">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className={styles.CollapseTrigger}>
            <Text variant="headingLg" as="h2">
              District Highlights & Information
            </Text>
            <Icon source={Icons.down} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4 px-6">
            <Separator />
            <div className="mt-4 grid lg:grid-cols-2 gap-7">
              <div className="flex flex-col gap-4">
                <Text variant="headingMd">Key Highlights</Text>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ContentCard
                    value="₹ 4,20,672 Cr."
                    label="Total Receipts"
                    color="highlight"
                  />
                  <ContentCard
                    value="₹ 4,20,672 Cr."
                    label="Total Receipts"
                    color="highlight"
                  />
                  <ContentCard
                    value="₹ 4,20,672 Cr."
                    label="Total Receipts"
                    color="highlight"
                  />
                  <ContentCard
                    value="₹ 4,20,672 Cr."
                    label="Total Receipts"
                    color="highlight"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Text variant="headingMd" as="h3">
                  About Morigaon
                </Text>
                <Text variant="bodyLg" as="p">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  <br />
                  <br />
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text.
                </Text>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="mt-12 flex flex-col gap-4">
        <div className="flex gap-5 items-center justify-between flex-wrap">
          <Text variant="heading2xl" as="h2">
            Browse Line Departments
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
        <DepartmentCard department="Panchayat & Rural Development" />
        <DepartmentCard department="Public Health Engineering" />
      </div>
    </>
  );
}
