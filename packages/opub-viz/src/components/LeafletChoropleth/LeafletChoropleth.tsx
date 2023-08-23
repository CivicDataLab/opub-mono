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
  mapTheme?: 'light' | 'dark';

  /* zoom level of the map */
  mapZoom?: number;

  /* center of the map */
  mapCenter?: [number, number];

  /* zoom on click */
  zoomOnClick?: boolean;
};

type Props = MapProps & {
  legendData: { label: string; color: string }[];
};

export const LeafletChoropleth = (props: Props) => {
  const { legendData, ...others } = props;
  return (
    <div className={styles.Wrapper}>
      <Map {...others} />
      <Legend data={legendData} />
    </div>
  );
};

const Map = ({
  features,
  mouseover,
  mouseout,
  mapDataFn,
  click,
  mapTheme = 'light',
  mapProperty,
  mapZoom = 7.4,
  mapCenter = [26.193, 92.773],
  zoomOnClick = true,
}: MapProps) => {
  const mapRef = React.useRef<any>(null);

  function highlightFeature(e: { target: any }) {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: '#666',
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
      color: 'white',
      dashArray: '2',
      fillOpacity: 0.5,
    };
  };

  const feature: any = features.map((feature: any) => {
    return feature;
  });

  const mapThemeStyle = mapTheme === 'dark' ? 'dark_all' : 'light_all';
  return (
    <MapContainer center={mapCenter} zoom={mapZoom} ref={mapRef}>
      <TileLayer
        url={`https://cartodb-basemaps-{s}.global.ssl.fastly.net/${mapThemeStyle}/{z}/{x}/{y}.png`}
      />
      {features && (
        <GeoJSON data={feature} style={style} onEachFeature={onEachFeature} />
      )}
    </MapContainer>
  );
};

const Legend = ({ data }: { data: { label: string; color: string }[] }) => {
  return (
    <div className={styles.Legend}>
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
