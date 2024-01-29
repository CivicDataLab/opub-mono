import { Action } from '../button';
import React from 'react';
import { ReactElement } from 'react';

export type Error =
  | string
  | React.ReactNode
  | ReactElement
  | (string | ReactElement)[];

export type LabelledProps = {
  /** A unique identifier for the label */
  id?: string;
  /** Text for the label */
  label: React.ReactNode;
  /** Error to display beneath the label */
  error?: Error | boolean;
  /** An action */
  action?: Action;
  /** Additional hint text to display */
  helpText?: React.ReactNode;
  /** Content to display inside the connected */
  children?: React.ReactNode;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
};
