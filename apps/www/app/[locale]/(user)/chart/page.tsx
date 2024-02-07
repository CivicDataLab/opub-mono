import { Content } from './Content';

export default async function Home() {
  const data = await fetch('http:localhost:3000/api/chart').then((res) =>
    res.json()
  );

  return (
    <main className="flex h-[90vh] w-full flex-col items-center justify-center gap-2">
      <Content data={data.svg} />
    </main>
  );
}
