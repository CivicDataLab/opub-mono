'use client';

import { useEffect } from 'react';
import { Button, Text } from 'opub-ui';

export default function ErrorPage({
  error,
  reset,
}: {
  error: string;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center gap-4">
      <Text variant="headingMd" as="h2">
        Something went wrong!
      </Text>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
