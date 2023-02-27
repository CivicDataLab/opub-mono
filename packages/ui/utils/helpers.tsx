import { Flex } from '@ui/components';
import React from 'react';

export function PropsVariationSection({
  component: Component,
  common = {},
  xAxis = {},
  yAxis = {},
  color,
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
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  UNSAFE_style={{
                    color: color ? color : null,
                  }}
                >
                  <Component {...common} {...xProps} {...yProps} />
                </Flex>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
