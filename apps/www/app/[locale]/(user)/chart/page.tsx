import json from '@/public/json/assam.json';

import { eCharts } from '@/lib/eCharts';
import { barOptions, lineOptions, stackedOptions } from './chart';
import { Content } from './Content';

export default async function Home() {
  // generated SVG string in the server
  const bar = eCharts({ options: barOptions });
  const line = eCharts({ options: lineOptions });
  const stacked = eCharts({ options: stackedOptions });

  const mapOptions = {
    mapProperty: 'dt_code',
    mapZoom: 7.9,
    fillOpacity: 1,
    mapCenter: [26.193, 92.3],
    features: json.features,
  };

  return (
    <main className="flex w-full flex-col items-center justify-center gap-2">
      <Content
        bar={{ svg: bar, options: barOptions }}
        line={{ svg: line, options: lineOptions }}
        stacked={{ svg: stacked, options: stackedOptions }}
        mapOptions={mapOptions}
      />
    </main>
  );
}
