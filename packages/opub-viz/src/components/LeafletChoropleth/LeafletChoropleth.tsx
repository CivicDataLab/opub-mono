import { cn } from '../../utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui';
import styles from './LeafletChoropleth.module.scss';
import { IconBoxMultiple } from '@tabler/icons-react';
import React from 'react';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';

const layers = [
  'light_all',
  'light_nolabels',
  'dark_all',
  'dark_nolabels',
  'rastertiles/voyager',
  'rastertiles/voyager_nolabels',
] as const;
type layerOptions = (typeof layers)[number];

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
  mapProperty?: string;

  /* function to map data to color */
  mapDataFn?: (value: any) => string;

  /* theme of the map */
  defaultLayer?: layerOptions;

  /* zoom level of the map */
  mapZoom?: number;

  /* center of the map */
  mapCenter?: [number, number];

  /* zoom on click */
  zoomOnClick?: boolean;

  /* hide layers */
  hideLayers?: boolean;

  /* fill opacity */
  fillOpacity?: number;
};

type LegendProps = {
  /* data for legend */
  legendData?: { label: string; color: string }[];
};

type Props = MapProps & LegendProps;

export const LeafletChoropleth = (props: Props) => {
  const {
    legendData,
    defaultLayer = 'light_all',
    hideLayers = false,
    ...others
  } = props;

  const [selectedLayer, setSelectedLayer] =
    React.useState<layerOptions>(defaultLayer);

  return (
    <div className={styles.Wrapper}>
      <Map selectedLayer={selectedLayer} {...others} key={selectedLayer} />
      {!hideLayers && (
        <LayerSelector
          selectedLayer={selectedLayer}
          setSelectedLayer={setSelectedLayer}
        />
      )}
      {legendData && (
        <Legend legendData={legendData} selectedLayer={selectedLayer} />
      )}
    </div>
  );
};

const Map = ({
  features,
  mouseover,
  mouseout,
  mapDataFn,
  click,
  selectedLayer,
  mapProperty = '',
  mapZoom = 7,
  mapCenter = [26.193, 92.773],
  zoomOnClick = true,
  fillOpacity,
}: MapProps & {
  selectedLayer: layerOptions;
}) => {
  const mapRef = React.useRef<any>(null);
  const [unmountMap, setunmountMap] = React.useState(false);
  //to prevent map re-initialization
  React.useLayoutEffect(() => {
    setunmountMap(false);
    return () => {
      setunmountMap(true);
    };
  }, []);

  function highlightFeature(e: { target: any }) {
    var layer = e.target;

    layer.setStyle({
      weight: 3,
      color: selectedLayer?.includes('dark') ? '#ddd' : '#333',
      dashArray: '',
      fillOpacity: fillOpacity ? fillOpacity : 0.7,
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
      fillColor: mapDataFn
        ? mapDataFn(Number(feature.properties[mapProperty]))
        : '#fff',
      weight: 1,
      opacity: 1,
      color: selectedLayer?.includes('dark') ? '#eee' : '#444',
      dashArray: '2',
      fillOpacity: fillOpacity ? fillOpacity : 0.5,
    };
  };

  const feature: any = features.map((feature: any) => {
    return feature;
  });

  if (!unmountMap) {
    return (
      <MapContainer center={mapCenter} zoom={mapZoom} ref={mapRef}>
        <TileLayer
          url={`https://cartodb-basemaps-{s}.global.ssl.fastly.net/${selectedLayer}/{z}/{x}/{y}.png`}
        />
        {features && (
          <GeoJSON data={feature} style={style} onEachFeature={onEachFeature} />
        )}
      </MapContainer>
    );
  } else {
    return 'loading map...';
  }
};

const Legend = ({
  legendData: data,
  selectedLayer,
}: LegendProps & {
  selectedLayer: layerOptions;
}) => {
  const className = cn(styles.Legend, styles[selectedLayer]);

  return (
    <div className={className}>
      {data &&
        data.map((item) => {
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

const LayerSelector = ({
  selectedLayer,
  setSelectedLayer,
}: {
  selectedLayer: layerOptions;
  setSelectedLayer: (selectedLayer: layerOptions) => void;
}) => {
  const className = cn(styles.LayerSelector);

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger
          className={cn(
            'px-4 py-2 rounded cursor-pointer',
            selectedLayer.includes('dark')
              ? 'bg-gray-800/80 text-white'
              : 'bg-gray-200/80 text-black'
          )}
        >
          <span className="sr-only">Change Layer</span>
          <IconBoxMultiple />
        </PopoverTrigger>
        <PopoverContent align="end">
          <fieldset>
            <legend>Change Layer</legend>
            <div className="flex flex-col">
              {layers.map((layer) => {
                return (
                  <label key={layer} className="flex items-center">
                    <input
                      type="radio"
                      name="mapTheme"
                      value={layer}
                      checked={selectedLayer === layer}
                      onChange={() => setSelectedLayer(layer)}
                    />
                    <span className="ml-2">{layer}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </PopoverContent>
      </Popover>
    </div>
  );
};
