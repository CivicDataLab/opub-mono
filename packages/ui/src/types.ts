export interface BaseButtonProps {
  /** A unique identifier for the button */
  id?: string;
  /** A destination to link to, rendered in the href attribute of a link */
  url?: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value */
  download?: string | boolean;
  /** Allows the button to submit a form */
  submit?: boolean;
  /** Disables the button, disallowing interaction */
  disabled?: boolean;
  /** Replaces button text with a spinner while a background action is being performed */
  loading?: boolean;
  /** Sets the button in a pressed state */
  pressed?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** A valid WAI-ARIA role to define the semantic value of this element */
  role?: string;
  /** Id of the element the button controls */
  ariaControls?: string;
  /** Tells screen reader the controlled element is expanded */
  ariaExpanded?: boolean;
  /** Indicates the ID of the element that describes the button */
  ariaDescribedBy?: string;
  /** Indicates the current checked state of the button when acting as a toggle or switch */
  ariaChecked?: 'false' | 'true';
  /** Callback when clicked */
  onClick?(): void;
  /** Callback when button becomes focussed */
  onFocus?(): void;
  /** Callback when focus leaves button */
  onBlur?(): void;
  /** Callback when a keyup event is registered on the button */
  onKeyUp?(event: React.KeyboardEvent<HTMLButtonElement>): void;
  /** Callback when a keydown event is registered on the button */
  onKeyDown?(event: React.KeyboardEvent<HTMLButtonElement>): void;
  /** Callback when mouse enter */
  onMouseEnter?(): void;
  /** Callback when element is touched */
  onTouchStart?(): void;
  /** Callback when pointerdown event is being triggered */
  onPointerDown?(): void;
}

export interface Action {
  /** A unique identifier for the action */
  id?: string;
  /** Content the action displays */
  content?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** A destination to link to, rendered in the action */
  url?: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Callback when an action takes place */
  onAction?(): void;
  /** Callback when mouse enter */
  onMouseEnter?(): void;
  /** Callback when element is touched */
  onTouchStart?(): void;
}

export interface DisableableAction extends Action {
  /** Whether or not the action is disabled */
  disabled?: boolean;
}

export interface DestructableAction extends Action {
  /** Destructive action */
  destructive?: boolean;
}

export interface ActionListItemDescriptor
  extends DisableableAction,
    DestructableAction {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;

  /** Additional hint text to display with item */
  helpText?: React.ReactNode;
  /** Prefix source */
  prefix?: React.ReactNode;
  /** Suffix source */
  suffix?: React.ReactNode;
  /**  Add an ellipsis suffix to action content */
  ellipsis?: boolean;
  /** Whether the action is active or not */
  active?: boolean;
  /** Defines a role for the action */
  role?: string;
}

export interface ConnectedDisclosure {
  /** Visually hidden label for the connected disclosure button.
   * @default 'Related actions'
   */
  accessibilityLabel?: string;
  /** Whether or not the disclosure is disabled */
  disabled?: boolean;
  /** List of actions */
  actions: ActionListItemDescriptor[];
}
