import { features } from '../assets/json/assam.json';
import { LeafletChoropleth } from './components';

function App() {
  const legendData = [
    {
      label: '331+',
      color: '#a50f15',
    },
    {
      label: '326 - 330',
      color: '#de2d26',
    },
    {
      label: '321 - 325',
      color: '#fb6a4a',
    },
    {
      label: '316 - 320',
      color: '#fc9272',
    },
    {
      label: '311 - 315',
      color: '#fcbba1',
    },
    {
      label: '0 - 310',
      color: '#fee5d9',
    },
  ];

  const legendHeading = {
    heading: 'Districts',
    subheading: 'Average Rainfall (mm)',
  };

  const mapDataFn = (value: number) => {
    return value >= 330
      ? '#a50f15'
      : value >= 325
      ? '#de2d26'
      : value >= 320
      ? '#fb6a4a'
      : value >= 315
      ? '#fc9272'
      : value >= 310
      ? '#fcbba1'
      : '#fee5d9';
  };

  if (!features) return <div>Loading...</div>;

  return (
    <main>
      <div style={{ height: '600px' }}>
        <LeafletChoropleth
          features={features}
          mapDataFn={mapDataFn}
          legendData={legendData}
          mapProperty="dt_code"
          mapZoom={7.8}
          fillOpacity={1}
          mapCenter={[26.193, 92.3]}
          legendHeading={legendHeading}
        />
      </div>
    </main>
  );
}
export default App;
