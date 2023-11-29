'use client';

import { Button, Text } from 'opub-ui';
import { useEffect } from 'react';

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
    <div className="w-full min-h-full flex justify-center items-center flex-col gap-3">
      <Text variant="headingMd" as="h2">
        Something went wrong!
      </Text>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
