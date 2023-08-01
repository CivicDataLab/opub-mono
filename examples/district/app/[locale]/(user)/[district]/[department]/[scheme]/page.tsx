import { Text } from 'opub-ui';

import { Content } from './components/scheme-layout';
import { content, schemes } from './scheme.config';

export default function Home({
  params,
}: {
  params: { scheme: string; department: string };
}) {
  const page: { title: string; logo: string } = schemes[params.scheme];
  if (!page) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Text variant="heading3xl">404</Text>
        <Text variant="headingMd">Page not found</Text>
      </div>
    );
  }

  return (
    <main className="container py-1 lg:py-2">
      <Content data={content} params={params} schemeData={page} />
    </main>
  );
}
