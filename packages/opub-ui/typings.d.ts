export {};

declare module '*.scss';

// Allow importing SVGs as React components via SVGR
declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare global {
  interface Window {
    __resource: any;
  }
}
