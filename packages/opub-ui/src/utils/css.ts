import { ClassNameValue, twMerge } from 'tailwind-merge';

import { BreakpointsAlias } from '../tokens/breakpoints';

export function variationName(name: string, value: string) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(inputs);
}

// type Falsy = boolean | undefined | null | 0;

export type ResponsiveProp<T> =
  | T
  | {
      [Breakpoint in BreakpointsAlias]?: T;
    };

export function sanitizeCustomProperties(
  styles: React.CSSProperties
): React.CSSProperties | undefined {
  const nonNullValues = Object.entries(styles).filter(
    ([_, value]) => value != null
  );

  return nonNullValues.length ? Object.fromEntries(nonNullValues) : undefined;
}

export function getResponsiveProps(
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp?:
    | string
    | {
        [Breakpoint in BreakpointsAlias]?: string;
      }
) {
  if (!responsiveProp) return {};

  if (typeof responsiveProp === 'string') {
    return {
      [`--op-${componentName}-${componentProp}-xs`]: `var(--${tokenSubgroup}-${responsiveProp})`,
    };
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [
      `--op-${componentName}-${componentProp}-${breakpointAlias}`,
      `var(--${tokenSubgroup}-${aliasOrScale})`,
    ])
  );
}

export type ResponsiveValue =
  | undefined
  | string
  | {
      [Breakpoint in BreakpointsAlias]?: string;
    };

export function getResponsiveValue(
  componentName: string,
  componentProp: string,
  responsiveProp?: ResponsiveValue
) {
  if (!responsiveProp) return {};

  if (typeof responsiveProp === 'string') {
    return {
      [`--op-${componentName}-${componentProp}-xs`]: responsiveProp,
    };
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, responsiveValue]) => [
      `--op-${componentName}-${componentProp}-${breakpointAlias}`,
      responsiveValue,
    ])
  );
}
