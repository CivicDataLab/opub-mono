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
  xAxis: string[] | number[];
  yAxis?: string[] | number[];
  onChartReadyCallback?: (echart: any) => void;
  data: number[] | number[][] | string[] | string[][];
  theme?: EChartsReactProps['theme'];
};

export const BarChart = ({
  data,
  xAxis,
  yAxis,
  theme = 'light',
  onChartReadyCallback,
}: Props) => {
  const option = {
    series: [
      {
        type: 'bar',
        data: data,
      },
    ],
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
      onChartReady={onChartReadyCallback}
      opts={{}}
      option={option}
    />
  );
};
