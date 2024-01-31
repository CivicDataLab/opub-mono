import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import domtoimage from 'dom-to-image';

import { ShareDialog } from '../ShareDialog';
import Card from './Card';
import { initChart } from './chart';
import { useScreenshot } from './hooks';
import { initMap } from './map';

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
      copyToClipboard(dataURL, 'Image is copied to clipboard');
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
    React.useEffect(() => {
      if (ref.current === null) return;
      initChart(ref.current);
    }, []);

    const [dataURL, setDataURL] = React.useState<string>('');
    const { createSvg, svgToPngURL, downloadFile, copyToClipboard } =
      useScreenshot();

    const handleOpen = async () => {
      const SVG = ref.current?.querySelector('svg') as SVGElement;
      const ChartDataURL = await svgToPngURL(SVG.outerHTML);

      const svg = await createSvg(<img src={ChartDataURL} alt="" />, {
        width: SVG.clientWidth,
        height: SVG.clientHeight,
      });
      const dataURL = await svgToPngURL(svg);
      setDataURL(dataURL);
      copyToClipboard(dataURL, 'Image is copied to clipboard');
    };

    return (
      <>
        <div ref={ref} className="h-[400px]" />
        <ShareDialog
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

export const Map: Story = {
  render: () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState<any>(null);

    React.useEffect(() => {
      if (ref.current === null) return;
      const { map } = initMap(ref.current);
      setMap(map);
    }, []);

    const [dataURL, setDataURL] = React.useState<string>('');
    const { createSvg, svgToPngURL, downloadFile, copyToClipboard } =
      useScreenshot();

    const handleOpen = async () => {
      const dataImgURL = await domtoimage.toPng(ref.current as HTMLElement, {
        quality: 2,
        width: map.getSize().x,
        height: map.getSize().y,
      });

      const svg = await createSvg(<img src={dataImgURL} alt="" />, {
        width: map.getSize().x,
        height: map.getSize().y,
      });

      const dataURL = await svgToPngURL(svg);
      setDataURL(dataURL);
      copyToClipboard(dataURL, 'Image is copied to clipboard');
    };

    return (
      <>
        <div ref={ref} className="h-[600px]" />
        <ShareDialog
          alt=""
          title="Download Image"
          image={dataURL}
          size="medium"
          onOpen={handleOpen}
          onDownload={() => downloadFile(dataURL, 'Map Chart')}
          className="mt-4"
        >
          Share
        </ShareDialog>
      </>
    );
  },
};
