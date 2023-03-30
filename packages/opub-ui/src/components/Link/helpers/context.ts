import { LinkLikeComponent } from '../../../types/link';
import { createContext } from 'react';

export const LinkContext = createContext<LinkLikeComponent | undefined>(
  undefined
);
