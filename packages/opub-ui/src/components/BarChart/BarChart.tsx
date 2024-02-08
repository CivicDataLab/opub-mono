'use client';

import { EChartsOption, EChartsReactProps } from 'echarts-for-react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart as Chart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';

type Props = {
  options: EChartsOption;
  /* Theme of the chart */
  theme?: EChartsReactProps['theme'];
  /* Callback function to be called when the chart is ready */
  onChartReady?: (echart: any) => void;
  /* Height of the chart */
  height?: string;
};

export const BarChart = ({
  options,
  theme = 'light',
  height = '300px',
  onChartReady,
}: Props) => {
  const option = {
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
    ...options,
  };

  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    Chart,
    LineChart,
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
