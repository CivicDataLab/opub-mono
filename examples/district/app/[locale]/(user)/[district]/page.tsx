import { notFound } from 'next/navigation';

import { ckan } from '@/config/site';
import { getData } from '@/lib/api';
import { Content } from './components/district-layout';

export default async function Home({
  params,
}: {
  params: { district: string };
}) {
  const data = await getData(ckan.homepage);
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
