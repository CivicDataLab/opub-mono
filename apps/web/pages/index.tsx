import { switchTheme } from '@/utils/helpers';
import React from 'react';
import { Button } from 'ui';
import styles from '../styles/pages/home.module.scss';

export default function Web() {
  return (
    <div className={styles.container}>
      <h1>Components</h1>
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

      <div className={styles.box}>
        <Button variant="primary" href="#">
          Link
        </Button>
      </div>
    </div>
  );
}
