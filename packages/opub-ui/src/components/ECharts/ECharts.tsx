'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { getInstanceByDom, init } from 'echarts';
import type { EChartsOption, ECharts as EType, SetOptionOpts } from 'echarts';

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
  width?: string;
  height?: string;
}

export function ECharts({
  option,
  style,
  settings,
  loading,
  theme,
  width = '1000px',
  height = '600px',
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: EType | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener('resize', resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return <div ref={chartRef} style={{ width, height, ...style }} />;
}
