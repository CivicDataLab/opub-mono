import {
  DistrictSelector,
  Header,
  KeyHighlights,
  QuickLinks,
} from './components';

export default function Home() {
  return (
    <main className="bg-backgroundDefault pb-10">
      <Header />
      <div className="container">
        <KeyHighlights />
        <DistrictSelector />
        <QuickLinks />
      </div>
    </main>
  );
}
