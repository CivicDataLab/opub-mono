import { Box } from '../../../Box';
import { Icon } from '../../../Icon';
import { Text } from '../../../Text';
import { DropZoneContext } from '../../context';
import { uploadArrow } from '../../images';
import styles from './FileUpload.module.scss';
import { UploadMajor } from '@shopify/polaris-icons';
import { IconCloudUpload } from '@tabler/icons-react';
import cx from 'classnames';
import { useContext } from 'react';

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
        <Box
          flex
          gap="8"
          direction="column"
          alignItems="center"
          color="text-subdued"
        >
          <Icon source={IconCloudUpload} size={48} />
          {actionMarkup}
          {actionHintMarkup}
        </Box>
      );
      break;
    case 'medium':
      viewMarkup = (
        <Box flex gap="2" direction="column" alignItems="center">
          {actionMarkup}
          {actionHintMarkup}
        </Box>
      );
      break;
    case 'small':
      viewMarkup = <img width="20" src={uploadArrow} alt="" />;
      break;
  }

  return <div className={fileUploadClassName}>{viewMarkup}</div>;
}
