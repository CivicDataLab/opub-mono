export interface CollapsibleProps {
  /** Assign a unique ID to the collapsible. For accessibility, pass this ID as the value of the triggering component’s aria-controls prop. */
  id: string;
  /** Option to show collapsible content when printing */
  expandOnPrint?: boolean;
  /** Toggle whether the collapsible is expanded or not. */
  open: boolean;
  /** Override transition properties. When set to false, disables transition completely.
   * 'var(--p-duration-150)', timingFunction: 'var(--p-ease-in-out)'}}
   */
  transition?: boolean | Transition;
  /** Callback when the animation completes. */
  onAnimationEnd?(): void;
  /** The content to display inside the collapsible. */
  children?: React.ReactNode;
}