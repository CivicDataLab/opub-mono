'use client';

import React from 'react';
import { EChartsOption } from 'echarts-for-react';
import { ShareDialog, useScreenshot } from 'opub-ui';
import { BarChart } from 'opub-ui/viz';

import { navigateEnd } from '@/lib/navigation';

type Props = {
  svg: string;
  options: EChartsOption;
};
export function Content({
  bar,
  line,
  stacked,
}: {
  bar: Props;
  line: Props;
  stacked: Props;
}) {
  return (
    <div className="mb-8 min-h-fit w-full">
      <Chart options={bar.options} svg={bar.svg} />
      <Chart options={line.options} svg={line.svg} />
      <Chart options={stacked.options} svg={stacked.svg} />
    </div>
  );
}

const Chart = ({ options, svg }: Props) => {
  const [svgURL, setSvgURL] = React.useState<string>('');
  const base64SvgBar = btoa(svg);
  const dataUrlBar = `data:image/svg+xml;base64,${base64SvgBar}`;

  const { createSvg, svgToPngURL, downloadFile } = useScreenshot();

  const handleClick = async () => {
    const svg = await createSvg(<Template data={dataUrlBar} />, {
      width: 1760,
      height: 864,
    });

    const dataURL = await svgToPngURL(svg);
    setSvgURL(dataURL);
  };

  return (
    <div className="mt-8 flex flex-col items-center">
      <BarChart options={options} height="500px" />

      <ShareDialog
        kind="secondary"
        size="medium"
        image={svgURL}
        alt="SVG"
        title="Share"
        props={{
          height: 285,
        }}
        onOpen={handleClick}
        onDownload={() => downloadFile(svgURL, 'Chart', () => navigateEnd())}
      >
        Share
      </ShareDialog>
    </div>
  );
};

const Template = ({ data }: { data: string | null }) => {
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
        Some random Chart
      </p>
      {data ? <img src={data} className="w-full" alt="SVG" /> : 'Loading...'}
    </div>
  );
};