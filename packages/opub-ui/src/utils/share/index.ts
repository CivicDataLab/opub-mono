import React from 'react';
import { domToPng } from 'modern-screenshot';
import satori from 'satori';
import { toast } from 'sonner';

import { DomPngOptions } from './types';
import { initFonts } from './utils';

/**
 * React Hook for generating screenshots.
 *
 * This hook provides several utility functions for converting React components to SVG.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {string} [params.fontPath='/Inter-Bold.ttf'] - The path to the font file to use.
 * @param {Object} [params.fontObj={ name: 'Inter', style: 'normal', weight: 700 }] - The font object to use.
 * @param {string} params.fontObj.name - The name of the font.
 * @param {string} params.fontObj.style - The style of the font.
 * @param {number} params.fontObj.weight - The weight of the font.
 * @return {Object} An object containing several utility functions.
 *
 * @example
 * const { reactToSVG } = useScreenshot();
 * const svg = await reactToSVG(<MyComponent />, { width: 800, height: 600 });
 */
export const useScreenshot = ({
  fontPath = '/Inter-Bold.ttf',
  fontObj = {
    name: 'Inter',
    style: 'normal',
    weight: 700,
  },
}: {
  fontPath?: string;
  fontObj?: {
    name: string;
    style: string;
    weight: number;
  };
}): {
  reactToSVG: (
    Component: React.ReactElement,
    props: { width: number; height?: number }
  ) => Promise<string>;
} => {
  /**
   * Converts a React component to SVG.
   *
   * @param {React.ReactElement} Component - The React component to convert.
   * @param {Object} props - The properties for the SVG.
   * @param {number} props.width - The width of the SVG.
   * @param {number} [props.height] - The height of the SVG.
   * @return {Promise<string>} A promise that resolves to the SVG string.
   */

  const reactToSVG = async (
    Component: React.ReactElement,
    props: { width: number; height?: number }
  ): Promise<string> => {
    const fonts: any = await initFonts({
      fontPath,
      fontObj,
    });
    const svg = await satori(Component as any, {
      width: props.width,
      height: props.height,
      fonts,
    });
    return svg;
  };

  return {
    reactToSVG,
  };
};

/**
 * Downloads a file from a specified URL.
 *
 * @param {string} url - The URL of the file to download.
 * @param {string} [name='File'] - The name of the file.
 * @param {() => void} [runOnFinish] - A function to run after the file has been downloaded.
 */
export const downloadFile = async (
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

/**
 * Downloads an SVG as a PNG.
 *
 * @param {HTMLElement | string | SVGElement} svg - The SVG to download.
 * @param {DomPngOptions} [props={ scale: 2 }] - The options for the PNG.
 * @param {string} [name='Image.png'] - The name of the PNG file.
 * @param {() => void} [runOnFinish] - A function to run after the PNG has been downloaded.
 */
export const downloadSvgAsPng = async (
  svg: HTMLElement | string | SVGElement,
  props: DomPngOptions = {
    scale: 2,
  },
  name: string = 'Image.png',
  runOnFinish?: () => void
) => {
  const dataImgURL = await domToURI(svg, props);
  downloadFile(dataImgURL, name, runOnFinish);
};

/**
 * Converts an SVG string to a PNG data URL.
 *
 * @param {string} svg - The SVG string to convert.
 * @return {Promise<string>} A promise that resolves to the PNG data URL.
 */
export const svgToPngURI = (svg: string): Promise<string> =>
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

/**
 * Converts an HTML element to a data URL.
 *
 * @param {HTMLElement | string | SVGElement} element - The element to convert.
 * @param {DomPngOptions} props - The options for the PNG.
 * @return {Promise<string>} A promise that resolves to the data URL.
 */
export const domToURI = async (
  element: HTMLElement | string | SVGElement,
  props: DomPngOptions
): Promise<string> => {
  let elm = typeof element === 'string' ? svgStringtoElement(element) : element;
  const { scale = 1, ...rest } = props;
  const dataImgURL = await domToPng(elm, {
    scale,
    ...rest,
  });
  return dataImgURL;
};

/**
 * Converts an SVG string to an SVGElement.
 *
 * This function uses the DOMParser API to parse the SVG string into a Document, then returns the root element of the Document (which is an SVGElement).
 *
 * @param {string} svgString - The SVG string to convert.
 * @return {SVGElement} The resulting SVGElement.
 *
 * @example
 * const svgElement = svgStringtoElement('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>');
 * console.log(svgElement); // Logs the SVGElement to the console.
 */
export function svgStringtoElement(svgString: string): SVGElement {
  var parser = new DOMParser();
  var doc = parser.parseFromString(svgString, 'image/svg+xml');
  return doc.documentElement as unknown as SVGElement;
}

/**
 * Copies an image to the clipboard.
 *
 * @param {string} URI - The data URI of the image to copy.
 * @param {string} [toastMessage] - A message to display in a toast notification after the image has been copied.
 * @param {'bottom-right' | 'top-center'} [toastPosition] - The position of the toast notification.
 * @param {() => void} [runOnFinish] - A function to run after the PNG has been downloaded.
 */
export async function copyToClipboard(
  URI: string,
  toastMessage?: string,
  toastPosition?: 'bottom-right' | 'top-center',
  runOnFinish?: () => void
) {
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
      'image/png': fetch(URI).then((response) => response.blob()),
    });

    navigator.clipboard.write([blob]);
    toastMessage &&
      toast(toastMessage, {
        position: toastPosition || 'bottom-right',
        action: {
          label: 'cancel',
          onClick: () => {},
        },
      });
    runOnFinish && runOnFinish();
  } catch (error) {
    console.error('unable to write to clipboard. Error:');
    console.log(error);
  }
}

/**
 * Shares an image using the Web Share API.
 *
 * @param {string} dataURI - The data URI of the image to share.
 * @param {() => void} [runOnFinish] - A function to run after the PNG has been downloaded.
 *
 */
export async function shareImage(dataURI: string, runOnFinish?: () => void) {
  if (!('share' in navigator)) {
    console.error('Your browser does not support the Web Share API');
    return;
  }

  const blob = await fetch(dataURI).then((res) => res.blob());
  const file = new File([blob], 'counter.png', { type: blob.type });
  const files = [file];

  const shareData = {
    files,
  };
  if (navigator.canShare(shareData)) {
    navigator.share(shareData);
    runOnFinish && runOnFinish();
  }
}

/**
 * Checks if the Web Share API and the Clipboard API are supported.
 *
 * @return {Object} An object containing two properties: `copyToClipboard` and `shareImage`, which are both booleans indicating whether the respective APIs are supported.
 */
export function shareAPISupport(): object {
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
