"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Icon, Text } from "@opub-cdl/ui";
import { InsertDynamicSourceMajor } from "@shopify/polaris-icons";

import styles from "../dataset.module.scss";

export function Content() {
  const router = useRouter();

  return (
    <div className={styles.ContentWrapper}>
      <div className={styles.Content}>
        <Icon source={InsertDynamicSourceMajor} color="base" />
        <Text variant="headingSm" color="subdued">
          You have not added any datasets yet.
        </Text>
        <Box paddingBlockStart="4">
          <Button
            primary
            onClick={() => router.push("/dashboard/dataset/create")}
          >
            Add New Dataset
          </Button>
        </Box>
      </div>
    </div>
  );
}
