import { twMerge } from 'tailwind-merge';
import { ClassNameValue } from 'tailwind-merge/dist/lib/tw-join';

export function variationName(name: string, value: string) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(inputs);
}
