import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Form } from '../Form';
import { Tag } from '../Tag';
import { TextField } from './TextField';

/**
 * TextFields are text inputs that allow users to input custom text entries with a keyboard. Various decorations can be displayed around the field to communicate the entry requirements.
 */
const meta = {
  component: TextField,
} as Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    name: 'name',
    label: 'Text Field',
  },
};

export const Number: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'Number',
    type: 'number',
    name: 'number',
  },
};

export const Multi: Story = {
  render: (args) => (
    <Form
      defaultValues={{
        'multi-line': 'This is first line\nWell this is second',
      }}
    >
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'Multi Line',
    multiline: 4,
    name: 'multi-line',
  },
};

export const HiddenLabel: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'No Label',
    labelHidden: true,
    name: 'no-label',
  },
};

export const LabelAction: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'With Action',
    labelAction: { content: 'Look Up Codes' },
    name: 'action',
  },
};

export const RightAligned: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'Right Aligned',
    align: 'right',
    placeholder: 'Text will be right aligned',
    name: 'alignment',
  },
};

export const HelpText: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    name: 'help',
    label: 'Help Text',
    helpText:
      'We???ll use this address if we need to contact you about your account.',
  },
};

export const Prefix: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'Price',
    type: 'number',
    prefix: '???',
    name: 'prefix',
  },
};

const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];
const verticalContentMarkup =
  tags.length > 0 ? (
    <Flex gap={4}>
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </Flex>
  ) : null;

export const VerticalContent: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'tags',
    placeholder: 'Search Tags',
    verticalContent: verticalContentMarkup,
    name: 'vertical',
  },
};

export const ConnectedFields: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'Connected Field',
    connectedRight: <Button>Submit</Button>,
    name: 'connected',
  },
};

export const Error: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'Name',
    error: 'Name is required',
    name: 'error',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'Name',
    disabled: true,
    name: 'disabled',
  },
};

export const Count: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'Name',
    maxLength: 20,
    showCharacterCount: true,
    name: 'count',
  },
};

export const ClearButton: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'Name',
    clearButton: true,
    name: 'clear',
  },
};

export const MonoSpaced: Story = {
  render: (args) => (
    <Form>
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'Name',
    monospaced: true,
    name: 'mono',
  },
};

export const SelectOnFocus: Story = {
  render: (args) => (
    <Form defaultValues={{}}>
      <TextField {...args} />
    </Form>
  ),
  args: {
    label: 'Name',
    selectTextOnFocus: true,
    name: 'select-focus',
  },
};

export const Suggestions = () => {
  const suggestions = useMemo(
    () => [
      'Alabama',
      'Alaska',
      'American Samoa',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'District of Columbia',
      'Florida',
      'Georgia',
      'Guam',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Minor Outlying Islands',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Northern Mariana Islands',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Puerto Rico',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'U.S. Virgin Islands',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ],
    []
  );

  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const handleSuggestion = useCallback(
    (nextValue: string) => {
      console.log(nextValue);

      const nextSuggestion = suggestions.find((suggestion) =>
        suggestion.toLowerCase().startsWith(nextValue.toLowerCase())
      );

      if (nextSuggestion) setSuggestion(nextSuggestion);
    },
    [suggestions]
  );

  useEffect(() => {
    if (value !== suggestion) handleSuggestion(value);
  }, [handleSuggestion, suggestion, value]);

  const handleChange = useCallback((value: React.SetStateAction<string>) => {
    setValue(value);
    setSuggestion('');
  }, []);

  const handleKeyDown = useCallback(
    (event: { key: string }) => {
      if (event.key === 'Enter') {
        handleChange(suggestion);
      }
    },
    [suggestion, handleChange]
  );

  return (
    <div onKeyDown={handleKeyDown}>
      <Form>
        <TextField
          name="suggestions"
          label="State"
          onChange={handleChange}
          suggestion={suggestion}
        />
      </Form>
    </div>
  );
};
