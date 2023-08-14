import { notFound } from 'next/navigation';

import { ckan } from '@/config/site';
import { Content } from './components/department-layout';

async function getData() {
  const res = await fetch(ckan.department, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home({
  params,
}: {
  params: { district: string; department: string };
}) {
  const data = await getData();
  const districtObj = data[params.district];

  // If district or department is not found, return 404
  if (!districtObj || !districtObj['depts'][params.department]) {
    return notFound();
  }

  const meta = {
    ...params,
    districtName: districtObj.distTitle,
    departmentData: districtObj['depts'][params.department],
  };

  return (
    <main className="container py-1 lg:py-2">
      <Content data={meta} />
    </main>
  );
}
