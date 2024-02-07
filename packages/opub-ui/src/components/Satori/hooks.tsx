import React from 'react';
import { domToDataUrl, domToPng } from 'modern-screenshot';
import satori from 'satori';

import { toast } from '../Toast';
import { DomPngOptions } from './types';
import { initFonts } from './utils';

export const useScreenshot = () => {
  // use satori to create svg
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
    runOnFinish?: () => void
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
    props: DomPngOptions = {
      scale: 2,
    },
    name: string = 'Image.png',
    runOnFinish?: () => void
  ) => {
    const dataImgURL = await domToUrl(svg, props);
    downloadFile(dataImgURL, name, runOnFinish);
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
    props: DomPngOptions
  ) => {
    let elm =
      typeof element === 'string' ? svgStringtoElement(element) : element;
    const { scale = 1, ...rest } = props;
    const dataImgURL = await domToPng(elm, {
      scale,
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
      const blob = new ClipboardItem({
        'image/png': fetch(url).then((response) => response.blob()),
      });

      navigator.clipboard.write([blob]);
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

  async function shareImage(dataUrl: string) {
    if (!('share' in navigator)) {
      console.error('Your browser does not support the Web Share API');
      return;
    }

    const blob = await fetch(dataUrl).then((res) => res.blob());
    const file = new File([blob], 'counter.png', { type: blob.type });
    const files = [file];

    const shareData = {
      files,
    };
    if (navigator.canShare(shareData)) {
      navigator.share(shareData);
    }
  }

  function apiSupport() {
    const [apis, setApis] = React.useState({
      copyToClipboard: false,
      shareImage: false,
    });

    const getApiSupport = () => {
      return {
        copyToClipboard: 'ClipboardItem' in window,
        shareImage: 'share' in navigator,
      };
    };

    React.useEffect(() => {
      setApis(getApiSupport());
    }, []);

    return apis;
  }

  return {
    createSvg,
    domToUrl,
    downloadSvgAsPng,
    downloadFile,
    copyToClipboard,
    svgStringtoElement,
    svgToPngURL,
    shareImage,
    apiSupport,
  };
};
