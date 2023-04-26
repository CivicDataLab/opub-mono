import { redirect } from "next/navigation";

// import styles from './dashboard.module.scss';

export default async function DashboardPage() {
  redirect("/dashboard/dataset");
  // return <div className={styles.DashboardPage} />;
}
