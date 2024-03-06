'use client';

import Link, { LinkProps } from 'next/link';
import { Size, useWindowSize } from '@/hooks/use-window-size';
import { Button, Icon, Text, Tooltip } from 'opub-ui';
import { twMerge } from 'tailwind-merge';

import { useIsNavigating } from '@/config/store';
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
  const isNavigating = useIsNavigating().isNavigating;

  const { width }: Size = useWindowSize();
  const iconSize = width && width < 480 ? 20 : 32;

  const backButton = props.previousPage && props.previousPage?.link && (
    <Link href={props.previousPage?.link} className={styles.BackButton}>
      <Icon source={Icons.back} size={iconSize} />
      <Text visuallyHidden>Go back to {props.previousPage?.content} page</Text>
    </Link>
  );

  const backButtonAction = props.previousPage && props.previousPage?.action && (
    <button onClick={props.previousPage?.action} className={styles.BackButton}>
      <Icon source={Icons.back} size={iconSize} />
      <Text visuallyHidden>Go back to {props.previousPage?.content} page</Text>
    </button>
  );

  const btn = props.previousPage?.action ? backButtonAction : backButton;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-5">
      <div
        className={twMerge(
          styles.ProgressNav,
          'flex items-center gap-1 sm:gap-2'
        )}
      >
        {btn && props.previousPage ? (
          <Tooltip content={`Back to ${props.previousPage?.content}`} hideArrow>
            {btn}
          </Tooltip>
        ) : (
          btn
        )}

        <div className="text-clamp max-w-[900px]">
          <Text variant="headingLg" as="h2">
            {props.title}
          </Text>
        </div>
      </div>

      <div className="sm:hidden">
        <Button
          loading={props.isLoading || isNavigating}
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
        <div className="flex items-center gap-3">
          {props.secondaryAction && (
            <Button
              kind="tertiary"
              disabled={props.isLoading || isNavigating}
              onClick={props.secondaryAction.onAction}
            >
              {props.secondaryAction.content}
            </Button>
          )}
          <Button
            loading={props.isLoading || isNavigating}
            onClick={props.primaryAction.onAction}
          >
            {props.primaryAction.content}
          </Button>
        </div>
      </div>
    </div>
  );
}
