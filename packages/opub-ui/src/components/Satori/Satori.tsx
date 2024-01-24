import { downloadSvgAsPng } from "./utils";
import { createIntlSegmenterPolyfill } from "intl-segmenter-polyfill";
import satori from "satori";

async function init() {
  if (typeof window === "undefined") return [];

  const [font, Segmenter] =
    window.__resource ||
    (window.__resource = await Promise.all([
      fetch("/Roboto-Medium.ttf").then((res) => res.arrayBuffer()),
      !globalThis.Intl || !globalThis.Intl.Segmenter
        ? createIntlSegmenterPolyfill(
            fetch(
              new URL(
                "intl-segmenter-polyfill/dist/break_iterator.wasm",
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
      name: "Roboto",
      data: font,
      weight: 500,
      style: "normal",
    },
  ];
}

export default function App({
  Component,
  props = {
    width: 1760,
    height: 800,
  },
}: {
  Component: any;
  props: any;
}) {
  const { width, height } = props;

  const handleClick = async () => {
    const fonts: any = await init();
    const svg = await satori(<Component {...props} />, {
      width,
      height,
      fonts,
    });
    downloadSvgAsPng(svg);
  };

  return (
    <>
      <Component />
      <button onClick={handleClick}>Download</button>
    </>
  );
}
