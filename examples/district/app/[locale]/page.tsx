import {
  DistrictSelector,
  Header,
  KeyHighlights,
  QuickLinks,
} from './components';

export default function Home() {
  return (
    <main className="bg-backgroundSolidDefault pb-10">
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="container">
        <KeyHighlights />
        <DistrictSelector />
        <QuickLinks />
      </div>
    </main>
  );
}
