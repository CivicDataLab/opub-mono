"use client";

import { useRouter } from "next/navigation";

import { Content } from "./components/content";
import { Progress } from "./components/progress";
import styles from "./dataset.module.scss";

export default function DatasetPage() {
  const router = useRouter();

  return (
    <div className={styles.DatasetPage}>
      <Progress
        title="My Datasets"
        primaryAction={{
          content: "Add New Dataset",
          onAction: () => router.push("/dashboard/dataset/create")
        }}
      />
      <Content />
    </div>
  );
}
