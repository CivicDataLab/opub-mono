'use client';

import React from 'react';
import { IconHome, IconStack, IconZoomReset } from '@tabler/icons-react';
// import { FullscreenControl } from 'react-leaflet-fullscreen';

// import 'react-leaflet-fullscreen/styles.css';

// import 'leaflet/dist/leaflet.css';

import type { GeoJSON as LeafletGeoJSON, LatLngExpression } from 'leaflet';
import {
  GeoJSON,
  MapContainer,
  ScaleControl,
  TileLayer,
  useMap,
} from 'react-leaflet';

import { cn } from '../../utils';
import FullscreenControl from '../../utils/FullscreenControl';
import { Icon } from '../Icon';
import { Popover } from '../Popover';
import { RadioGroup, RadioItem } from '../RadioGroup';
import { Text } from '../Text';
import styles from './MapChart.module.scss';

/* A tile layer's URL template and the attribution required by its provider. */
export type TileLayerConfig = {
  url: string;
  attribution: string;
};

const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/**
 * Default tile layers. Only open data sources are used, so the component has no
 * built-in dependency on proprietary tile providers.  Consumers can supply their
 * own layers (e.g. satellite imagery) via the `tileLayers` prop.
 */
const defaultLayers: Record<string, TileLayerConfig> = {
  light: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: OSM_ATTRIBUTION,
  },
};

type MapProps = {
  /* Map file to be used */
  features: any;

  /* Additional map files to be displayed */
  addlFeaturesArray?: Array<any>;
  addlFeaturesStyleArray?: Array<any>;

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

  /* tile layers to make selectable, keyed by display name; defaults to an
   * OpenStreetMap layer. Override to add custom layers (e.g. satellite). */
  tileLayers?: Record<string, TileLayerConfig>;

  /* key of the tile layer to show first (must exist in `tileLayers`) */
  defaultLayer?: string;

  /* zoom level of the map */
  mapZoom?: number;

  // reset zoom
  resetZoom?: boolean;

  /* center of the map */
  mapCenter?: LatLngExpression;

  /* zoom on click */
  zoomOnClick?: boolean;

  /* hide layers */
  hideLayers?: boolean;

  /* hide scale */
  hideScale?: boolean;

  /* fill opacity */
  fillOpacity?: number;

  /* className */
  className?: string;

  /* set map reference */
  setMap?: any;

  /* full screen */
  fullScreen?: boolean;

  /* disable zoom on scroll */
  scroolWheelZoom?: boolean;

  /* min zoom */
  minZoom?: number;

  /* max zoom */
  maxZoom?: number;

  /* horizontal legend */
  horizontalLegend?: boolean;

  /* show sequential colors */
  isCustomColor?: boolean;

  /* set sequential colors */
  customColor?: (value: number) => string;

  /* height of the map */
  height?: string;
};

type LegendProps = {
  /* data for legend */
  legendData?: { label: string; color: string }[];

  /* heading for legend */
  legendHeading?: { heading: string; subheading?: string };

  /* set horizontal legend */
  horizontalLegend?: boolean;
};

type Props = MapProps & LegendProps;

const MapChart = (props: Props) => {
  const {
    defaultLayer,
    tileLayers = defaultLayers,
    className,
    ...others
  } = props;

  // Fall back to the first available layer if the requested one is missing.
  const initialLayer =
    defaultLayer && tileLayers[defaultLayer]
      ? defaultLayer
      : Object.keys(tileLayers)[0];

  //to prevent map re-initialization
  const [unmountMap, setUnmountMap] = React.useState(false);
  React.useLayoutEffect(() => {
    setUnmountMap(false);
    return () => {
      setUnmountMap(true);
    };
  }, []);

  const [selectedLayer, setSelectedLayer] =
    React.useState<string>(initialLayer);

  if (unmountMap) return <>{'loading map...'}</>;

  return (
    <div
      className={cn(styles.Wrapper, className)}
      style={{ height: props?.height }}
    >
      <Map
        layers={tileLayers}
        selectedLayer={selectedLayer}
        setLayer={setSelectedLayer}
        {...others}
      />
    </div>
  );
};

