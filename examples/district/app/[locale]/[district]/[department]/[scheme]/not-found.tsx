'use client';

import { Button, Text } from 'opub-ui';

export default function NotFound() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full">
      <Text variant="heading3xl">404</Text>
      <Text variant="headingMd">Page not found</Text>
      <div className="mt-2">
        <Button url="/">Return Home</Button>
      </div>
    </div>
  );
}
