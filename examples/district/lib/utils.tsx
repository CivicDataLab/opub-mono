import { twMerge } from 'tailwind-merge';
import { ClassNameValue } from 'tailwind-merge/dist/lib/tw-join';
import { navigateEnd, navigateStart } from './navigation';
import domtoimage from 'dom-to-image';
import { toast } from 'opub-ui';

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(inputs);
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const convertMap: any = {
  border: (value: { width: any; style: any; color: any }) => {
    return `${value.width} ${value.style} ${value.color}`;
  },
  shadow: (value: {
    offsetX: any;
    offsetY: any;
    blur: any;
    spread: any;
    color: any;
  }) => {
    return `${value.offsetX} ${value.offsetY} ${value.blur} ${value.spread} ${value.color}`;
  },
  default: (value: any) => {
    return value;
  },
};

export function convertValue(value: any, category: any) {
  return convertMap[category] ? convertMap[category](value) : value;
}

export const blobToBase64 = function (blob: Blob) {
  var reader = new FileReader();
  reader.onload = function () {
    var dataUrl: any = reader.result;
    var base64 = dataUrl?.split(',')[1];

    return base64;
  };
  reader.readAsDataURL(blob);
};

// function to convert bytes into friendly format
export function bytesToSize(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
}

export const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export function copyURLToClipboard() {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
}

export const exportAsImage = async (
  element: HTMLElement,
  imageFileName: string
) => {
  navigateStart();
  domtoimage.toJpeg(element, { quality: 0.95 }).then(function (
    dataUrl: string
  ) {
    var link = document.createElement('a');
    link.download = imageFileName;
    link.href = dataUrl;
    link.click();
    link.remove();
    navigateEnd();
    toast('Downloaded as JPEG', {
      action: {
        label: 'Dismiss',
        onClick: () => {},
      },
    });
  });
};
