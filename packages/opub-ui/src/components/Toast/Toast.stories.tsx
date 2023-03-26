import { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { Button } from '../Button';
import { useState } from 'react';

/**
 * Toast Description A succinct message that is displayed temporarily.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/toast
 */
const meta = {
  component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;

export const Default = () => {
  const [open, setOpen] = useState(false);

  return (
    <Toast
      swipeDirection="right"
      toastOpen={open}
      toastTitle={'Message Sent'}
      trigger={<Button onClick={() => setOpen(!open)}>Trigger Toast</Button>}
      toggleToastCallback={setOpen}
    />
  );
};
export const ToastDescription = () => {
  const [open, setOpen] = useState(false);

  return (
    <Toast
      swipeDirection="right"
      toastOpen={open}
      toastTitle={'Message Sent'}
      toastDescription={<p>Lorem ipsum Lorem ipsum dolor sit amet </p>}
      trigger={
        <Button onClick={() => setOpen(!open)}>
          Trigger Toast Description
        </Button>
      }
      toggleToastCallback={setOpen}
    />
  );
};

export const ToastWithActionDescription = () => {
  const [open, setOpen] = useState(false);

  return (
    <Toast
      swipeDirection="right"
      toastOpen={open}
      toastTitle={'Message Sent'}
      toastDescription={<p>Lorem ipsum Lorem ipsum dolor sit amet </p>}
      trigger={
        <Button onClick={() => setOpen(!open)}>
          Trigger Toast Action Description
        </Button>
      }
      toggleToastCallback={setOpen}
      altText="Undo action"
      toastActionText={'Undo'}
      actionCallback={() => alert('clicked')}
    />
  );
};

export const WithAction = () => {
  const [open, setOpen] = useState(false);

  return (
    <Toast
      swipeDirection="right"
      toastOpen={open}
      toastTitle={'Message Sent'}
      trigger={
        <Button onClick={() => setOpen(!open)}>Trigger Action Toast</Button>
      }
      toggleToastCallback={setOpen}
      altText="Undo action"
      toastActionText={'Undo'}
      actionCallback={() => alert('clicked')}
    />
  );
};

export const Error = () => {
  const [open, setOpen] = useState(false);
  return (
    <Toast
      swipeDirection="right"
      toastOpen={open}
      toastTitle={'Server Error'}
      trigger={
        <Button onClick={() => setOpen(!open)}>Trigger Error Toast</Button>
      }
      toggleToastCallback={setOpen}
      variant="error"
    />
  );
};
