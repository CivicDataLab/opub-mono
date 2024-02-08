import { eCharts } from '@/lib/eCharts';
import { barOptions, lineOptions, stackedOptions } from './chart';
import { Content } from './Content';

export default async function Home() {
  // generated SVG string in the server
  const bar = eCharts({ options: barOptions });
  const line = eCharts({ options: lineOptions });
  const stacked = eCharts({ options: stackedOptions });

  return (
    <main className="flex  w-full flex-col items-center justify-center gap-2">
      <Content
        bar={{ svg: bar, options: barOptions }}
        line={{ svg: line, options: lineOptions }}
        stacked={{ svg: stacked, options: stackedOptions }}
      />
    </main>
  );
}
