import { Content } from './components/Content';

export default async function Home() {
  return (
    <main className="flex h-[90vh] w-full flex-col items-center justify-center gap-2">
      <Content />
    </main>
  );
}