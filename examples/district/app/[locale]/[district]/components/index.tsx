import Icons from '@/components/icons';
import Link from 'next/link';
import { Breadcrumbs, Icon, IconButton, Input, Text } from 'opub-ui';
import React from 'react';

export const Search = () => {
  const [search, setSearch] = React.useState('');
  return (
    <div className="flex items-center gap-2">
      <Input
        name="department-search"
        label="Department Search"
        labelHidden
        placeholder="Search"
        value={search}
        onChange={setSearch}
      />
      <IconButton
        color="highlight"
        icon={Icons.search}
        className="bg-surfaceHighlightDefault p-2 rounded-full hover:bg-lightmodeVioletSolid6"
      >
        Search
      </IconButton>
    </div>
  );
};

export const BreadCrumb = ({
  crumbs,
  backUrl,
}: {
  crumbs: {
    label: string;
    href: string;
  }[];
  backUrl: string;
}) => {
  return (
    <div className="flex items-start gap-2 md:gap-4">
      <Link href={backUrl} className="mt-2">
        <Text visuallyHidden>Go to State Page</Text>
        <Icon source={Icons.leftFilled} size={24} color="default" />
      </Link>
      <Breadcrumbs crumbs={crumbs} />
    </div>
  );
};
