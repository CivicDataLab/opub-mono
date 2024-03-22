import { createIntlSegmenterPolyfill } from 'intl-segmenter-polyfill';

/**
 * Initializes fonts by fetching the font data from a specified path.
 *
 * The function returns an array containing an object with the font data and the original font object properties (`name`, `style`, `weight`).
 *
 * @param {Object} params - The parameters for initializing fonts.
 * @param {string} params.fontPath - The path to fetch the font data from.
 * @param {Object} params.fontObj - The original font object.
 * @param {string} params.fontObj.name - The name of the font.
 * @param {string} params.fontObj.style - The style of the font.
 * @param {number} params.fontObj.weight - The weight of the font.
 *
 * @example
 * initFonts({
 *   fontPath: '/path/to/font',
 *   fontObj: {
 *     name: 'My Font',
 *     style: 'normal',
 *     weight: 400
 *   }
 * }).then(fonts => {
 *   // Use the fonts...
 * });
 */
export async function initFonts({
  fontPath,
  fontObj,
}: {
  fontPath: string;
  fontObj: {
    name: string;
    style: string;
    weight: number;
  };
}): Promise<
  Array<{ name: string; style: string; weight: number; data: ArrayBuffer }>
> {
  if (typeof window === 'undefined') return [];

  const [font, Segmenter] =
    window.__resource ||
    (window.__resource = await Promise.all([
      fetch(fontPath).then((res) => res.arrayBuffer()),
      !globalThis.Intl || !globalThis.Intl.Segmenter
        ? createIntlSegmenterPolyfill(
            fetch(
              new URL(
                'intl-segmenter-polyfill/dist/break_iterator.wasm',
                import.meta.url
              )
            )
          )
        : null,
    ]));

  if (Segmenter) {
    globalThis.Intl = globalThis.Intl || {};
    //@ts-expect-error
    globalThis.Intl.Segmenter = Segmenter;
  }

  return [
    {
      ...fontObj,
      data: font,
    },
  ];
}
