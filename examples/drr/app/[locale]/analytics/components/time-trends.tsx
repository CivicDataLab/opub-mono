import React from 'react';
import { BarChart } from 'opub-ui/viz';

import { formatDateString } from '@/lib/utils';

interface LineOptions {
  xAxis: {
    data: string[];
  };
  yAxis: {
    type: string;
  };
  legend: {
    data: string[];
  };
  series: {
    data: number[];
    type: string;
    name: string;
    color: string;
  }[];
}

export function TimeTrends({
  chartData,
  indicator,
}: {
  chartData: any;
  indicator: string;
}) {
  let lineOptions: LineOptions = {
    xAxis: {
      data: Object.keys(chartData[indicator]).map((item) =>
        formatDateString(item, true)
      ),
    },
    yAxis: {
      type: 'value',
    },
    legend: {
      data: [],
    },
    series: [],
  };

  let districtNames: any = [];
  Object.values(chartData[indicator]).forEach((item: any) => {
    item.forEach((d: any) => {
      if (!districtNames.includes(d.district)) {
        districtNames.push(d.district);
      }
    });
  });

  const color = [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc',
  ];

  // Create series for each district
  districtNames.forEach((district: any, index: any) => {
    let seriesData = Object.keys(chartData[indicator]).map((key: any) => {
      let value = chartData[indicator][key].find(
        (item: any) => item.district === district
      );
      return value ? value[indicator] : 0;
    });

    lineOptions.legend.data.push(district);

    lineOptions.series.push({
      data: seriesData,
      type: 'line',
      name: district,
      color: color[index],
    });
  });

  return (
    <div className="mt-4">
      <BarChart options={lineOptions} height="400px" />
    </div>
  );
}
