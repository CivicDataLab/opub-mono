import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';

import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { FormLayout } from '../FormLayout';
import { Select } from '../Select';
import { Switch } from '../Switch';
import { Text } from '../Text';
import { TextField } from '../TextField';
import { SectionCard, SectionCardAction } from './SectionCard';

/**
 * A titled card for grouping related content. Use it for form sections,
 * with optional header actions and accordion expand/collapse.
 */
const meta = {
  title: 'Components/SectionCard',
  component: SectionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Contact details',
    // description: 'How we reach this person about the record.',
  },
  argTypes: {
    children: { control: false },
    footer: { control: false },
    actions: { control: false },
    successText: { control: 'text' },
    expanded: { control: false },
    onExpandedChange: { control: false },
    expandAccessibilityLabel: { control: false },
    className: { control: false },
  },
} satisfies Meta<typeof SectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const roleOptions = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

function ContactForm() {
  const [values, setValues] = useState({
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@example.org',
    phone: '',
    role: 'editor',
    bio: '',
    newsletter: true,
  });

  function update(field: keyof typeof values) {
    return (value: string) =>
      setValues((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <FormLayout>
      <FormLayout.Group>
        <TextField
          name="firstName"
          label="First name"
          requiredIndicator
          autoComplete="given-name"
          value={values.firstName}
          onChange={update('firstName')}
        />
        <TextField
          name="lastName"
          label="Last name"
          requiredIndicator
          autoComplete="family-name"
          value={values.lastName}
          onChange={update('lastName')}
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          name="email"
          label="Email"
          type="email"
          requiredIndicator
          autoComplete="email"
          value={values.email}
          onChange={update('email')}
        />
        <TextField
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={update('phone')}
        />
      </FormLayout.Group>
      <Select
        name="role"
        label="Role"
        placeholder="Select a role"
        options={roleOptions}
        value={values.role}
        onChange={update('role')}
      />
      <TextField
        name="bio"
        label="Notes"
        multiline={3}
        helpText="Visible only to your team."
        value={values.bio}
        onChange={update('bio')}
      />
      <Checkbox
        name="newsletter"
        checked={values.newsletter}
        onChange={(selected) =>
          setValues((prev) => ({ ...prev, newsletter: selected === true }))
        }
      >
        Send a copy of updates to this email
      </Checkbox>
    </FormLayout>
  );
}

function FormFooter() {
  return (
    <ButtonGroup>
      <Button kind="secondary">Cancel</Button>
      <Button>Save</Button>
    </ButtonGroup>
  );
}

const headerActions: SectionCardAction[] = [
  {
    content: 'Edit',
    icon: IconPencil,
    onAction: () => {},
    stroke: 1.5,
    color: 'default',
  },
  {
    icon: IconTrash,
    accessibilityLabel: 'Remove section',
    destructive: true,
    onAction: () => {},
    stroke: 1.5,
  },
];

export const Default: Story = {
  render: (args) => (
    <SectionCard {...args} actions={headerActions} footer={<FormFooter />}>
      <ContactForm />
    </SectionCard>
  ),
};

export const WithActions: Story = {
  args: {
    title: 'Organisation',
    description: 'Name and public profile for this workspace.',
    actions: [
      {
        content: 'Add member',
        icon: IconPlus,
        kind: 'secondary',
        onAction: () => {},
      },
      {
        content: 'Edit',
        icon: IconPencil,
        onAction: () => {},
        // color: 'default',
        stroke: 1.5,
      },
    ],
  },
  render: (args) => (
    <SectionCard {...args}>
      <FormLayout>
        <TextField
          name="organisation"
          label="Organisation name"
          value="CivicDataLab"
          onChange={() => {}}
        />
        <TextField
          name="website"
          label="Website"
          type="url"
          value="https://civicdatalab.in"
          onChange={() => {}}
        />
      </FormLayout>
    </SectionCard>
  ),
};

export const WithSuccessText: Story = {
  args: {
    title: 'Uploaded Files (2)',
    description: undefined,
    successText: '2 Files Ready',
  },
  render: (args) => (
    <SectionCard {...args}>
      <Text as="p" variant="bodyMd" color="subdued">
        Files are processed and ready to use.
      </Text>
    </SectionCard>
  ),
};

export const Expandable: Story = {
  args: {
    expandable: true,
    defaultExpanded: true,
  },
  render: (args) => (
    <SectionCard {...args} actions={headerActions} footer={<FormFooter />}>
      <ContactForm />
    </SectionCard>
  ),
};

export const ExpandableCollapsed: Story = {
  args: {
    title: 'Advanced settings',
    description: 'Optional fields. Expand to edit.',
    expandable: true,
    defaultExpanded: false,
    actions: [
      {
        content: 'Reset',
        onAction: () => {},
      },
    ],
  },
  render: (args) => (
    <SectionCard {...args}>
      <FormLayout>
        <TextField
          name="slug"
          label="URL slug"
          helpText="Used in public links for this record."
          onChange={() => {}}
        />
        <Select
          name="visibility"
          label="Visibility"
          options={[
            { label: 'Public', value: 'public' },
            { label: 'Private', value: 'private' },
          ]}
          value="private"
          onChange={() => {}}
        />
      </FormLayout>
    </SectionCard>
  ),
};

export const SettingsPage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SectionCard
        title="Profile"
        description="Your name and how you appear to others."
        expandable
        actions={[{ content: 'Edit', icon: IconPencil, onAction: () => {} }]}
        footer={<FormFooter />}
      >
        <FormLayout>
          <FormLayout.Group>
            <TextField
              name="displayName"
              label="Display name"
              value="Priya Sharma"
              onChange={() => {}}
            />
            <TextField
              name="jobTitle"
              label="Job title"
              value="Programme lead"
              onChange={() => {}}
            />
          </FormLayout.Group>
          <TextField
            name="email"
            label="Email"
            type="email"
            value="priya.sharma@example.org"
            onChange={() => {}}
          />
        </FormLayout>
      </SectionCard>
      <SectionCard
        title="Notifications"
        description="Choose how you hear about changes."
        expandable
        defaultExpanded={false}
      >
        <FormLayout>
          <Switch name="emailAlerts" label="Email alerts" defaultChecked />
          <Switch name="productUpdates" label="Product updates" />
          <Checkbox name="digest" checked onChange={() => {}}>
            Weekly digest
          </Checkbox>
        </FormLayout>
      </SectionCard>
      <SectionCard
        title="Danger zone"
        description="Irreversible actions for this workspace."
        expandable
        defaultExpanded={false}
        actions={[
          {
            content: 'Delete workspace',
            icon: IconTrash,
            destructive: true,
            kind: 'secondary',
            variant: 'critical',
            onAction: () => {},
          },
        ]}
      >
        <Text as="p" variant="bodyMd" color="subdued">
          Deleting this workspace removes every project, member, and uploaded
          file. This cannot be undone.
        </Text>
      </SectionCard>
    </div>
  ),
};
