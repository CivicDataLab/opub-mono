import React from 'react';

export function PropsVariationSection({
  component: Component,
  common = {},
  xAxis = {},
  yAxis = {},
}) {
  return (
    <table
      marginBlock="x16"
      marginInline="auto"
      style={{ borderCollapse: 'collapse' }}
    >
      <thead>
        <tr>
          <th />
          {Object.keys(xAxis).map((xVariation, key) => (
            <th key={key} color="hint" fontScale="c1">
              {xVariation}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(yAxis).map(([yVariation, yProps], y) => (
          <tr key={y}>
            <th color="hint" fontScale="c1">
              {yVariation}
            </th>
            {Object.values(xAxis).map((xProps, x) => (
              <td key={x} margin="none" paddingBlock="x8" paddingInline="x16">
                <div display="flex" alignItems="center" justifyContent="center">
                  <Component {...common} {...xProps} {...yProps} />
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
