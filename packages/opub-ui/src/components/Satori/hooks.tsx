import React from 'react';
import domtoimage from 'dom-to-image';
import satori from 'satori';

import { toast } from '../Toast';
import { initFonts } from './utils';

export const useScreenshot = () => {
  const createSvg = async (
    Component: React.ReactElement,
    props: { width: number; height: number }
  ) => {
    const fonts: any = await initFonts();
    const svg = await satori(Component, {
      width: props.width,
      height: props.height,
      fonts,
    });
    return svg;
  };

  const downloadFile = async (
    url: string,
    name: string = 'File',
    runOnFinish?: () => null
  ) => {
    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('unable to download. Error:');
      console.log(error);
    } finally {
      runOnFinish && runOnFinish();
      URL.revokeObjectURL(url);
    }
  };

  const downloadSvgAsPng = async (
    svg: HTMLElement | string | SVGElement,
    props: { quality?: number; width?: number; height?: number } = {
      quality: 2,
    },
    name: string = 'Image.png',
    runOnFinish?: () => null
  ) => {
    const dataImgURL = await domToUrl(svg, props);
    try {
      const a = document.createElement('a');
      a.href = dataImgURL;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('unable to download. Error:');
      console.log(error);
    } finally {
      URL.revokeObjectURL(dataImgURL);
      runOnFinish && runOnFinish();
    }
  };

  const svgToPngURL = (svg: string) =>
    new Promise<string>((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
        URL.revokeObjectURL(img.src);
      };
      img.onerror = (e) => {
        reject(e);
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    });

  const domToUrl = async (
    element: HTMLElement | string | SVGElement,
    props: { quality?: number; width?: number; height?: number } = {
      quality: 2,
    }
  ) => {
    let elm =
      typeof element === 'string' ? svgStringtoElement(element) : element;
    const { quality, ...rest } = props;
    const dataImgURL = await domtoimage.toPng(elm, {
      quality,
      ...rest,
    });
    return dataImgURL;
  };

  function svgStringtoElement(svgString: string) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(svgString, 'image/svg+xml');
    return doc.documentElement;
  }

  async function copyToClipboard(url: string, toastMessage?: string) {
    if (!('ClipboardItem' in window)) {
      console.error(
        "Your browser doesn't support copying images into the clipboard." +
          ' If you use Firefox you can enable it' +
          ' by setting dom.events.asyncClipboard.clipboardItem to true.'
      );
      return;
    }
    try {
      const data = await fetch(url);
      const blob = await data.blob();

      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      toastMessage &&
        toast(toastMessage, {
          action: {
            label: 'cancel',
            onClick: () => {},
          },
        });
    } catch (error) {
      console.error('unable to write to clipboard. Error:');
      console.log(error);
    }
  }

  return {
    createSvg,
    domToUrl,
    downloadSvgAsPng,
    downloadFile,
    copyToClipboard,
    svgStringtoElement,
    svgToPngURL,
  };
};
