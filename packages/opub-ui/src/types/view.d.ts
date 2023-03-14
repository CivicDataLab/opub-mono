import { DOMProps } from './shared/dom';
import { ViewStyleProps } from './shared/style';

export interface ViewProps extends ViewStyleProps, DOMProps {
  /**
   * The element to render as the node.
   */
  elementType?: string | JSXElementConstructor<any>;
  /**
   * Children to be displayed in the View.
   */
  children?: ReactNode;
}
