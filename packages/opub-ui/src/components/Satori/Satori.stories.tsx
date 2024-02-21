import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import domtoimage from 'dom-to-image';

import { ShareDialog } from '../ShareDialog';
import Card from './Card';
import { useScreenshot } from './hooks';

/**
 * An utility to generate and download reports.
 *
 * Reference: https://github.com/vercel/satori
 */
const meta = {
  title: 'Components/useScreenshot',
} satisfies Meta<typeof useScreenshot>;
export default meta;
type Story = StoryObj<typeof meta>;

const width = 1760;
const height = 800;

export const Default: Story = {
  render: () => {
    const [dataURL, setDataURL] = React.useState<string>('');
    const { createSvg, svgToPngURL, downloadFile, copyToClipboard } =
      useScreenshot();

    const handleClick = async () => {
      const svg = await createSvg(<Card width={width} height={height} />, {
        width,
        height,
      });

      const dataURL = await svgToPngURL(svg);
      setDataURL(dataURL);
    };

    return (
      <>
        <Card />
        <ShareDialog
          alt=""
          title="Download Image"
          image={dataURL}
          size="medium"
          onOpen={() => handleClick()}
          onDownload={() => downloadFile(dataURL, 'test')}
          className="mt-4"
        >
          Share
        </ShareDialog>
      </>
    );
  },
};

export const Chart: Story = {
  render: () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [chart, setChart] = React.useState<any>(null);

    React.useEffect(() => {
      if (ref.current === null) return;
      const chart = initChart(ref.current);
      setChart(chart);
    }, []);

    const [dataURL, setDataURL] = React.useState<string>('');
    const { domToUrl, downloadFile } = useScreenshot();

    const handleOpen = async () => {
      const SVG = ref.current?.querySelector('svg') as SVGElement;

      const dataImgURL = await domToUrl(SVG, {
        width: 1760,
        height: 600,
        scale: 3,
        backgroundColor: 'white',
      });

      setDataURL(dataImgURL);
    };

    return (
      <>
        <div ref={ref} className="sr-only h-[600px] w-[1760px]" />
        <ShareDialog
          props={{
            width: 1760,
            height: 384,
          }}
          alt=""
          title="Download Image"
          image={dataURL}
          size="medium"
          onOpen={handleOpen}
          onDownload={() => downloadFile(dataURL, 'Line Chart')}
          className="mt-4"
        >
          Share
        </ShareDialog>
      </>
    );
  },
};

const mapDataFn = (value: number) => {
  return value >= 330
    ? '#a50f15'
    : value >= 325
      ? '#de2d26'
      : value >= 320
        ? '#fb6a4a'
        : value >= 315
          ? '#fc9272'
          : value >= 310
            ? '#fcbba1'
            : '#fee5d9';
};

const mapProps = {
  center: [26.193, 92.3],
  zoom: 7.9,
  zoomControl: false,
  mapDataFn,
  fillOpacity: 1,
  color: 'black',
  weight: 1,
  features,
  tile: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  maxZoom: 19,
  code: 'dt_code',
};

export const Map: Story = {
  render: () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const mRef = React.useRef<HTMLDivElement>(null);

    const [map, setMap] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [dataURL, setDataURL] = React.useState<string>('');
    const { domToUrl, downloadFile, createSvg } = useScreenshot();

    React.useEffect(() => {
      if (mRef.current === null) return;
      const { map: mapInit } = initMap(mRef.current, mapProps);
      setMap(mapInit);

      return () => {
        mapInit.remove();
      };
    }, []);

    async function generateImage(map?: any) {
      setIsLoading(true);

      const targetElm = ref.current;
      const dataImgURL = await domToUrl(targetElm as HTMLElement, {
        width: map.getSize().x,
        height: map.getSize().y,
        backgroundColor: 'white',
      });

      setDataURL(dataImgURL);
      setIsLoading(false);
    }

    return (
      <>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
          className="map-count"
        >
          <p>Template Text</p>
          <div ref={mRef} className="h-[600px] w-full max-w-[1200px]" />
        </div>

        <ShareDialog
          loading={isLoading}
          alt=""
          title="Download Image"
          image={dataURL}
          size="medium"
          onOpen={() => generateImage(map)}
          onDownload={() => downloadFile(dataURL, 'Map Chart')}
          className="mt-4"
          props={{
            height: 290,
          }}
        >
          Share
        </ShareDialog>
      </>
    );
  },
};

const Template = ({ ref }: { ref: React.RefObject<HTMLDivElement> }) => {
  // const ref = React.useRef<HTMLDivElement>(null);

  // React.useEffect(() => {
  //   if (ref.current === null) return;
  //   const { map: mapInit } = initMap(ref.current, mapProps);

  //   return () => {
  //     mapInit.remove();
  //   };
  // }, []);

  document.querySelector('map-count') &&
    initMap(document.querySelector('map-count') as HTMLElement, mapProps);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
      className="map-count"
    >
      <p>Template Text</p>
      <div ref={ref} className="sr-only h-[600px] w-full max-w-[1200px]" />
    </div>
  );
};
