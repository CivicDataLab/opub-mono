import { cn } from '../../utils';
import { getRandomNumber } from '../../utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui';
import styles from './LeafletChoropleth.module.scss';
import { IconBoxMultiple } from '@tabler/icons-react';
import L from 'leaflet';
import React from 'react';
import {
  GeoJSON,
  MapContainer,
  TileLayer,
  ScaleControl,
  useMap,
} from 'react-leaflet';

const classyBrew = require('classybrew');
var brew = new classyBrew();

const layers = [
  'Gray',
  'Dark',
  'Satellite',
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
  mapDataFn: (value: any, type: 'default' | 'hover' | 'selected') => string;

  /* theme of the map */
  defaultLayer?: layerOptions;

  /* zoom level of the map */
  mapZoom?: number;

  /* center of the map */
  mapCenter?: [number, number];

  /* zoom on click */
  zoomOnClick?: boolean;

  /* zoom on mouse wheel */
  scrollWheelZoom?: boolean;

  /* hide layers */
  hideLayers?: boolean;

  /* hide scale */
  hideScale?: boolean;

  /* fill opacity */
  fillOpacity?: number;

  /* To specify if classification of data is required*/
  classifyData?: boolean;

  /* className */
  className?: string;

  /* filtering map */
  filterLabel?: string;
};

type LegendProps = {
  /* data for legend */
  legendData?: { label: string; color: string }[];
};

type Props = MapProps & LegendProps;

const LeafletChoropleth = (props: Props) => {
  const {
    legendData,
    defaultLayer = 'Gray',
    hideLayers = false,
    className,
    ...others
  } = props;

  const [selectedLayer, setSelectedLayer] =
    React.useState<layerOptions>(defaultLayer);

  return (
    <div className={cn(styles.Wrapper, className)}>
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

function FitBounds({
  filterLabel,
  features,
}: {
  filterLabel: string;
  features: any;
}) {
  if (filterLabel !== '') {
    const map = useMap();
    const filteredLayer = features.filter(
      (l: { properties: { district: string } }) =>
        l.properties.district === filterLabel
    );
    const bounds = L.geoJSON(filteredLayer[0].geometry).getBounds();
    map.fitBounds(bounds, { maxZoom: 9 });
  }
  return null;
}

const Map = ({
  features,
  mouseover,
  mouseout,
  click,
  selectedLayer,
  mapProperty = '',
  mapZoom = 7,
  mapCenter = [26.193, 92.773],
  zoomOnClick = true,
  fillOpacity,
  scrollWheelZoom = true,
  hideScale = false,
  mapDataFn,
  classifyData = false,
  filterLabel = '',
}: MapProps & {
  selectedLayer: layerOptions;
}) => {
  //to prevent map re-initialization
  const [unmountMap, setUnmountMap] = React.useState(false);
  const mapRef = React.useRef<any>(null);
  // pass values from your geojson object into an empty array
  // see link above to view geojson used in this example
  var values = [];
  for (var i = 0; i < features.length; i++) {
    if (features[i].properties[mapProperty] == null) continue;
    values.push(features[i].properties[mapProperty]);
  }

  // Set the brew properties
  brew.setSeries(values);
  brew.setNumClasses(6);
  brew.setColorCode('RdYlBu');
  brew.classify('equal_interval');

  const handleMouseOver = React.useCallback((e: { target: any }) => {
    var layer = e.target;

    layer.setStyle({
      fillColor: classifyData
        ? brew.getColorInRange(layer.feature.properties[mapProperty])
        : mapDataFn(Number(layer.feature.properties[mapProperty]), 'hover'),
      weight: 5,
      color: '#3388ff',
    });

    mouseover && mouseover(layer);
  }, []);

  const handleMouseOut = React.useCallback((e: { target: any }) => {
    var layer = e.target;

    layer.setStyle(style(layer.feature));
    mouseout && mouseout(layer);
  }, []);

  function handleClick(e: { target: any }) {
    var layer = e.target;

    layer.setStyle({
      fillColor: classifyData
        ? brew.getColorInRange(layer.feature.properties[mapProperty])
        : mapDataFn(Number(layer.feature.properties[mapProperty]), 'selected'),
    });

    if (zoomOnClick) {
      const map = mapRef.current;
      map.fitBounds(layer.getBounds());
    }

    click && click(layer);
  }

  const onEachFeature = (
    _: any,
    layer: { on: (arg0: { mouseover: any; mouseout: any; click: any }) => void }
  ) => {
    layer.on({
      mouseover: handleMouseOver,
      mouseout: handleMouseOut,
      click: handleClick,
    });
  };

  const style: any = (feature: { properties: { [x: string]: number } }) => {
    return {
      fillColor: classifyData
        ? brew.getColorInRange(feature.properties[mapProperty])
        : mapDataFn(Number(feature.properties[mapProperty]), 'default'),
      weight: 1,
      opacity: 1,
      color: selectedLayer?.includes('dark') ? '#eee' : '#889096',
      fillOpacity: fillOpacity ? fillOpacity : 0.5,
    };
  };

  const feature: any = features.map((feature: any) => {
    return feature;
  });

  const LayerMap = {
    'Satellite': 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}',
    'Gray' : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    'Dark' : 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
  }

  if (!unmountMap) {
    return (
      <MapContainer
        whenReady={() =>
          setInterval(() => {
            mapRef?.current?.invalidateSize();
          }, 100)
        }
        style={{ position: 'absolute' }}
        scrollWheelZoom={scrollWheelZoom}
        center={mapCenter}
        zoom={mapZoom}
        ref={mapRef}
      >
        <TileLayer
          url={LayerMap[selectedLayer]}
        />
        {features && (
          <>
            <GeoJSON
              data={feature}
              key={getRandomNumber(1, 10)}
              style={style}
              onEachFeature={onEachFeature}
            />
          </>
        )}
        <FitBounds filterLabel={filterLabel} features={features} />
        {!hideScale && <ScaleControl imperial={false} />}
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
            'p-3 rounded-1 cursor-pointer bg-baseVioletSolid5 shadow-insetBasic'
          )}
        >
          <span className="sr-only">Change Layer</span>
          <span className="text-baseVioletSolid10">
            <IconBoxMultiple />
          </span>
        </PopoverTrigger>
        <PopoverContent align="end">
          <fieldset>
            <legend>Change Layer</legend>
            <div className="flex flex-col">
              {layers.map((layer) => {
                return (
                  <label key={layer} className="flex gap-2 items-center">
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

export default React.memo(LeafletChoropleth);
