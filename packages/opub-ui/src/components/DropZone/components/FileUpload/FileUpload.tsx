import { useContext } from 'react';
import {
  IconCloudUpload,
  IconSquareRoundedArrowUpFilled,
} from '@tabler/icons-react';

import { cn } from '../../../../utils';
import { Icon } from '../../../Icon';
import { Text } from '../../../Text';
import { DropZoneContext } from '../../context';
import styles from './FileUpload.module.scss';

export interface FileUploadProps {
  actionTitle?: string;
  actionHint?: React.ReactNode | string;
}

export function FileUpload(props: FileUploadProps) {
  const {
    size,
    measuring,
    type = 'file',
    disabled,
    allowMultiple,
    className,
  } = useContext(DropZoneContext);

  const {
    actionTitle = allowMultiple ? `Add ${type}s` : `Add ${type}`,
    actionHint,
  } = props;
  const actionClassNames = cn(styles.Action, disabled && styles.disabled);
  const actionMarkup = <div className={actionClassNames}>{actionTitle}</div>;

  const fileUploadClassName = cn(
    styles.FileUpload,
    measuring && styles.measuring,
    size === 'large' && styles.large,
    size === 'small' && styles.small,
    className
  );

  const actionHintMarkup =
    actionHint &&
    (typeof actionHint === 'string' ? (
      <Text variant="bodySm" as="p" color="subdued">
        {actionHint}
      </Text>
    ) : (
      actionHint
    ));

  let viewMarkup;
  switch (size) {
    case 'large':
      viewMarkup = (
        <div className="flex flex-col items-center gap-8 text-textSubdued">
          <Icon source={IconCloudUpload} size={48} />
          {actionMarkup}
          {actionHintMarkup}
        </div>
      );
      break;
    case 'medium':
      viewMarkup = (
        <div className="flex flex-col items-center gap-2">
          {actionMarkup}
          {actionHintMarkup}
        </div>
      );
      break;
    case 'small':
      viewMarkup = <Icon source={IconSquareRoundedArrowUpFilled} />;
      break;
  }

  return <div className={fileUploadClassName}>{viewMarkup}</div>;
}
