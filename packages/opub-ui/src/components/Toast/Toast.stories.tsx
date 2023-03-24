import { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { Button } from '../Button';
import { useState } from 'react';

/**
 * Toast Description
 *
 * Reference: #
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

export const WithAction = () => {
  const [open, setOpen] = useState(false);
  
    return (
      <Toast
        swipeDirection="right"
        toastOpen={open}
        toastTitle={'Message Sent'}
        trigger={<Button onClick={() => setOpen(!open)}>Trigger Action Toast</Button>}
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
      trigger={<Button onClick={() => setOpen(!open)}>Trigger Error Toast</Button>}
      toggleToastCallback={setOpen}
      variant='error'
    />
  );
};
