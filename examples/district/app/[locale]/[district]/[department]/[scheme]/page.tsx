import { Content } from './components/scheme-layout';
import { ckan } from '@/config/site';
import { getData } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function Home({
  params,
}: {
  params: { scheme: string; department: string; district: string };
}) {
  const data = await getData(ckan.overview);
  const tableData = await getData(ckan.table);
  const chartData = await getData(ckan.chart);

  function getSchemeObject(obj: any) {
    return obj['depts'][params.department]['schemes'][params.scheme];
  }

  const districtObj = data[params.district];

  // If district or department is not found, return 404
  if (
    !districtObj ||
    !districtObj['depts'][params.department] ||
    !getSchemeObject(districtObj)
  ) {
    return notFound();
  }

  const meta = {
    ...params,
    districtName: districtObj.distTitle,
    departmentName: districtObj['depts'][params.department].deptTitle,
    schemeData: getSchemeObject(districtObj),
    tableData: getSchemeObject(tableData[params.district]).table_data,
    chartData: getSchemeObject(chartData[params.district]).indicators,
  };

  return <Content data={meta} />;
}
