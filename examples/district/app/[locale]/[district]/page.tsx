import { Content } from './components/district-layout';
import { ckan } from '@/config/site';
import { getData } from '@/lib/api';
import { notFound } from 'next/navigation';

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

  return <Content data={districtData} />;
}
