import {
  DistrictSelector,
  Header,
  KeyHighlights,
  QuickLinks,
} from './components';

export default function Home() {
  return (
    <main className="bg-backgroundDefault pb-10 p-1 container">
      <Header />
      <div className="container">
        <KeyHighlights />
        <DistrictSelector />
        <QuickLinks />
      </div>
    </main>
  );
}
