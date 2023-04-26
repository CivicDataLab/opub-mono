"use client";

import { useRouter } from "next/navigation";

import { Progress } from "../components/progress";
import styles from "./create.module.scss";

export default function DatasetPage() {
  const router = useRouter();

  return (
    <div className={styles.CreatetPage}>
      <Progress
        title="Add New Dataset"
        primaryAction={{
          content: "Save & Next",
          onAction: () => {}
        }}
        secondaryAction={{
          content: "Cancel",
          onAction: () => {}
        }}
        previousPage="My Datasets"
      />
      {/* <Content /> */}
    </div>
  );
}
