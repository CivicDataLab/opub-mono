import cx from 'classnames';
import { useContext } from 'react';
import { DropZoneContext } from '../../context';
import { uploadArrow } from '../../images';

import { Flex } from '../../../Flex';
import { Text } from '../../../Text';
import styles from './FileUpload.module.scss';

export interface FileUploadProps {
  actionTitle?: string;
  actionHint?: string;
}

export function FileUpload(props: FileUploadProps) {
  const {
    size,
    measuring,
    type = 'file',
    disabled,
    allowMultiple,
  } = useContext(DropZoneContext);

  const {
    actionTitle = allowMultiple ? `Add ${type}s` : `Add ${type}`,
    actionHint,
  } = props;
  const actionClassNames = cx(styles.Action, disabled && styles.disabled);
  const actionMarkup = <div className={actionClassNames}>{actionTitle}</div>;

  const fileUploadClassName = cx(
    styles.FileUpload,
    measuring && styles.measuring,
    size === 'large' && styles.large,
    size === 'small' && styles.small
  );

  const actionHintMarkup = actionHint && (
    <Text variant="bodySm" as="p" color="subdued">
      {actionHint}
    </Text>
  );

  let viewMarkup;
  switch (size) {
    case 'large':
      viewMarkup = (
        <Flex direction="column" alignItems="center" gap={8}>
          {actionMarkup}
          {actionHintMarkup}
        </Flex>
      );
      break;
    case 'medium':
      viewMarkup = (
        <Flex direction="column" alignItems="center" gap={8}>
          {actionMarkup}
          {actionHintMarkup}
        </Flex>
      );
      break;
    case 'small':
      viewMarkup = <img width="20" src={uploadArrow} alt="" />;
      break;
  }

  return <div className={fileUploadClassName}>{viewMarkup}</div>;
}
