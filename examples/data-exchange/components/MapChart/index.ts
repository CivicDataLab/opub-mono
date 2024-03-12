import dynamic from 'next/dynamic';

const MapChart = dynamic(() => import('./MapChart'), {
  ssr: false,
});

export default MapChart;
