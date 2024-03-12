'use client';

import React from 'react';
import { EChartsOption } from 'echarts-for-react';
import { ShareDialog, useScreenshot } from 'opub-ui';
import { BarChart } from 'opub-ui/viz';
import { useMediaQuery } from 'usehooks-ts';

import { eCharts } from '@/lib/eCharts';
import { navigateEnd } from '@/lib/navigation';
import MapChart from '@/components/MapChart';

type Props = {
  options: EChartsOption;
};
export function Content({
  bar,
  line,
  stacked,
  mapOptions,
}: {
  bar: Props;
  line: Props;
  stacked: Props;
  mapOptions: any;
}) {
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

  return (
    <div className="mb-8 min-h-fit w-full">
      <Chart
        options={bar.options}
        props={{
          title: 'This title for bar chart is generated in the template',
        }}
      />
      <Chart
        options={line.options}
        props={{
          title: 'This title for line chart is generated in the template',
        }}
      />
      <Chart
        options={stacked.options}
        props={{
          title: 'This title for stack chart is generated in the template',
        }}
      />
      <ChartMap
        options={{ ...mapOptions, mapDataFn: mapDataFn }}
        props={{
          title: 'This title for map chart is generated in the template',
        }}
      />
    </div>
  );
}

const Chart = ({
  options,
  props,
}: Props & {
  props: {
    title: string;
  };
}) => {
  const [svgURL, setSvgURL] = React.useState<string>('');

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { createSvg, svgToPngURL, downloadFile } = useScreenshot();

  const generateImage = async () => {
    const dataUrlBar = eCharts({ options: options });

    const svg = await createSvg(
      <Template data={dataUrlBar} title={props.title} />,
      {
        width: 1760,
        height: 864,
      }
    );

    const dataURL = await svgToPngURL(svg);
    setSvgURL(dataURL);
  };

  return (
    <div className="mt-8 flex flex-col items-center">
      {/* This is React version of ECharts */}
      <BarChart options={options} height="500px" />

      <ShareDialog
        kind="secondary"
        size="medium"
        image={svgURL}
        alt="SVG"
        title="Share"
        props={{
          height: isDesktop ? 285 : 175,
        }}
        onOpen={generateImage}
        onDownload={() => downloadFile(svgURL, 'Chart', () => navigateEnd())}
      >
        Share
      </ShareDialog>
    </div>
  );
};

const ChartMap = ({
  options,
  props,
}: {
  options: any;
  props: {
    title: string;
  };
}) => {
  const [svgURL, setSvgURL] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<any>(null);

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { createSvg, svgToPngURL, downloadFile, domToUrl } = useScreenshot();

  async function generateImage() {
    setIsLoading(true);

    const targetElm = ref.current?.querySelector('.leaflet-map-pane');
    const dataImgURL = await domToUrl(targetElm as HTMLElement, {
      width: map.getSize().x,
      height: map.getSize().y,
      backgroundColor: 'white',
    });

    const svg = await createSvg(
      <Template data={dataImgURL} title={props.title} />,
      {
        width: map.getSize().x,
      }
    );
    const dataURL = await svgToPngURL(svg);

    setSvgURL(dataURL);
    setIsLoading(false);
  }

  return (
    <div className="mt-8 flex flex-col items-center">
      {/* This is React version of Leaflet */}
      <div className="mt-10 h-[600px] w-full p-10" ref={ref}>
        <MapChart {...options} setMap={setMap} />
      </div>

      <ShareDialog
        kind="secondary"
        size="medium"
        image={svgURL}
        loading={isLoading}
        alt="SVG"
        title="Share"
        props={{
          height: isDesktop ? 285 : 175,
        }}
        onOpen={generateImage}
        onDownload={() => downloadFile(svgURL, 'Chart', () => navigateEnd())}
      >
        Share
      </ShareDialog>
    </div>
  );
};

const Template = ({
  data,
  title,
  props,
}: {
  data: string | null;
  title: string;
  props?: {
    height: number;
    width: number;
  };
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      <p
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        {title}
      </p>
      {data ? (
        <img src={data} {...props} className="w-full" alt="SVG" />
      ) : (
        'Loading...'
      )}
    </div>
  );
};
