import { Text } from 'opub-ui';

import { Content } from './components/department-layout';
import { content, departments } from './department.config';

export default function Home({ params }: { params: { department: string } }) {
  const page: { title: string } = departments[params.department];
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
      <Content
        data={content}
        departmentData={{ ...page, href: params.department }}
      />
    </main>
  );
}
