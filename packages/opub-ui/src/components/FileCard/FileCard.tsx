import React, { forwardRef, useEffect, useId, useRef, useState } from 'react';
import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
  IconEye,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';

import { Key } from '../../types/shared/key';
import { cn } from '../../utils';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Spinner } from '../Spinner';
import { Text } from '../Text';
import { TextField } from '../TextField';
import styles from './FileCard.module.scss';

export type FileCardStatus = 'ready' | 'processing' | 'error';

export interface FileCardProps {
  /** Display name of the file */
  name: string;
  /** File type shown as a compact chip, e.g. CSV */
  format: string;
  /** Already-formatted file size, e.g. 2.0MB */
  size: string;
  /** Already-formatted upload timestamp */
  uploadedAt: string;
  /** Original filename, shown after the meta details */
  originalName?: string;
  /**
   * Processing state. Drives the leading icon and status badge.
   * @default 'ready'
   */
  status?: FileCardStatus;
  /** Overrides the default status badge label */
  statusLabel?: string;
  /** Called with the trimmed name when inline rename is committed */
  onRename?: (name: string) => void;
  /** Called when the preview control is activated. Parent owns the surface (tray, dialog, route). */
  onView?: () => void;
  /** Called when the delete control is activated */
  onDelete?: () => void;
  className?: string;
}

const STATUS_LABEL: Record<FileCardStatus, string> = {
  ready: 'Ready',
  processing: 'Processing',
  error: 'Error',
};

const STATUS_BADGE: Record<
  FileCardStatus,
  'success' | 'info' | 'critical'
> = {
  ready: 'success',
  processing: 'info',
  error: 'critical',
};

const FileCard = forwardRef<HTMLElement, FileCardProps>(
  (
    {
      name,
      format,
      size,
      uploadedAt,
      originalName,
      status = 'ready',
      statusLabel,
      onRename,
      onView,
      onDelete,
      className,
    },
    ref
  ) => {
    const nameId = useId();
    const didCommitRef = useRef(false);
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(name);

    useEffect(() => {
      if (!editing) {
        setDraft(name);
      }
    }, [name, editing]);

    function startEditing() {
      didCommitRef.current = false;
      setDraft(name);
      setEditing(true);
    }

    function cancelEdit() {
      didCommitRef.current = true;
      setDraft(name);
      setEditing(false);
    }

    function commitEdit() {
      if (didCommitRef.current) {
        return;
      }
      didCommitRef.current = true;

      const next = draft.trim();
      setEditing(false);
      if (!next || next === name) {
        setDraft(name);
        return;
      }
      onRename?.(next);
    }

    function handleNameKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      if (event.key === Key.Enter) {
        event.preventDefault();
        commitEdit();
      }
      if (event.key === Key.Escape) {
        event.preventDefault();
        cancelEdit();
      }
    }

    const badgeLabel = statusLabel ?? STATUS_LABEL[status];
    const canRename = Boolean(onRename);
    const hasActions = Boolean(onView || onDelete);

    const statusIcon = (
      <span className={styles.StatusIcon}>
        {status === 'processing' ? (
          <Spinner size={20} color="highlight" ariaLive />
        ) : (
          <Icon
            source={
              status === 'error' ? IconAlertCircleFilled : IconCircleCheckFilled
            }
            size={20}
            color={status === 'error' ? 'critical' : 'success'}
          />
        )}
      </span>
    );

    const nameMarkup = (
      <div className={styles.NameWrap}>
        <Text
          as="p"
          id={nameId}
          variant="bodyMd"
          fontWeight="medium"
          truncate
          className={cn(styles.Name, editing && styles.NameSizer)}
        >
          {name}
        </Text>
        {editing ? (
          <div className={styles.NameField} onKeyDown={handleNameKeyDown}>
            <TextField
              name="fileName"
              label="File name"
              labelHidden
              value={draft}
              autoComplete="off"
              autoFocus
              selectTextOnFocus
              onChange={setDraft}
              onBlur={commitEdit}
            />
          </div>
        ) : null}
      </div>
    );

    const metaParts = [
      `Size: ${size}`,
      `Uploaded: ${uploadedAt}`,
      originalName ? `Original: ${originalName}` : null,
    ].filter(Boolean) as string[];

    return (
      <article
        ref={ref}
        className={cn('opub-FileCard', styles.Root, className)}
        aria-labelledby={editing ? undefined : nameId}
        aria-label={editing ? name : undefined}
      >
        {statusIcon}
        <div className={styles.Body}>
          <div className={styles.TitleRow}>
            {nameMarkup}
            {canRename ? (
              <IconButton
                icon={IconPencil}
                size="slim"
                stroke={1.5}
                color="subdued"
                withTooltip={!editing}
                tooltipText="Rename"
                tabIndex={editing ? -1 : undefined}
                aria-hidden={editing}
                className={cn(editing && styles.RenameHidden)}
                onClick={startEditing}
              >
                Rename
              </IconButton>
            ) : null}
          </div>
          <div className={styles.MetaRow}>
            {format ? (
              <span className={styles.FileType}>
                <Text variant="bodySm" as="span">
                  {format}
                </Text>
              </span>
            ) : null}
            <Text
              as="p"
              variant="bodySm"
              color="subdued"
              className={styles.Meta}
            >
              {metaParts.join('  •  ')}
            </Text>
          </div>
        </div>
        <div className={styles.Actions}>
          <Badge status={STATUS_BADGE[status]}>{badgeLabel}</Badge>
          {hasActions ? (
            <div className={styles.ActionButtons}>
              {onView ? (
                <IconButton
                  icon={IconEye}
                  size="slim"
                  stroke={1.5}
                  color="default"
                  withTooltip
                  tooltipText="View"
                  onClick={onView}
                >
                  View
                </IconButton>
              ) : null}
              {onDelete ? (
                <IconButton
                  icon={IconTrash}
                  size="slim"
                  stroke={1.5}
                  color="critical"
                  withTooltip
                  tooltipText="Delete"
                  onClick={onDelete}
                >
                  Delete
                </IconButton>
              ) : null}
            </div>
          ) : null}
        </div>
      </article>
    );
  }
);

FileCard.displayName = 'FileCard';

export { FileCard };
