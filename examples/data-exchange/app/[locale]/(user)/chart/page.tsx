import json from '@/public/json/assam.json';

import { barOptions, lineOptions, stackedOptions } from './chart';
import { Content } from './Content';

export default async function Home() {
  const mapOptions = {
    mapProperty: 'dt_code',
    mapZoom: 7.9,
    fillOpacity: 1,
    mapCenter: [26.193, 92.3],
    features: json.features,
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <Content
        bar={{ options: barOptions }}
        line={{ options: lineOptions }}
        stacked={{ options: stackedOptions }}
        mapOptions={mapOptions}
      />
    </div>
  );
}
