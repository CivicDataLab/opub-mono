import React from 'react';
import { useSearchParams } from 'next/navigation';
import * as Accordion from '@radix-ui/react-accordion';
import { Button, Divider, Icon, ProgressBar, Text } from 'opub-ui';
import { BarChart } from 'opub-ui/viz';

import { cn, deSlugify } from '@/lib/utils';
import { Icons } from '@/components/icons';
import styles from './styles.module.scss';

interface LineOptions {
  xAxis: {
    data: string[];
  };
  yAxis: {
    type: string;
  };
  series: {
    data: number[];
    type: string;
    name: string;
    color: string;
  }[];
}

export function DistrictComparison({ chartData }: { chartData: any }) {
  //const searchParams = useSearchParams();
  //const indicator = searchParams.get('indicator') || 'risk-score';

  const timePeriods = Object.keys(chartData);
  let dataObj: any = {};
  const regionArr = ['1', '4'];

  regionArr.forEach((district) => {
    const keysArray = Object.keys(
      chartData[timePeriods[0]]['flood-hazard'][district]
    );
    dataObj[district] = keysArray.join(', ');
  });

  const color = ['rgb(55,162,218)', 'rgb(55,162,7)'];

  const seriesData = Object.keys(chartData[timePeriods[0]]['flood-hazard']).map(
    (district, index) => ({
      name: dataObj[district],
      data: timePeriods.map(
        (timePeriod) =>
          chartData[timePeriod]['flood-hazard'][district][dataObj[district]]
      ),
      type: 'line',
      color: color[index],
    })
  );

  const lineOptions: LineOptions = {
    xAxis: { data: timePeriods },
    yAxis: { type: 'value' },
    series: seriesData,
  };

  return (
    <div>
      <BarChart options={lineOptions} height="500px" />
    </div>
  );
}
