'use client';

import React, {
  FunctionComponent,
  RefAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IconAlertCircle, IconUpload } from '@tabler/icons-react';

import { cn, variationName } from '../../utils/css';
import { debounce } from '../../utils/debounce';
import { useComponentDidMount } from '../../utils/hooks/use-component-did-mount';
import { useEventListener } from '../../utils/hooks/use-event-listener';
import { useToggle } from '../../utils/hooks/use-toggle';
import { isServer } from '../../utils/target';
import { Icon } from '../Icon';
import { Labelled, LabelledProps } from '../Labelled';
import { Text } from '../Text';
import { FileUpload } from './components';
import { DropZoneContext } from './context';
import styles from './DropZone.module.scss';
import {
  defaultAllowMultiple,
  DropZoneEvent,
  fileAccepted,
  getDataTransferFiles,
} from './utils';

export type DropZoneFileType = 'file' | 'image' | 'video';

export interface DropZoneProps {
  /** Label for the file input */
  label?: React.ReactNode;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** ID for file input */
  id?: string;
  /** Allowed file types */
  accept?: string;
  /**
   * Whether is a file or an image
   * @default 'file'
   */
  type?: DropZoneFileType;
  /** Sets an active state */
  active?: boolean;
  /** Sets an error state */
  error?: boolean;
  /**
   * Displays an outline border
   * @default true
   */
  outline?: boolean;
  /**
   * Displays an overlay on hover
   * @default true
   */
  overlay?: boolean;
  /** Text that appears in the overlay */
  overlayText?: string;
  /** Text that appears in the overlay when set in error state */
  errorOverlayText?: string;
  /**
   * Allows multiple files to be uploaded at once
   * @default true
   */
  allowMultiple?: boolean;
  /** Sets a disabled state */
  disabled?: boolean;
  /** The child elements to render in the dropzone. */
  children?: string | React.ReactNode;
  /** Allows a file to be dropped anywhere on the page */
  dropOnPage?: boolean;
  /** Sets the default file dialog state */
  openFileDialog?: boolean;
  /** Allows child content to adjust height */
  variableHeight?: boolean;
  /** Adds custom validations */
  customValidator?(file: File): boolean;
  /** Callback triggered on click */
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  /** Callback triggered on any file drop */
  onDrop?(files: File[], acceptedFiles: File[], rejectedFiles: File[]): void;
  /** Callback triggered when at least one of the files dropped was accepted */
  onDropAccepted?(acceptedFiles: File[]): void;
  /** Callback triggered when at least one of the files dropped was rejected */
  onDropRejected?(rejectedFiles: File[]): void;
  /** Callback triggered when one or more files are dragging over the drag area */
  onDragOver?(): void;
  /** Callback triggered when one or more files entered the drag area */
  onDragEnter?(): void;
  /** Callback triggered when one or more files left the drag area */
  onDragLeave?(): void;
  /** Callback triggered when the file dialog is canceled */
  onFileDialogClose?(): void;
  /** Whether the field is required */
  required?: boolean;
}

// @ts-ignore
export const DropZone: React.ForwardRefExoticComponent<
  DropZoneProps & RefAttributes<HTMLDivElement>
