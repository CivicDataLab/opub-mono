"use client";

import { Box, Button, Icon, Text, Tooltip } from "@opub-cdl/ui";
import { ChevronLeftMinor } from "@shopify/polaris-icons";

import styles from "../dataset.module.scss";

interface Props {
  title: string;
  primaryAction: {
    content: string;
    onAction(): void;
  };
  secondaryAction?: {
    content: string;
    onAction(): void;
  };
  previousPage?: string;
}

export function Progress(props: Props) {
  const backButton = (
    <button className={styles.BackButton}>
      <Icon source={ChevronLeftMinor} color="base" />
      <Text visuallyHidden>Go back to previous page</Text>
    </button>
  );
  return (
    <div className={styles.ProgressWrapper}>
      <div className={styles.Progress}>
        <div className={styles.ProgressNav}>
          {props.previousPage
            ? <Tooltip
                content={`Back to ${props.previousPage}`}
                disableHoverableContent={!props.previousPage}
                hideArrow
                children={backButton}
              />
            : backButton}

          <Text variant="headingLg" as="h2">
            {props.title}
          </Text>
        </div>
        <Box flex alignItems="center" gap="5">
          {props.secondaryAction &&
            <Button plain onClick={props.secondaryAction.onAction}>
              {props.secondaryAction.content}
            </Button>}
          <Button primary onClick={props.primaryAction.onAction}>
            {props.primaryAction.content}
          </Button>
        </Box>
      </div>
    </div>
  );
}
