import { Content } from './components/Content';

export default async function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <Content />
    </div>
  );
}
