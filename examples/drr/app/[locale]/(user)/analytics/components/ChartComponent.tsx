'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Select from 'react-select';
import { BarChart } from 'opub-viz/src';
import { deSlugify } from '@/lib/utils';

export function ChartComponent({
  chartDataloading,
  chartData,
  districtsData
}: {
  chartDataloading: Boolean;
  chartData: any;
  districtsData: any
}) {

  const [district, setDistrict] = React.useState<any>([{ label: "Balijana", value: "Balijana" }]);
  const searchParams = useSearchParams();
  const timePeriod: string = searchParams.get('time-period') || '2023_08';
  const subIndicator = searchParams.get('sub-indicator');
  const indicator = searchParams.get('indicator')
  const indicatorToMap = subIndicator || indicator || 'composite-score'

  let districtArray: any = [];
  if (districtsData) {
    districtsData.forEach((district:any) => {
      districtArray.push({
        label: district.name,
        value: district.name,
      });
    });
  }

  let series:any = [];
  if(district && chartData){
    series.push({
        name: deSlugify(indicatorToMap),
        data: district.map((dist:any) => chartData[timePeriod][indicatorToMap][dist.value]),
        type: 'bar',
      })
  }

  const handleSelectChange = (value: any) => {
    if (value === null) {
      setDistrict([]);
    } else {
      setDistrict(value);
    }
  };

  const disableOptions = () => (
    district.length == 3 ? true : false
  );

  return (
    <div className="relative w-full">
      {!chartDataloading && districtArray.length > 0  ? (
        <>
          <Select
            className="w-[450px]"
            name="select-1"
            isMulti
            defaultValue={districtArray[0].value}
            value={district}
            onChange={handleSelectChange}
            options={districtArray}
            isOptionDisabled={disableOptions}
          />
          <BarChart
            yAxis={district.map((item:any) => item.label)}
            series={series}
            height="500px"
          />
        </>
      ) : 
      <>
       <div>
        Chart is loading
       </div>
      </>}
    </div>
  );
}
