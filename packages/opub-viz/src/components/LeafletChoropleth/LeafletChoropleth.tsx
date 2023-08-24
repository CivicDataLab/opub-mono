import { cn } from '../../utils';
import styles from './LeafletChoropleth.module.scss';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';

type MapProps = {
  /* Map file to be used */
  features: any;

  /* callback function on mouseover */
  mouseover?: (e: any) => void;

  /* callback function on mouseout */
  mouseout?: (e: any) => void;

  /* callback function on click */
  click?: (e: any) => void;

  /* property to be used for mapping value */
  mapProperty: string;

  /* function to map data to color */
  mapDataFn: (value: number) => string;

  /* theme of the map */
  mapTheme?: 'light_all' | 'dark_all';

  /* zoom level of the map */
  mapZoom?: number;

  /* center of the map */
  mapCenter?: [number, number];

  /* zoom on click */
  zoomOnClick?: boolean;
};

type LegendProps = {
  /* data for legend */
  legendData: { label: string; color: string }[];
};

type Props = MapProps & LegendProps;

export const LeafletChoropleth = (props: Props) => {
  const { legendData, mapTheme = 'light_all', ...others } = props;
  return (
    <div className={styles.Wrapper}>
      <Map mapTheme={mapTheme} {...others} />
      <Legend legendData={legendData} theme={mapTheme} />
    </div>
  );
};

const Map = ({
  features,
  mouseover,
  mouseout,
  mapDataFn,
  click,
  mapTheme,
  mapProperty,
  mapZoom = 7,
  mapCenter = [26.193, 92.773],
  zoomOnClick = true,
}: MapProps) => {
  const mapRef = React.useRef<any>(null);

  function highlightFeature(e: { target: any }) {
    var layer = e.target;

    layer.setStyle({
      weight: 3,
      color: mapTheme === 'dark_all' ? '#ddd' : '#333',
      dashArray: '',
      fillOpacity: 0.7,
    });

    mouseover && mouseover(e.target);
  }

  const resetHighlight = (e: { target: any }) => {
    e.target.setStyle(style(e.target.feature));
    mouseout && mouseout(e.target);
  };

  function zoomToFeature(e: { target: any }) {
    if (zoomOnClick) {
      const map = mapRef.current;
      map.fitBounds(e.target.getBounds());
    }

    click && click(e.target);
  }

  const onEachFeature = (
    feature: any,
    layer: { on: (arg0: { mouseover: any; mouseout: any; click: any }) => void }
  ) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
    });
  };

  const style: any = (feature: { properties: { [x: string]: number } }) => {
    return {
      fillColor: mapDataFn(Number(feature.properties[mapProperty])),
      weight: 1,
      opacity: 1,
      color: mapTheme === 'dark_all' ? '#eee' : '#444',
      dashArray: '2',
      fillOpacity: 0.5,
    };
  };

  const feature: any = features.map((feature: any) => {
    return feature;
  });

  return (
    <MapContainer center={mapCenter} zoom={mapZoom} ref={mapRef}>
      <TileLayer
        url={`https://cartodb-basemaps-{s}.global.ssl.fastly.net/${mapTheme}/{z}/{x}/{y}.png`}
      />
      {features && (
        <GeoJSON data={feature} style={style} onEachFeature={onEachFeature} />
      )}
    </MapContainer>
  );
};

const Legend = ({
  legendData: data,
  theme,
}: LegendProps & {
  theme: 'light_all' | 'dark_all';
}) => {
  const className = cn(styles.Legend, styles[theme]);

  return (
    <div className={className}>
      {data.map((item) => {
        return (
          <div
            key={item.label}
            style={{ '--color': item.color } as React.CSSProperties}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};
