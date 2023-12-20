import { useToast } from '../../utils/hooks/use-toast';
import { Button } from '../Button';
import { ToastAction } from './Toast';
import { Toaster } from './Toaster';
import { Meta } from '@storybook/react';

/**
 * Toast Description A succinct message that is displayed temporarily.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/toast
 */
const meta = {
  title: 'Components/Toast',
  component: Toaster,
} satisfies Meta<typeof Toaster>;

export default meta;

export const Default = () => {
  const { toast } = useToast();

  return (
    <>
      {/* <Toaster /> */}
      <Button
        onClick={() => {
          toast({
            title: 'Message Sent',
          });
        }}
      >
        Trigger Toast
      </Button>
    </>
  );
};
export const ToastDescription = () => {
  const { toast } = useToast();
  return (
    <>
      {/* <Toaster /> */}
      <Button
        onClick={() => {
          toast({
            title: 'Message Sent',
            description: 'Lorem ipsum Lorem ipsum dolor sit amet',
          });
        }}
      >
        Trigger Toast Description
      </Button>
    </>
  );
};

export const ToastWithActionDescription = () => {
  const { toast } = useToast();
  return (
    <>
      {/* <Toaster /> */}
      <Button
        onClick={() => {
          toast({
            title: 'Message Sent',
            description: 'Lorem ipsum Lorem ipsum dolor sit amet',
            action: <ToastAction altText="Undo">Undo</ToastAction>,
          });
        }}
      >
        Trigger Toast Action Description
      </Button>
    </>
  );
};

export const WithAction = () => {
  const { toast } = useToast();
  return (
    <>
      {/* <Toaster /> */}
      <Button
        onClick={() => {
          toast({
            title: 'Message Sent',
            action: <ToastAction altText="Undo">Undo</ToastAction>,
          });
        }}
      >
        Trigger Toast Action
      </Button>
    </>
  );
};

export const Error = () => {
  const { toast } = useToast();
  return (
    <>
      {/* <Toaster /> */}
      <Button
        onClick={() => {
          toast({
            title: 'Message Sent',
            variant: 'error',
          });
        }}
      >
        Trigger Error Toast
      </Button>
    </>
  );
};

export const MultiToastDefault = () => {
  const { toast } = useToast();
  return (
    <>
      {/* <Toaster /> */}
      <Button
        onClick={() => {
          toast({
            title: 'Message Sent',
            variant: 'error',
          });
        }}
      >
        Trigger Toast 1
      </Button>

      <Button
        onClick={() => {
          toast({
            title: 'Image uploaded',
          });
        }}
      >
        Trigger Toast 2
      </Button>
    </>
  );
};
