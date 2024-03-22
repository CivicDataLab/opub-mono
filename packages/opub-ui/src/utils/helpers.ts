'use client';

import React from 'react';

/**
 * Merges multiple React refs into a single callback ref.
 *
 * @param {Array<React.MutableRefObject<T> | React.LegacyRef<T>>} refs - The array of refs to be merged.
 * @return {React.RefCallback<T>} A callback ref that sets each provided ref to the same value.
 */
export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

/**
 * Clamps a number between an upper and lower bound.
 *
 * @param {number} number - The input number.
 * @param {number} min - The lower boundary.
 * @param {number} max - The upper boundary.
 * @return {number} The clamped number.
 */
export function clamp(number: number, min: number, max: number) {
  if (number < min) return min;
  if (number > max) return max;
  return number;
}

/**
 * Capitalizes the first letter of the given word and makes the rest of the word lowercase.
 *
 * @param {string} word - The word to capitalize. Defaults to an empty string if no word is provided.
 * @return {string} The input word with the first letter capitalized and the rest of the word in lowercase.
 *
 * @example
 * // returns "Hello"
 * capitalize("hello");
 *
 * @example
 * // returns "World"
 * capitalize("WORLD");
 */
export function capitalize(word = '') {
  const wordLower = word.toLowerCase();
  return wordLower.charAt(0).toUpperCase() + wordLower.slice(1);
}

/**
 * Creates an array of numbers (positive integers) ranging from 0 to the specified value.
 *
 * @param {number} len - The length of the desired array. This also determines the range of numbers in the array.
 * @return {number[]} An array of numbers ranging from 0 to len - 1.
 *
 * @example
 * // returns [0, 1, 2, 3, 4]
 * range(5);
 */
export const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

/**
 * Groups the elements of an array based on the given criteria.
 *
 * @param {any[]} arr - The array to group.
 * @param {string} criteria - The property name to group the array by.
 * @return {object} An object with keys representing the grouped criteria and values as arrays of items belonging to that group.
 *
 * @example
 * groupBy([{ 'group': 'group1', 'value': 1 }, { 'group': 'group2', 'value': 2 }], 'group');
 * // returns { 'group1': [{ 'group': 'group1', 'value': 1 }], 'group2': [{ 'group': 'group2', 'value': 2 }] }
 */
export const groupBy = function (arr: any[], criteria: string) {
  return arr.reduce(function (obj, item) {
    var key = item[criteria];
    // If the key doesn't exist yet, create it
    if (!Object.prototype.hasOwnProperty.call(obj, key)) obj[key] = [];
    // Push the value to the object
    obj[key].push(item);

    return obj;
  }, {});
};
