'use client';

import { Box, Button, Text } from 'opub-ui';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box
      width="100%"
      minHeight="100%"
      flex
      justifyContent="center"
      alignItems="center"
      direction="column"
      gap="3"
    >
      <Text variant="headingMd" as="h2">
        Something went wrong!
      </Text>
      <Button onClick={() => reset()}>Try again</Button>
    </Box>
  );
}
