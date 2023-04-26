import { Content } from "./components/content";
import { Progress } from "./components/progress";
import styles from "./dashboard.module.scss";

export default async function DashboardPage() {
  return (
    <div className={styles.DashboardPage}>
      <Progress />
      <Content />
    </div>
  );
}
