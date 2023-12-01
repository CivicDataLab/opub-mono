import Icons from '@/components/icons';
import Link from 'next/link';
import { Breadcrumbs, Icon, Text } from 'opub-ui';
import React from 'react';

export const BreadCrumb = ({
  crumbs,
  backUrl,
}: {
  crumbs: {
    label: any;
    href: string;
  }[];
  backUrl: string;
}) => {
  return (
    <div className="md:container flex items-center gap-2 md:gap-4 bg-backgroundSolidDefault md:bg-transparent">
      <Link href={backUrl} className="mt-5 hidden md:block">
        <Text visuallyHidden>Go to State Page</Text>
        <Icon source={Icons.leftFilled} size={24} />
      </Link>
      <div className="hidden md:block mt-4">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="md:hidden px-5">
        <Breadcrumbs
          crumbs={crumbs}
          itemsAfterCollapse={1}
          itemsBeforeCollapse={2}
        />
      </div>
    </div>
  );
};
