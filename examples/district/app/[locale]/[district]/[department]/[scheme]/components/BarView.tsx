import { BarChart } from 'opub-ui';
import React from 'react';

export const BarView = React.forwardRef(({ data }: { data: any }, ref: any) => {
  const series = [
    {
      name: 'Bar Chart',
      data: data.values || [],
      type: 'bar',
    },
  ];
  return (
    <div ref={ref}>
      <BarChart yAxis={data.xAxis} series={series} height="512px" />
    </div>
  );
});
