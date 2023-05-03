'use client';

import { DropZone as DZ } from '../../DropZone';
import { DropZoneProps } from '../../DropZone/DropZone';
import { FileUpload } from '../../DropZone/components';
import { Controller, useFormContext } from 'react-hook-form';

type Props = DropZoneProps & {
  required?: boolean;
  error?: string;
  name: string;
  onChange?: (
    val: File[],
    acceptedFiles: File[],
    rejectedFiles: File[],
    name?: string
  ) => void;
};

const DropZone: React.FunctionComponent<Props> & {
  FileUpload: typeof FileUpload;
} = function DropZone({ required, errorOverlayText, ...props }: Props) {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        rules={{ required: required }}
        render={({ field, fieldState }) => (
          <DZ
            {...field}
            {...props}
            errorOverlayText={fieldState.invalid ? errorOverlayText : undefined}
            onDrop={(
              files: File[],
              acceptedFiles: File[],
              rejectedFiles: File[]
            ) => {
              props.onChange &&
                props.onChange(files, acceptedFiles, rejectedFiles, props.name);
              acceptedFiles && field.onChange(acceptedFiles);
            }}
          />
        )}
      />
    );
  }

  return <DZ {...props} />;
};
DropZone.FileUpload = FileUpload;

export { DropZone };