> & {
  FileUpload: typeof FileUpload;
} = React.forwardRef(function DropZone(
  {
    dropOnPage,
    label,
    labelAction,
    labelHidden,
    children,
    disabled = false,
    outline = true,
    accept,
    active,
    overlay = true,
    allowMultiple = defaultAllowMultiple,
    overlayText,
    errorOverlayText,
    type = 'file',
    onClick,
    error,
    openFileDialog,
    variableHeight,
    onFileDialogClose,
    customValidator,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onDragEnter,
    onDragOver,
    onDragLeave,
  }: DropZoneProps,
  ref: React.Ref<HTMLDivElement>
) {
  const node = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragTargets = useRef<EventTarget[]>([]);

  const adjustSize = useCallback(
    debounce(
      () => {
        if (!node.current) {
          return;
        }
        if (variableHeight) {
          setMeasuring(false);
          return;
        }

        let size = 'large';
        const width = node.current.getBoundingClientRect().width;

        if (width < 100) {
          size = 'small';
        } else if (width < 160) {
          size = 'medium';
        }

        setSize(size);
        measuring && setMeasuring(false);
      },
      50,
      { trailing: true }
    ),
    []
  );

  const [dragging, setDragging] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const {
    value: focused,
    setTrue: handleFocus,
    setFalse: handleBlur,
  } = useToggle(false);
  const [size, setSize] = useState('large');
  const [measuring, setMeasuring] = useState(true);

  const getValidatedFiles = useCallback(
    (files: File[] | DataTransferItem[]) => {
      const acceptedFiles: File[] = [];
      const rejectedFiles: File[] = [];

      Array.from(files as File[]).forEach((file: File) => {
        !fileAccepted(file, accept) ||
        (customValidator && !customValidator(file))
          ? rejectedFiles.push(file)
          : acceptedFiles.push(file);
      });

      if (!allowMultiple) {
        acceptedFiles.splice(1, acceptedFiles.length);
        rejectedFiles.push(...acceptedFiles.slice(1));
      }

      return { files, acceptedFiles, rejectedFiles };
    },
    [accept, allowMultiple, customValidator]
  );

  const handleDrop = useCallback(
    (event: DropZoneEvent) => {
      stopEvent(event);
      if (disabled) return;

      const fileList = getDataTransferFiles(event);

      const { files, acceptedFiles, rejectedFiles } =
        getValidatedFiles(fileList);

      dragTargets.current = [];

      setDragging(false);
      setInternalError(rejectedFiles.length > 0);

      onDrop && onDrop(files as File[], acceptedFiles, rejectedFiles);
      onDropAccepted && acceptedFiles.length && onDropAccepted(acceptedFiles);
      onDropRejected && rejectedFiles.length && onDropRejected(rejectedFiles);

      if (!(event.target && 'value' in event.target)) return;

      event.target.value = '';
    },
    [disabled, getValidatedFiles, onDrop, onDropAccepted, onDropRejected]
  );

  const handleDragEnter = useCallback(
    (event: DropZoneEvent) => {
      stopEvent(event);
      if (disabled) return;

      const fileList = getDataTransferFiles(event);

      if (event.target && !dragTargets.current.includes(event.target)) {
        dragTargets.current.push(event.target);
      }

      if (dragging) return;

      const { rejectedFiles } = getValidatedFiles(fileList);

      setDragging(true);
      setInternalError(rejectedFiles.length > 0);

      onDragEnter && onDragEnter();
    },
    [disabled, dragging, getValidatedFiles, onDragEnter]
  );

  const handleDragOver = useCallback(
    (event: DropZoneEvent) => {
      stopEvent(event);
      if (disabled) return;
      onDragOver && onDragOver();
    },
    [disabled, onDragOver]
  );

  const handleDragLeave = useCallback(
    (event: DropZoneEvent) => {
      event.preventDefault();

      if (disabled) return;

      dragTargets.current = dragTargets.current.filter((el: any) => {
        const compareNode = dropOnPage && !isServer ? document : node.current;

        return el !== event.target && compareNode && compareNode.contains(el);
      });

      if (dragTargets.current.length > 0) return;

      setDragging(false);
      setInternalError(false);

      onDragLeave && onDragLeave();
    },
    [dropOnPage, disabled, onDragLeave]
  );

  const dropNode = dropOnPage && !isServer ? document : node.current;

  useEventListener('drop', handleDrop, dropNode);
  useEventListener('dragover', handleDragOver, dropNode);
  useEventListener('dragenter', handleDragEnter, dropNode);
  useEventListener('dragleave', handleDragLeave, dropNode);
  useEventListener('resize', adjustSize, isServer ? null : window);

  useComponentDidMount(() => {
    adjustSize();
  });

  const id = React.useId();

  const overlayTextWithDefault = overlayText || 'Add files';
  const errorOverlayTextWithDefault = errorOverlayText || '';

  const labelValue = label;
  const labelHiddenValue = label ? labelHidden : true;

  const classes = cn(
    styles.DropZone,
    outline && styles.hasOutline,
    focused && styles.focused,
    (active || dragging) && styles.isDragging,
    disabled && styles.isDisabled,
    (internalError || error) && styles.hasError,
    !variableHeight && styles[variationName('size', size)],
    measuring && styles.measuring,
    errorOverlayText && styles.error
  );

  const dragOverlay =
    (active || dragging) &&
    !internalError &&
    !error &&
    overlay &&
    overlayMarkup(IconUpload, 'interactive', overlayTextWithDefault);

  const dragErrorOverlay =
    dragging &&
    (internalError || error) &&
    overlayMarkup(IconAlertCircle, 'critical', errorOverlayTextWithDefault);

  const context = useMemo(
    () => ({
      disabled,
      focused,
      size,
      type: type || 'file',
      measuring,
      allowMultiple,
    }),
    [disabled, focused, measuring, size, type, allowMultiple]
  );

  const open = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.click();
  }, [inputRef]);

  const triggerFileDialog = useCallback(() => {
    open();
    onFileDialogClose?.();
  }, [open, onFileDialogClose]);

  function overlayMarkup(
    icon: FunctionComponent,
    color: 'critical' | 'interactive',
    text: string
  ) {
    return (
      <div className={styles.Overlay}>
        <div className="flex flex-col items-center gap-1">
          {size === 'small' && <Icon source={icon} color={color} />}
          {(size === 'medium' || size === 'large') && (
            <Text variant="bodySm" as="p" fontWeight="bold">
              {text}
            </Text>
          )}
        </div>
      </div>
    );
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (disabled) return;

    return onClick ? onClick(event) : open();
  }

  useEffect(() => {
    if (openFileDialog) triggerFileDialog();
  }, [openFileDialog, triggerFileDialog]);

  return (
    <DropZoneContext.Provider value={context}>
      <Labelled
        id={id}
        label={labelValue}
        action={labelAction}
        error={errorOverlayText}
        labelHidden={labelHiddenValue}
      >
        <div
          ref={node}
          className={classes}
          aria-disabled={disabled}
          onClick={handleClick}
          onDragStart={stopEvent}
        >
          {dragOverlay}
          {dragErrorOverlay}
          <Text variant="bodySm" as="span" visuallyHidden>
            <input
              id={id}
              accept={accept}
              disabled={disabled}
              multiple={allowMultiple}
              onChange={handleDrop}
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="file"
              ref={inputRef}
              autoComplete="off"
            />
          </Text>
          <div className={styles.Container}>{children}</div>
        </div>
      </Labelled>
    </DropZoneContext.Provider>
  );
});

function stopEvent(event: DropZoneEvent | React.DragEvent<HTMLDivElement>) {
  event.preventDefault();
  event.stopPropagation();
}

DropZone.FileUpload = FileUpload;
