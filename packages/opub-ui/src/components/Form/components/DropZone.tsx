'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { DropZone as DZ } from '../../DropZone';
import { FileUpload } from '../../DropZone/components';
import { DropZoneProps } from '../../DropZone/DropZone';

type Props = Omit<DropZoneProps, 'onDrop'> & {
  required?: boolean;
  name: string;
  onDrop?: (
    val: File[],
    acceptedFiles: File[],
    rejectedFiles: File[],
    name?: string
  ) => void;
};

const DropZone: React.FunctionComponent<Props> & {
  FileUpload: typeof FileUpload;
} = function DropZone({ required, error, errorOverlayText, ...props }: Props) {
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
              error={
                fieldState.invalid
                  ? (error ?? fieldState.error?.message)
                  : undefined
              }
              errorOverlayText={
                fieldState.invalid ? errorOverlayText : undefined
              }
              onDrop={(
                files: File[],
                acceptedFiles: File[],
                rejectedFiles: File[]
              ) => {
                props.onDrop &&
                  props.onDrop(files, acceptedFiles, rejectedFiles, props.name);
                acceptedFiles && field.onChange(acceptedFiles);
              }}
            />
          );
        }}
      />
    );
  }

  return (
    <DZ {...props} error={error} errorOverlayText={errorOverlayText} />
  );
};
DropZone.FileUpload = FileUpload;

export { DropZone };
