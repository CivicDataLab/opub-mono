import { Content } from "./components/content";
import { Progress } from "./components/progress";
import styles from "./dataset.module.scss";

export default async function DatasetPage() {
  return (
    <div className={styles.DatasetPage}>
      <Progress title="My Datasets" primaryAction={() => {}} />
      <Content />
    </div>
  );
}
