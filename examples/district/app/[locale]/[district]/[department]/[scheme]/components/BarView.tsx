import { BarChart } from 'opub-viz/src';
import React from 'react';

export const BarView = React.forwardRef(({ data }: { data: any }, ref: any) => {
  return (
    <div ref={ref}>
      <BarChart yAxis={data.xAxis} data={data.values} height="512px" />
    </div>
  );
});
