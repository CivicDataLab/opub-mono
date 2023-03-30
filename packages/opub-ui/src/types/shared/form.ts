import React from 'react';
import { ReactElement } from 'react';

export type Error =
  | string
  | React.ReactNode
  | ReactElement
  | (string | ReactElement)[];
