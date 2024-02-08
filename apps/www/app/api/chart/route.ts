import { NextRequest, NextResponse } from 'next/server';

const echarts = require('echarts');

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
    smooth?: boolean;
  }[];
};

export async function POST(request: NextRequest) {
  const options: Props = await request.json();

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

  const svgStr = chart.renderToSVGString();
  return NextResponse.json({ svg: svgStr }, { status: 200 });
}
