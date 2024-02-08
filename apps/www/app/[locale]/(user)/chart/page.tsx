import { barOptions, lineOptions, stackedOptions } from './chart';
import { Content } from './Content';

export default async function Home() {
  const bar = await fetch('http:localhost:3000/api/chart', {
    method: 'POST',
    body: JSON.stringify(barOptions),
  }).then((res) => res.json());

  const line = await fetch('http:localhost:3000/api/chart', {
    method: 'POST',
    body: JSON.stringify(lineOptions),
  }).then((res) => res.json());

  const stacked = await fetch('http:localhost:3000/api/chart', {
    method: 'POST',
    body: JSON.stringify(stackedOptions),
  }).then((res) => res.json());

  return (
    <main className="flex  w-full flex-col items-center justify-center gap-2">
      <Content
        bar={{ svg: bar.svg, options: barOptions }}
        line={{ svg: line.svg, options: lineOptions }}
        stacked={{ svg: stacked.svg, options: stackedOptions }}
      />
    </main>
  );
}
