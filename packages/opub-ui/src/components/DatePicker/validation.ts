import React from 'react';

/** Consumer error wins; otherwise surface react-aria's validation message (or a default) when invalid. */
export function resolveDateError(
  consumerError: React.ReactNode,
  isInvalid: boolean,
  validationErrors: string[],
  fallback: React.ReactNode = 'The selected date is out of range.'
): React.ReactNode {
  if (consumerError) return consumerError;
  if (!isInvalid) return undefined;
  return validationErrors.length > 0 ? validationErrors.join(' ') : fallback;
}
