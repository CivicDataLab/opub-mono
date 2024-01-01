'use client';

import { EChartsReactProps } from 'echarts-for-react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart as Chart } from 'echarts/charts';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';

type Props = {
  /* xAxis of the chart */
  xAxis?: string[] | number[];
  /* yAxis of the chart */
  yAxis?: string[] | number[];
  /* Data to be displayed on the chart */
  series: {
    name: string;
    type: string;
    data: number[];
  }[];
  /* Theme of the chart */
  theme?: EChartsReactProps['theme'];
  /* Callback function to be called when the chart is ready */
  onChartReady?: (echart: any) => void;
  /* Height of the chart */
  height?: string;
};

export const BarChart = ({
  series,
  xAxis,
  yAxis,
  theme = 'light',
  height = '300px',
  onChartReady,
}: Props) => {
  const option = {
    series: series,
    xAxis: {
      type: xAxis ? null : 'value',
      data: xAxis,
    },
    yAxis: {
      type: yAxis ? null : 'value',
      data: yAxis,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      containLabel: true,
      left: '5%',
    },
    label: {
      show: true,
      position: 'inside',
      color: '#fff',
      fontWeight: 'bold',
    },
  };

  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    Chart,
    SVGRenderer,
  ]);

  return (
    <ReactEChartsCore
      echarts={echarts}
      notMerge={true}
      lazyUpdate={true}
      theme={theme}
      onChartReady={onChartReady}
      option={option}
      style={{ height: height, width: '100%' }}
    />
  );
};
