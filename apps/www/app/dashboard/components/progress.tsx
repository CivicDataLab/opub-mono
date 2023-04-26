"use client";

import { Button, Icon, Text } from "@opub-cdl/ui";
import { ChevronLeftMinor } from "@shopify/polaris-icons";

import styles from "../dashboard.module.scss";

export function Progress() {
  return (
    <div className={styles.ProgressWrapper}>
      <div className={styles.Progress}>
        <div className={styles.ProgressNav}>
          <Icon source={ChevronLeftMinor} color="base" />
          <Text variant="headingLg">My Datasets</Text>
        </div>
        <Button primary>Add New Dataset</Button>
      </div>
    </div>
  );
}
