/**
 * Toggles the theme of the page between light and dark.
 * Dark and light themes are defined by the CSS variables
 * `--color-bg-dark` and `--color-bg-light`.
 */
export function switchTheme(): void {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('opub-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('opub-theme', 'dark');
  }
}
