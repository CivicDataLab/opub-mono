'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { BarChart } from 'opub-viz/src';
import Select from 'react-select';
import { deSlugify } from '@/lib/utils';

export function ChartComponent({
  chartDataloading,
  chartData,
  dropDownData,
}: {
  chartDataloading: Boolean;
  chartData: any;
  dropDownData: any;
}) {
  const [district, setDistrict] = React.useState<any>();
  const searchParams = useSearchParams();
  const timePeriod: string = searchParams.get('time-period') || '2023_08';
  const subIndicator = searchParams.get('sub-indicator');
  const indicator = searchParams.get('indicator');
  const indicatorToMap = subIndicator || indicator || 'composite-score';

  interface DropdownOptionProps {
    label: string;
    value: string;
  }

  React.useEffect(() => {
    if (dropDownData && dropDownData.length > 0) {
      setDistrict([
        { label: dropDownData[0].name, value: dropDownData[0].code },
      ]);
    }
  }, [dropDownData]);

  const districtArray: DropdownOptionProps[] = [];
  if (dropDownData) {
    dropDownData.forEach((district: any) => {
      districtArray.push({
        label: district.name,
        value: district.code,
      });
    });
  }

  interface Series {
    name: string;
    data: number[];
    type: string;
  }

  const series: Series[] = [];
  if (district && chartData) {
    const data: number[] = [];
    district.forEach((dist: any) => {
      data.push(chartData[timePeriod][indicatorToMap][dist.value][dist.label]);
    });
    series.push({
      name: deSlugify(indicatorToMap),
      data: data,
      type: 'bar',
    });
  }

  const handleSelectChange = (value: any) => {
    if (value === null) {
      setDistrict([]);
    } else {
      setDistrict(value);
    }
  };

  const disableOptions = () => (district.length == 3 ? true : false);

  const yAxis: string[] = [];
  if (district) {
    district.forEach((item: any) => {
      yAxis.push(item.label);
    });
  }

  return (
    <div className="relative w-full">
      {districtArray.length > 0 && (
        <>
          <Select
            className="w-[450px]"
            name="select-1"
            isMulti
            value={district}
            onChange={handleSelectChange}
            options={districtArray}
            isOptionDisabled={disableOptions}
          />
          <span className=" px-2 text-75 text-textCritical">
            {district?.length < 1
              ? 'Select 1-3 districts, then add indicators for comparison'
              : null}
          </span>
          {!chartDataloading ? (
            <BarChart yAxis={yAxis} series={series} height="500px" />
          ) : (
            <div>Chart is loading</div>
          )}
        </>
      )}
    </div>
  );
}
