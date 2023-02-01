import { Button } from 'ui';
import styles from '../styles/pages/home.module.scss';

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
    <div className={styles.container}>
      <div className={styles.box}>
        <Button variant="primary" onClick={switchTheme}>
          Primary
        </Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="disabled">Disabled</Button>
      </div>

      <div className={styles.box}>
        <Button variant="primary" size="large">
          Large
        </Button>
        <Button size="small">Small</Button>

        <Button fluid>Fluid</Button>
      </div>
    </div>
  );
}
