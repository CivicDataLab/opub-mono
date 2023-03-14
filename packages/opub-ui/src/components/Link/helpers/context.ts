import { LinkLikeComponent } from '@ui/types/link';
import { createContext } from 'react';

export const LinkContext =
  createContext<LinkLikeComponent | undefined>(undefined);
