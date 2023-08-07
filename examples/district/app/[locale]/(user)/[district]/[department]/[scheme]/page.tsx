import { notFound } from 'next/navigation';

import { ckan } from '@/config/site';
import { Content } from './components/scheme-layout';

async function getData(query: string) {
  const res = await fetch(query, {
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
  const data = await getData(ckan.overview);

  const districtObj = data[params.district];

  // If district or department is not found, return 404
  if (
    !districtObj ||
    !districtObj['depts'][params.department] ||
    !districtObj['depts'][params.department]['schemes'][params.scheme]
  ) {
    return notFound();
  }

  const meta = {
    ...params,
    districtName: districtObj.distTitle,
    departmentName: districtObj['depts'][params.department].deptTitle,
    schemeData:
      districtObj['depts'][params.department]['schemes'][params.scheme],
  };

  return (
    <main className="container py-1 lg:py-2">
      <Content data={meta} />
    </main>
  );
}
