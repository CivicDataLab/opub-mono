import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

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
    const { createSvg, domToUrl, downloadFile, copyToClipboard } =
      useScreenshot();

    const handleClick = async () => {
      const svg = await createSvg(<Card width={width} height={height} />, {
        width,
        height,
      });
      const dataURL = await domToUrl(svg);
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
    const { createSvg, domToUrl, downloadFile, copyToClipboard } =
      useScreenshot();

    const handleOpen = async () => {
      const SVG = ref.current?.querySelector('svg') as SVGElement;

      const dataImgURL = await domToUrl(SVG, {
        width: 1760,
        height: 600,
      });

      // const svg = await createSvg(<img src={dataImgURL} alt="" />, {
      //   width: 1760,
      //   height: 600,
      // });

      // const dataURL = await domToUrl(svg, {
      //   width: 1760,
      //   height: 600,
      // });
      setDataURL(dataImgURL);
      copyToClipboard(dataImgURL, 'Image is copied to clipboard');
    };

    return (
      <>
        <div ref={ref} className="sr-only h-[600px] w-[1760px]" />
        <ShareDialog
          props={{
            width: 1760,
            height: 600,
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

export const Map: Story = {
  render: () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [dataURL, setDataURL] = React.useState<string>('');
    const { createSvg, domToUrl, downloadFile, copyToClipboard } =
      useScreenshot();

    React.useEffect(() => {
      if (ref.current === null) return;
      const { map } = initMap(ref.current);

      setMap(map);
    }, []);

    async function generateImage(map?: any) {
      setIsLoading(true);
      const dataImgURL = await domToUrl(ref.current as HTMLElement, {
        width: map.getSize().x,
        height: map.getSize().y,
      });

      // const svg = await createSvg(<img src={dataImgURL} alt="" />, {
      //   width: map.getSize().x,
      //   height: map.getSize().y,
      // });
      // const dataURL = await domToUrl(svg, {
      //   width: map.getSize().x,
      //   height: map.getSize().y,
      // });
      setDataURL(dataImgURL);
      setIsLoading(false);
      copyToClipboard(dataImgURL, 'Image is copied to clipboard');
    }

    return (
      <>
        <div ref={ref} className="h-[600px]" />
        <ShareDialog
          loading={isLoading}
          alt=""
          title="Download Image"
          image={dataURL}
          size="medium"
          onOpen={() => generateImage(map)}
          onDownload={() => downloadFile(dataURL, 'Map Chart')}
          className="mt-4"
        >
          Share
        </ShareDialog>
      </>
    );
  },
};
