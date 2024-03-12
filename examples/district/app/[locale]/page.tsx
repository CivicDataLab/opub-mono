import {
  DistrictSelector,
  DistrictSelectorMobile,
  Header,
  KeyHighlights,
  QuickLinks,
} from './components';

export default function Home() {
  return (
    <div className="bg-backgroundSolidDefault pb-10">
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="container">
        <KeyHighlights />
        <DistrictSelector />
        <DistrictSelectorMobile />
        <QuickLinks />
      </div>
    </div>
  );
}
