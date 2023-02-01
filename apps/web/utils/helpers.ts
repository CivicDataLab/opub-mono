export function switchTheme() {
  const isDark = document.documentElement.getAttribute('data-theme');
  if (isDark === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('opub-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('opub-theme', 'dark');
  }
}
