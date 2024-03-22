import React, { Children, isValidElement } from 'react';

// Returns all children that are valid elements as an array. Can optionally be
// filtered by passing `predicate`.
export function elementChildren<T extends React.ReactElement>(
  children: React.ReactNode,
  predicate: (element: T) => boolean = () => true
): T[] {
  return Children.toArray(children).filter(
    (child) => isValidElement(child) && predicate(child as T)
  ) as T[];
}
