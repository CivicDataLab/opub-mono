import { About, FocusSection, Partnerships, QuickLinks } from './components';

export default function Home() {
  return (
    <main className="bg-backgroundSolidDefault pb-10">
      <div className="inline-flex w-full flex-col items-center gap-14">
        <FocusSection />
        <QuickLinks />
        <About />
        <Partnerships />
      </div>
    </main>
  );
}
