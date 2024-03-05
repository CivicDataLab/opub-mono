import { EChartsOption } from 'echarts-for-react';

let echarts = require('echarts');

export function eCharts({ options }: { options: EChartsOption }) {
  const option = {
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
    animation: false,
    ...options,
  };

  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: 1760,
    height: 800,
  });

  chart.setOption(option);
  const dataUrlBar = `data:image/svg+xml;base64,${btoa(chart.renderToSVGString())}`;

  return dataUrlBar;
}