const Map = ({
  features,
  addlFeaturesArray,
  addlFeaturesStyleArray,
  mouseover,
  mouseout,
  click,
  layers,
  selectedLayer,
  mapProperty = '',
  mapZoom = 7,
  mapCenter = [26.193, 92.773],
  zoomOnClick = false,
  fillOpacity,
  hideScale = false,
  mapDataFn,
  hideLayers = false,
  setLayer,
  legendData,
  legendHeading,
  setMap,
  fullScreen = false,
  scroolWheelZoom = true,
  minZoom,
  maxZoom,
  horizontalLegend = false,
  isCustomColor = false,
  resetZoom = false,
  customColor,
}: MapProps & {
  layers: Record<string, TileLayerConfig>;
  selectedLayer: string;
  setLayer: any;
  legendData?: { label: string; color: string }[];
  legendHeading?: { heading: string; subheading?: string };
}) => {
  const [mapRef, setMapRef] = React.useState<any>(null);
  const geoJsonRef = React.useRef<LeafletGeoJSON | null>(null);

  React.useEffect(() => {
    // Remove the flag appearing before Leaflet
    const attrMap = document.querySelector('.leaflet-attribution-flag');
    attrMap?.setAttribute('style', 'display: none !important;');

    // Replace the target and rel attributes from the attribution links
    const attributionLinks = document?.querySelectorAll(
      '.leaflet-control-attribution a'
    );

    attributionLinks.forEach((link) => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }, []);

  React.useEffect(() => {
    if (mapRef && resetZoom) {
      const controlElm = mapRef._container?.querySelector('.leaflet-control');
      const button = mapRef._container.querySelector(
        '[data-type="reset-zoom"]'
      );

      controlElm?.appendChild(button);
      button.classList.remove('hidden');
    }
  }, [mapRef]);

  if (!features)
    return (
      <div className="flex h-[300px] flex-col items-center justify-center">
        <Text>Please provide GeoJSON</Text>
      </div>
    );

  if (!mapDataFn)
    return (
      <div className="flex h-[300px] flex-col items-center justify-center">
        <Text>Please provide mapDataFn</Text>
      </div>
    );

  // The per-feature callbacks (`mouseover`, `mouseout`, `click`) are captured
  // by `onEachFeature` at the time a Leaflet sub-layer is constructed (via
  // either initial mount or `addData`). With the layer staying mounted
  // across consumer re-renders, capturing the latest callback values
  // directly would freeze them at construction time; popups, hovers, etc.
  // would invoke stale callbacks referencing the original prop closures.
  // Route each through a ref that's refreshed on every render so handlers
  // always invoke the latest consumer-provided callback.
  const mouseoverRef = React.useRef(mouseover);
  const mouseoutRef = React.useRef(mouseout);
  const clickRef = React.useRef(click);
  React.useEffect(() => {
    mouseoverRef.current = mouseover;
    mouseoutRef.current = mouseout;
    clickRef.current = click;
  });

  const handleMouseOver = React.useCallback((e: { target: any }) => {
    var layer = e.target;

    layer.setStyle({
      weight: 2,
    });

    mouseoverRef.current?.(layer);
  }, []);

  const handleMouseOut = React.useCallback((e: { target: any }) => {
    var layer = e.target;

    // layer.setStyle(style(layer.feature));
    layer.setStyle({
      weight: 1,
    });
    mouseoutRef.current?.(layer);
  }, []);

  function handleClick(e: { target: any }) {
    var layer = e.target;

    if (zoomOnClick) {
      const map = mapRef.current;
      map.fitBounds(layer.getBounds());
    }

    clickRef.current?.(layer);
  }

  const onEachFeature = (_: any, layer: any) => {
    layer.on({
      mouseover: handleMouseOver,
      mouseout: handleMouseOut,
      click: handleClick,
    });
  };

  const style: any = (feature: { properties: { [x: string]: number } }) => {
    return {
      fillColor: isCustomColor
        ? customColor?.(Number(feature.properties[mapProperty]))
        : mapDataFn(Number(feature.properties[mapProperty]), 'default'),
      weight: 1,
      opacity: 1,
      color: selectedLayer === 'dark' ? '#eee' : '#000',
      fillOpacity: fillOpacity ? fillOpacity : 0.9,
    };
  };

  // React-leaflet's <GeoJSON> only consumes its `data` and `style` props at
  // mount. Without a remount, neither propagates to the underlying Leaflet
  // layer on prop changes. Push them through manually:
  //   - data changes  → clearLayers + addData (replace child paths).
  //   - style changes → setStyle (mutate fill/stroke on existing paths).
  React.useEffect(() => {
    const layer = geoJsonRef.current;
    if (!layer) return;
    layer.clearLayers();
    layer.addData(features);
    layer.setStyle(style);
  }, [
    features,
    customColor,
    fillOpacity,
    isCustomColor,
    mapDataFn,
    mapProperty,
    selectedLayer,
  ]);

  return (
    <>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        ref={(e) => {
          setMap && setMap(e);
          setMapRef(e);
        }}
        // key={new Date().getTime()}
        zoomDelta={0.5}
        zoomSnap={0.5}
        scrollWheelZoom={scroolWheelZoom}
      >
        {!hideLayers && (
          <>
            <LayerSelector
              layers={layers}
              selectedLayer={selectedLayer}
              setSelectedLayer={setLayer}
            />
            <TileLayer
              attribution={layers[selectedLayer].attribution}
              maxZoom={maxZoom}
              minZoom={minZoom}
              url={layers[selectedLayer].url}
              key={selectedLayer}
            />
          </>
        )}
        {legendData && (
          <Legend
            legendData={legendData}
            legendHeading={legendHeading}
            horizontalLegend={horizontalLegend}
          />
        )}
        {fullScreen && <FullscreenControl />}

        {features && (
          <>
            <GeoJSON
              ref={geoJsonRef}
              data={features}
              style={style}
              onEachFeature={onEachFeature}
            />

            {addlFeaturesArray &&
              addlFeaturesArray?.map((addlItem, indx) => (
                <GeoJSON
                  data={addlItem.features}
                  key={indx}
                  style={
                    addlFeaturesStyleArray
                      ? addlFeaturesStyleArray[indx]
                      : {
                          fillColor: isCustomColor
                            ? customColor?.(
                                Number(
                                  features?.properties?.[mapProperty]
                                )
                              )
                            : mapDataFn(
                                Number(
                                  features?.properties?.[mapProperty]
                                ),
                                'default'
                              ),
                          weight: 1,
                          opacity: 1,
                          color: selectedLayer === 'dark' ? '#eee' : '#000',
                          fillOpacity: fillOpacity ? fillOpacity : 0.9,
                        }
                  }
                  // onEachFeature={onEachFeature}
                />
              ))}
          </>
        )}

        {!hideScale && <ScaleControl imperial={false} />}

        <button
          onClick={() => {
            mapRef.setView(mapCenter, mapZoom);
          }}
          data-type="reset-zoom"
          className="hidden cursor-pointer rounded-b-0 border-none bg-surfaceDefault p-1 leading-[0] hover:bg-surfaceSubdued"
        >
          <span className="sr-only">Reset Zoom</span>
          <span aria-hidden="true">
            <Icon source={IconZoomReset} color="highlight" size={22} />
          </span>
        </button>
      </MapContainer>
    </>
  );
};

const Legend = ({
  legendData,
  legendHeading,
  horizontalLegend,
}: LegendProps) => {
  if (!legendData) return null;

  const className = cn(styles.Legend);
  return (
    <div className={className}>
      {legendHeading && (
        <div className="flex flex-col gap-1">
          <Text variant="headingMd">{legendHeading.heading}</Text>
          {legendHeading.subheading && (
            <Text variant="bodyMd" color="subdued">
              {legendHeading.subheading}
            </Text>
          )}
        </div>
      )}
      <div className={cn('flex gap-1', !horizontalLegend && 'flex-col')}>
        {legendData.map((item) => {
          return (
            <div
              key={item.label}
              style={{ '--color': item.color } as React.CSSProperties}
              className={cn(styles.LegendItem, horizontalLegend && 'flex-col')}
            >
              <Text variant="bodyMd">{item.label}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LayerSelector = ({
  layers,
  selectedLayer,
  setSelectedLayer,
}: {
  layers: Record<string, TileLayerConfig>;
  selectedLayer: string;
  setSelectedLayer: (selectedLayer: string) => void;
}) => {
  const className = cn(styles.LayerSelector);

  // Nothing to switch between with a single layer.
  if (Object.keys(layers).length < 2) return null;

  return (
    <div className={className}>
      <Popover>
        <Popover.Trigger>
          <button
            className={cn(
              'rounded-1 border-solid border-borderHighlightSubdued bg-surfaceHighlightSubdued p-1 leading-[0] hover:bg-surfaceHighlightDefault'
            )}
          >
            <span className="sr-only">Change Layer</span>
            <span aria-hidden="true">
              <IconStack color="var(--icon-highlight)" />
            </span>
          </button>
        </Popover.Trigger>
        <Popover.Content align="end" className="px-3 py-2">
          <RadioGroup
            onChange={(val: any) => {
              setSelectedLayer(val);
            }}
            name="mapTheme"
            value={selectedLayer}
            title="Change Layer"
          >
            {Object.keys(layers).map((layer: string) => {
              return (
                <RadioItem key={layer} value={layer}>
                  {layer}
                </RadioItem>
              );
            })}
          </RadioGroup>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default MapChart;
