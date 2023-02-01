import { Button } from 'ui';

export default function Web() {
  function switchTheme() {
    const isDark = document.documentElement.getAttribute('data-theme');
    if (isDark === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }
  return (
    <div>
      <h1>Web</h1>
      <Button onClick={switchTheme}>Change Theme</Button>
    </div>
  );
}
