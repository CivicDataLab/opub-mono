'use client';

import React from 'react';
import { ShareDialog, useScreenshot } from 'opub-ui';

import { navigateEnd } from '@/lib/navigation';

export function Content({ data }: { data: string }) {
  const [svgURL, setSvgURL] = React.useState<string>('');
  const base64Svg = btoa(data);
  const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;

  const { createSvg, svgToPngURL, downloadFile } = useScreenshot();

  const handleClick = async () => {
    const svg = await createSvg(<Template data={dataUrl} />, {
      width: 1760,
      height: 864,
    });

    const dataURL = await svgToPngURL(svg);
    setSvgURL(dataURL);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {dataUrl ? (
        <img src={dataUrl} className="w-full" alt="SVG" />
      ) : (
        'Loading...'
      )}

      <ShareDialog
        kind="secondary"
        size="medium"
        image={svgURL}
        alt=""
        title="Share"
        props={{
          height: 285,
        }}
        onOpen={handleClick}
        onDownload={() =>
          downloadFile(svgURL, 'Bar Chart', () => navigateEnd())
        }
      >
        Share
      </ShareDialog>
    </div>
  );
}

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
          fontFamily: 'Inter',
        }}
      >
        Some random Chart
      </p>
      {data ? <img src={data} className="w-full" alt="SVG" /> : 'Loading...'}
    </div>
  );
};
