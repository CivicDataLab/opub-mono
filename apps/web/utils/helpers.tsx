/**
 * Toggles the theme of the page between light and dark.
 * Dark and light themes are defined by the CSS variables
 * `--color-bg-dark` and `--color-bg-light`.
 */
export function switchTheme(): void {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("opub-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("opub-theme", "dark");
  }
}

export function PropsVariationSection({
  component: Component,
  common = {},
  xAxis = {},
  yAxis = {},
  color,
  withFormik = false
}: any) {
  return (
    <table
      style={{
        borderCollapse: "collapse",
        marginBlock: "16px",
        marginInline: "auto"
      }}
    >
      <thead>
        <tr>
          <th />
          {Object.keys(xAxis).map((xVariation, key) =>
            <th
              key={key}
              style={{
                fontWeight: "normal",
                fontSize: "0.875rem"
              }}
            >
              {xVariation}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {Object.entries(yAxis).map(([yVariation, yProps]: any, y) =>
          <tr key={y}>
            <th
              style={{
                fontWeight: "normal",
                fontSize: "0.875rem",
                textAlign: "start"
              }}
            >
              {yVariation}
            </th>
            {Object.values(xAxis).map((xProps: any, x) =>
              <td
                key={x}
                style={{
                  paddingBlock: "8px",
                  paddingInline: "16px",
                  minWidth: 140
                }}
              >
                <div>
                  <Component {...common} {...xProps} {...yProps} />
                </div>
              </td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  );
}
