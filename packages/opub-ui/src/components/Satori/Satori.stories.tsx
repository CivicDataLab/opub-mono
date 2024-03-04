import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

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
