import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Tag } from '../Tag';
import { TextField } from './TextField';

/**
 * TextFields are text inputs that allow users to input custom text entries with a keyboard. Various decorations can be displayed around the field to communicate the entry requirements.
 */
const meta = {
  title: 'Components/TextField',
  component: TextField,
} as Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'name',
    label: 'Text Field',
    onChange: (text, name) => console.log(text, name),
  },
};

export const Number: Story = {
  args: {
    label: 'Number',
    type: 'number',
    name: 'number',
  },
};

export const Multi: Story = {
  args: {
    label: 'Multi Line',
    multiline: 4,
    name: 'multi-line',
    defaultValue: 'This is first line\nWell this is second',
  },
};

export const HiddenLabel: Story = {
  args: {
    label: 'No Label',
    labelHidden: true,
    name: 'no-label',
  },
};

export const LabelAction: Story = {
  args: {
    label: 'With Action',
    labelAction: { content: 'Look Up Codes' },
    name: 'action',
  },
};

export const RightAligned: Story = {
  args: {
    label: 'Right Aligned',
    align: 'right',
    placeholder: 'Text will be right aligned',
    name: 'alignment',
  },
};

export const HelpText: Story = {
  args: {
    name: 'help',
    label: 'Help Text',
    helpText:
      'We’ll use this address if we need to contact you about your account.',
  },
};

export const Prefix: Story = {
  args: {
    label: 'Price',
    type: 'number',
    prefix: '₹',
    name: 'prefix',
  },
};

const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];
const tagsMarkup =
  tags.length > 0 ? (
    <div className="flex gap-1">
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  ) : null;

export const Tags: Story = {
  args: {
    label: 'tags',
    placeholder: 'Search Tags',
    tags: tagsMarkup,
    name: 'vertical',
  },
};

export const ConnectedFields: Story = {
  args: {
    label: 'Connected Field',
    connectedRight: <Button>Submit</Button>,
    name: 'connected',
  },
};

export const Error: Story = {
  args: {
    label: 'Name',
    error: 'Name is required',
    name: 'error',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Name',
    disabled: true,
    name: 'disabled',
  },
};

export const Count: Story = {
  args: {
    label: 'Name',
    maxLength: 20,
    showCharacterCount: true,
    name: 'count',
  },
};

export const ClearButton: Story = {
  args: {
    label: 'Name',
    clearButton: true,
    name: 'clear',
  },
};

export const MonoSpaced: Story = {
  args: {
    label: 'Name',
    monospaced: true,
    name: 'mono',
  },
};

export const SelectOnFocus: Story = {
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
      <TextField
        name="suggestions"
        label="State"
        onChange={handleChange}
        suggestion={suggestion}
      />
    </div>
  );
};
