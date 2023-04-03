type BorderTokenAlias =
  | 'base'
  | 'dark'
  | 'divider'
  | 'divider-on-dark'
  | 'transparent';

export interface DividerProps {
  /** Divider border style */
  borderStyle?: BorderTokenAlias;
}
