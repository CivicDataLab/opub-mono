export type Progress =
  | 'default'
  | 'incomplete'
  | 'partiallyComplete'
  | 'complete';

export type Status =
  | 'info'
  | 'success'
  | 'warning'
  | 'critical'
  | 'attention'
  | 'new';

export enum StatusValue {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Critical = 'critical',
  Attention = 'attention',
  New = 'new',
}

export interface BadgeProps {
  /** Render a pip showing the progress of a given task. */
  progress?: Progress;

  /** Colors and labels the badge with the given status. */
  status?: Status;

  /** The content to display inside the badge. */
  children?: string;

  /** Icon to display to the left of the badge’s content. */
  icon?: React.ReactNode;

  /** Background color for the badge. */
  color?: string;

  /**Pass a custom accessibilityLabel.*/
  statusAndProgressLabelOverride?: string;
}
