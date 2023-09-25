'use client';

import { MapComponent } from "./ChoroplethMap";


export function Content() {
  return (
    <div className="w-full h-full bg-surface flex">
    <MapComponent/>
    </div>
  );
}
