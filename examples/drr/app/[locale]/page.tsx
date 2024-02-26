import { About, HeroSection, QuickLinks, Video } from './components';

export default function Home() {
  return (
    <main className="bg-baseGreenSolid5 pb-0.5">
      <div className="inline-flex w-full flex-col items-center gap-1">
        <HeroSection />
        <QuickLinks />
        <About />
        <Video />
      </div>
    </main>
  );
}
