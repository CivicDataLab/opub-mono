import { notFound } from 'next/navigation';
import { Text } from 'opub-ui';

import { ckan } from '@/config/site';
import { Content } from './components/scheme-layout';
import { content, schemes } from './scheme.config';

async function getData() {
  const res = await fetch(ckan.overview, {
    next: {
      revalidate: 1,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home({
  params,
}: {
  params: { scheme: string; department: string; district: string };
}) {
  const data = await getData();
  const districtObj = data[params.district];

  // If district or department is not found, return 404
  if (
    !districtObj ||
    !districtObj['depts'][params.department] ||
    !districtObj['depts'][params.department][params.scheme]
  ) {
    return notFound();
  }

  const meta = {
    ...params,
    districtName: districtObj['dist-title'],
    departmentName: districtObj['depts'][params.department]['dept-title'],
    schemeData: districtObj['depts'][params.department][params.scheme],
  };

  return (
    <main className="container py-1 lg:py-2">
      <Content data={meta} />
    </main>
  );
}
