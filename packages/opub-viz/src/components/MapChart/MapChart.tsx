import { EChartsReactProps } from 'echarts-for-react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { MapChart as Chart } from 'echarts/charts';
import {
  GeoComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
import { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes';
import React from 'react';

type Props = {
  /* Map File */
  mapFile: { type: string; features: any } | { type: string; objects: any };
  /* Unique Map Name */
  mapName: string;
  /* Data to be displayed on the map */
  data?: { name: any; value: number }[];
  /* Name of the property in the map file to be used as the name of the region */
  nameProperty?: string;
  /* Color of the border of the map tiles */
  tileBorderColor?: string;
  /* Width of the border of the map tiles */
  tileBorderWidth?: number;
  /* Background color of the map tiles */
  tileBackgroundColor?: string;
  /* Whether to enable roaming of the map */
  roam?: boolean;
  /* Default zoom level of the map */
  zoom?: number;
  /* Whether to show the label of the map */
  showLabel?: boolean;
  /* Color of the label of the map */
  labelColor?: string;
  /* Color of the background of the map tiles when hovered */
  tileHoveredBgColor?: string;
  /* Color of the background of the map tiles when selected */
  tileSelectedBgColor?: string;
  /* Limit of the scale of the map */
  scaleLimit?: number[];
  /* Theme of the chart */
  theme?: EChartsReactProps['theme'];
  /* Callback function to be called when the chart is ready */
  onChartReady?: (echart: any) => void;
  /* Callback function to be called when a new region is selected */
  onNewSelected?: (data: any) => void;
};

export const MapChart = ({
  mapFile,
  mapName = 'map',
  data,
  nameProperty = 'GEO_NO',
  tileBorderColor = '#ffffff',
  tileBorderWidth = 0.8,
  tileBackgroundColor = '#abb0ad',
  roam = true,
  zoom = 1,
  showLabel = false,
  labelColor = '#000000',
  tileHoveredBgColor = '#ffd700',
  tileSelectedBgColor = '#ffd700cc',
  scaleLimit = [1, 2],
  theme = 'light',
  onChartReady,
  onNewSelected,
}: Props) => {
  const [mapOptions, setMapOptions] = React.useState({});
  console.log(data);

  React.useEffect(() => {
    echarts.registerMap(mapName, mapFile as GeoJSONSourceInput, {});
    const option = {
      series: [
        {
          name: 'Indicator',
          type: 'map',
          roam: roam,
          map: mapName,
          nameProperty: nameProperty,
          zoom: zoom,
          itemStyle: {
            borderColor: tileBorderColor,
            borderWidth: tileBorderWidth,
            areaColor: tileBackgroundColor,
          },
          emphasis: {
            label: {
              show: showLabel,
              color: labelColor,
            },
            itemStyle: {
              areaColor: tileHoveredBgColor,
            },
          },
          select: {
            label: {
              show: showLabel,
              color: labelColor,
            },
            itemStyle: {
              color: tileSelectedBgColor,
            },
          },
          scaleLimit: {
            min: scaleLimit[0],
            max: scaleLimit[1],
          },
          data: data,
        },
      ],
      visualMap: {
        left: 'right',
        min: 1,
        max: 1000,
        inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#c9f0fa'],
        },
        text: ['High', 'Low'],
        calculable: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
    };
    setMapOptions(option);
  }, [data, mapName, mapFile]);

  function handleClick(e: { data: any }) {
    onNewSelected && onNewSelected(e.data);
  }

  const onEvents = { click: handleClick };

  echarts.use([
    TooltipComponent,
    VisualMapComponent,
    GeoComponent,
    ToolboxComponent,
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
      option={mapOptions}
      onEvents={onEvents}
      style={{
        height: '100%',
      }}
    />
  );
};
