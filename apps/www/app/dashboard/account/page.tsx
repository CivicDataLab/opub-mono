import { InProgress } from '../components/in-progress';
import styles from './account.module.scss';

export default async function DashboardPage() {
  return (
    <div className={styles.Container}>
      <InProgress />
    </div>
  );
}
