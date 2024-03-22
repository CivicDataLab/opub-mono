import { ClassNameValue, twMerge } from 'tailwind-merge';

type VariationName = (name: string, value: string) => string;

/**
 * Constructs a variation name by capitalizing the first letter of the value and appending it to the name.
 *
 * @example
 * // returns "colorRed"
 * variationName("color", "red");
 */
export const variationName: VariationName = (name: string, value: string) => {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

/**
 * A utility function that merges multiple class names into a single string.
 *
 * This function uses the `twMerge` function from the `twin.macro` library to merge the class names.
 * It accepts an array of class names, which can be strings, arrays of strings, or objects with class names as keys and boolean values.
 *
 * @example
 * // returns "text-red-500 bg-blue-500"
 * cn('text-red-500', 'bg-blue-500');
 */
export function cn(...inputs: ClassNameValue[]) {
  return twMerge(inputs);
}
