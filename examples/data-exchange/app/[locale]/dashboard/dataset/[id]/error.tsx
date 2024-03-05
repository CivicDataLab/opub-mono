'use client';

import { useEffect } from 'react';
import { Box, Button, Text } from 'opub-ui';

import { LinkButton } from '@/components/Link';

const errorText: {
  [key: string]: {
    title: string;
    description: string;
    actionText: string;
    actionLink?: string;
  };
} = {
  NEXT_NOT_FOUND: {
    title: 'Dataset not found',
    description: 'The dataset you are looking for does not exist.',
    actionText: 'Go to datasets',
    actionLink: '/dashboard/dataset',
  },
  OTHER: {
    title: 'Something went wrong',
    description: 'An error occurred while loading the dataset.',
    actionText: 'Try again',
  },
};

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

  const errorType = errorText[error.message] || errorText.OTHER;

  return (
    <Box
      width="100%"
      minHeight="100%"
      flex
      justifyContent="center"
      alignItems="center"
      direction="column"
      gap="4"
    >
      <div className="flex flex-col gap-1 text-center">
        <Text variant="headingLg" as="h2">
          {errorType.title}
        </Text>
        <Text variant="bodyMd" as="p" color="subdued">
          {errorType.description}
        </Text>
      </div>
      {errorType.actionLink ? (
        <LinkButton href={errorType.actionLink}>
          {errorType.actionText}
        </LinkButton>
      ) : (
        <Button onClick={() => reset()}>{errorType.actionText}</Button>
      )}
    </Box>
  );
}
