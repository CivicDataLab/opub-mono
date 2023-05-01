'use client';

import Link, { LinkProps } from 'next/link';
import { Box, Button, Icon, Text, Tooltip } from '@opub-cdl/ui';

import { Icons } from '@/components/icons';
import styles from '../dataset.module.scss';

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
  previousPage?: {
    content: string;
    link?: LinkProps['href'];
    action?: () => void;
  };
}

export function ActionBar(props: Props) {
  const backButton = props.previousPage && props.previousPage?.link && (
    <Link href={props.previousPage?.link} className={styles.BackButton}>
      <Icon source={Icons.back} color="base" />
      <Text visuallyHidden>Go back to {props.previousPage?.content} page</Text>
    </Link>
  );

  const backButtonAction = props.previousPage && props.previousPage?.action && (
    <button onClick={props.previousPage?.action} className={styles.BackButton}>
      <Icon source={Icons.back} color="base" />
      <Text visuallyHidden>Go back to {props.previousPage?.content} page</Text>
    </button>
  );

  const btn = props.previousPage?.action ? backButtonAction : backButton;

  return (
    <div className={styles.ProgressWrapper}>
      <div className={styles.Progress}>
        <div className={styles.ProgressNav}>
          {btn && props.previousPage ? (
            <Tooltip
              content={`Back to ${props.previousPage?.content}`}
              hideArrow
              children={btn}
            />
          ) : (
            btn
          )}

          <Text variant="headingLg" as="h2">
            {props.title}
          </Text>
        </div>
        <Box flex alignItems="center" gap="5">
          {props.secondaryAction && (
            <Button plain onClick={props.secondaryAction.onAction}>
              {props.secondaryAction.content}
            </Button>
          )}
          <Button primary onClick={props.primaryAction.onAction}>
            {props.primaryAction.content}
          </Button>
        </Box>
      </div>
    </div>
  );
}
