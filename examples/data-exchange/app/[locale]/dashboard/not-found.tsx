'use client';

import { Button, Text } from 'opub-ui';

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <Text variant="heading3xl">404</Text>
      <Text variant="headingMd">Page not found</Text>
      <div className="mt-2">
        <Button url="/">Return Home</Button>
      </div>
    </div>
  );
}
