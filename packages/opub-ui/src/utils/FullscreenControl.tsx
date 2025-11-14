import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen'; // only import JS

import { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

// Extend Leaflet types for fullscreen plugin
declare module 'leaflet' {
  namespace control {
    function fullscreen(options?: any): L.Control;
  }
}

export default function FullscreenControl() {
  const map = useMap();

  useEffect(() => {
    const control = L.control.fullscreen({ position: 'topleft' });
    control.addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
}
