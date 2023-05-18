'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { Size, useWindowSize } from '@/hooks/use-window-size';
import { Box, Button, Icon, Text, Tooltip } from '@opub-cdl/ui';
import { twMerge } from 'tailwind-merge';

import { Icons } from '@/components/icons';
import styles from '../dataset.module.scss';

interface Props {
  title: string;
  primaryAction: {
    content: string;
    onAction?(): void;
  };
  secondaryAction?: {
    content: string;
    onAction?(): void;
  };
  previousPage?: {
    content: string;
    link?: LinkProps['href'];
    action?: () => void;
  };
  preFetch?: string;
  isLoading?: boolean;
}

export function ActionBar(props: Props) {
  const { width }: Size = useWindowSize();
  const iconSize = width && width < 480 ? '5' : '8';

  const router = useRouter();

  React.useEffect(() => {
    if (!props.preFetch) return;
    // router.prefetch(props.preFetch);
  }, []);

  const backButton = props.previousPage && props.previousPage?.link && (
    <Link href={props.previousPage?.link} className={styles.BackButton}>
      <Icon source={Icons.back} color="base" size={iconSize} />
      <Text visuallyHidden>Go back to {props.previousPage?.content} page</Text>
    </Link>
  );

  const backButtonAction = props.previousPage && props.previousPage?.action && (
    <button onClick={props.previousPage?.action} className={styles.BackButton}>
      <Icon source={Icons.back} color="base" size={iconSize} />
      <Text visuallyHidden>Go back to {props.previousPage?.content} page</Text>
    </button>
  );

  const btn = props.previousPage?.action ? backButtonAction : backButton;

  return (
    <div className="flex flex-wrap items-center gap-4 justify-between py-5 border-b-1 border-divider border-solid">
      <div
        className={twMerge(
          styles.ProgressNav,
          'flex items-center gap-1 sm:gap-2'
        )}
      >
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

      <div className="sm:hidden">
        <Button
          primary
          loading={props.isLoading}
          onClick={props.primaryAction?.onAction}
          connectedDisclosure={
            props.secondaryAction && {
              actions: [
                {
                  content: 'Cancel',
                  onAction: props.secondaryAction?.onAction,
                },
              ],
            }
          }
        >
          {props.primaryAction.content}
        </Button>
      </div>
      <div className="hidden sm:block">
        <Box flex alignItems="center" gap="3">
          {props.secondaryAction && (
            <Button
              plain
              disabled={props.isLoading}
              onClick={props.secondaryAction.onAction}
            >
              {props.secondaryAction.content}
            </Button>
          )}
          <Button
            primary
            loading={props.isLoading}
            onClick={props.primaryAction.onAction}
          >
            {props.primaryAction.content}
          </Button>
        </Box>
      </div>
    </div>
  );
}
