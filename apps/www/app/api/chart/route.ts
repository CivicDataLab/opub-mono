import { NextResponse } from 'next/server';

const echarts = require('echarts');

export async function GET() {
  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: 1760,
    height: 800,
  });

  // setOption as normal
  chart.setOption({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
    animation: false,
  });

  // Output string
  const svgStr = chart.renderToSVGString();
  return NextResponse.json({ svg: svgStr }, { status: 200 });
}
