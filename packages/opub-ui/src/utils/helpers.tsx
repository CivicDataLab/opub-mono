import { Flex, Form } from '@ui/components';
import React from 'react';

export function PropsVariationSection({
  component: Component,
  common = {},
  xAxis = {},
  yAxis = {},
  color,
  withFormik = false,
}: any) {
  return (
    <table
      style={{
        borderCollapse: 'collapse',
        marginBlock: '16px',
        marginInline: 'auto',
      }}
    >
      <thead>
        <tr>
          <th />
          {Object.keys(xAxis).map((xVariation, key) => (
            <th
              key={key}
              style={{
                fontWeight: 'normal',
                fontSize: '0.875rem',
              }}
            >
              {xVariation}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(yAxis).map(([yVariation, yProps]: any, y) => (
          <tr key={y}>
            <th
              style={{
                fontWeight: 'normal',
                fontSize: '0.875rem',
                textAlign: 'start',
              }}
            >
              {yVariation}
            </th>
            {Object.values(xAxis).map((xProps: any, x) => (
              <td
                key={x}
                style={{
                  paddingBlock: '8px',
                  paddingInline: '16px',
                  minWidth: 140,
                }}
              >
                <div>
                  {withFormik ? (
                    <Form>
                      <Component {...common} {...xProps} {...yProps} />
                    </Form>
                  ) : (
                    <Component {...common} {...xProps} {...yProps} />
                  )}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// _isMockFunction
export function isMockFunction(func: any) {
  return func._isMockFunction;
}

export function stopPropagation(
  event: React.MouseEvent | React.KeyboardEvent | React.FormEvent
) {
  event.stopPropagation();
}

export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export const useForwardRef = <T,>(
  ref: React.ForwardedRef<T>,
  initialValue: any = null
) => {
  const targetRef = React.useRef<T>(initialValue);

  React.useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};
