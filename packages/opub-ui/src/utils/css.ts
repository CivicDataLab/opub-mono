import { ClassNameValue, twMerge } from 'tailwind-merge';

export function variationName(name: string, value: string) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(inputs);
}
