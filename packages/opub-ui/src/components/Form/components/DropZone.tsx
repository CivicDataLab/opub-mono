'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { DropZone as DZ } from '../../DropZone';
import { FileUpload } from '../../DropZone/components';
import { DropZoneProps } from '../../DropZone/DropZone';

type Props = Omit<DropZoneProps, 'onDrop'> & {
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
        render={({ field, fieldState }) => {
          return (
            <DZ
              {...field}
              {...props}
              errorOverlayText={
                fieldState.invalid ? errorOverlayText : undefined
              }
              onDrop={(
                files: File[],
                acceptedFiles: File[],
                rejectedFiles: File[]
              ) => {
                props.onChange &&
                  props.onChange(
                    files,
                    acceptedFiles,
                    rejectedFiles,
                    props.name
                  );
                acceptedFiles && field.onChange(acceptedFiles);
              }}
            />
          );
        }}
      />
    );
  }

  return <DZ {...props} />;
};
DropZone.FileUpload = FileUpload;

export { DropZone };
