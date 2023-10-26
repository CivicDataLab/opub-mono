import { Content } from './components/department-layout';
import { ckan } from '@/config/site';
import { getData } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function Home({
  params,
}: {
  params: { district: string; department: string };
}) {
  const data = await getData(ckan.department);
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

  return <Content data={meta} />;
}
