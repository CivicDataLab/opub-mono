export type Progress =
  | 'default'
  | 'incomplete'
  | 'partiallyComplete'
  | 'complete'

export interface BadgeProps {
  /** Render a pip showing the progress of a given task. */
  progress?: Progress;

 /** The content to display inside the badge. */
  children?:string;

  /** Icon to display to the left of the badge’s content. */
  icon?:React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  /**Pass a custom accessibilityLabel.*/
  statusAndProgressLabelOverride?:string
}
