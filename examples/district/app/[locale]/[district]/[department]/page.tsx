import { notFound } from 'next/navigation';

import { ckan } from '@/config/site';
import { getData } from '@/lib/api';
import { Content } from './components/department-layout';

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

  return (
    <div className="container py-1 lg:py-2">
      <Content data={meta} />
    </div>
  );
}
