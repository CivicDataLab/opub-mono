'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Select from 'react-select';
import { BarChart } from 'opub-viz/src';

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
  const timePeriod: string = searchParams.get('time-period') || '';

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
        name: 'Composite Score',
        data: district.map((dist:any) => chartData[timePeriod]["composite-score"][dist.value]),
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
