import React from 'react';

type Orientation = React.AriaAttributes['aria-orientation'];
type Direction = 'ltr' | 'rtl';

export interface RadioGroupProps extends Omit<HTMLDivElement, 'dir'> {
  name?: string;
  required?: boolean;
  disabled?: boolean;
  /**
   * The orientation of the group.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   */
  orientation?: Orientation;
  /**
   * The direction of navigation between items.
   */
  dir?: Direction;
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange(value: string): void;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
}
