import { twMerge } from 'tailwind-merge';
import { ClassNameValue } from 'tailwind-merge/dist/lib/tw-join';

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(inputs);
}

export function formatDate(
  input: string | number,
  isHyphenated = false
): string {
  const date = new Date(input);
  // If hyphendated it would return date in this format - 2023-01-01 else in April 1, 2021
  return isHyphenated
    ? new Date(
        date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })
      )
        .toISOString()
        .split('T')[0]
    : date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
}

// util function to format data in the following format "2023_08"
export function formatDateString(dateString: string) {
  // Split the string into year and month parts
  const [year, month] = dateString.split('_');

  // Create a Date object with the specified year and month (subtract 1 from the month, as months in JavaScript are zero-based)
  const dateObject = new Date(parseInt(year), parseInt(month) - 1);

  // Format the date as "Month Year"
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(dateObject);

  return formattedDate;
}

export function deSlugify(slug: string) {
  // Replace hyphens or underscores with spaces
  const deSlugified = slug.replace(/[-_]/g, ' ');
  // Capitalize the first letter of each word
  return deSlugified.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function slugify(string: string) {
  return string
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters (excluding spaces and hyphens)
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-'); // Replace consecutive hyphens with a single hyphen
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
