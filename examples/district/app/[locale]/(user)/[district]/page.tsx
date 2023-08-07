import { notFound } from 'next/navigation';

import { ckan } from '@/config/site';
import { Content } from './components/district-layout';

async function getData() {
  const res = await fetch(ckan.homepage, {
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
  params: { district: string };
}) {
  const data = await getData();
  const districtData = data[params.district];

  if (!Object.keys(data).includes(params.district)) {
    return notFound();
  }

  return (
    <main className="container py-1 lg:py-2">
      <Content data={districtData} />
    </main>
  );
}
