import React from 'react';
import { BarChart } from 'opub-ui/viz';

export const BarView = React.forwardRef(({ data }: { data: any }, ref: any) => {
  const option = {
    yAxis: {
      type: 'category',
      data: data.xAxis,
    },
    xAxis: {
      type: 'value',
    },
    series: [
      {
        data: data.values || [],
        type: 'bar',
      },
    ],
  };

  return (
    <div ref={ref}>
      <BarChart options={option} height="512px" />
    </div>
  );
});
