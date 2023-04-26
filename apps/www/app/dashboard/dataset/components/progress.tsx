"use client";

import { Button, Icon, Text } from "@opub-cdl/ui";
import { ChevronLeftMinor } from "@shopify/polaris-icons";

import styles from "../dataset.module.scss";

interface Props {
  title: string;
  primaryAction(event: React.MouseEvent<HTMLButtonElement>): void;
  secondaryAction?(event: React.MouseEvent<HTMLButtonElement>): void;
  previousPage?: string;
}

export function Progress(props: Props) {
  return (
    <div className={styles.ProgressWrapper}>
      <div className={styles.Progress}>
        <div className={styles.ProgressNav}>
          <Icon source={ChevronLeftMinor} color="base" />
          <Text variant="headingLg" as="h2">
            My Datasets
          </Text>
        </div>
        <Button primary>Add New Dataset</Button>
      </div>
    </div>
  );
}
