import { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useEffect, useState } from 'react';
import { number } from 'yup';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Tag } from '../Tag';
import { Input } from './Input';

/**
 * Input Element
 */
const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Text Field',
    id: 'textfiel',
  },
};

export const Number: Story = {
  args: {
    label: 'Number',
    type: 'number',
  },
};

export const Multiline: Story = {
  args: {
    label: 'Multiline',
    multiline: 3,
  },
};

export const HiddenLabel: Story = {
  args: {
    label: 'No Label',
    labelHidden: true,
  },
};

export const LabelAction: Story = {
  args: {
    label: 'With Action',
    labelAction: { content: 'Look Up Codes' },
  },
};

export const RightAligned: Story = {
  args: {
    label: 'Right Aligned',
    align: 'right',
    placeholder: 'Text will be right aligned',
  },
};

export const HelpText: Story = {
  args: {
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
  args: {
    label: 'tags',
    placeholder: 'Search Tags',
    verticalContent: verticalContentMarkup,
  },
};

export const ConnectedFields: Story = {
  args: {
    label: 'Connected Field',
    connectedRight: <Button>Submit</Button>,
  },
};

export const Error: Story = {
  args: {
    label: 'Name',
    error: 'Name is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Name',
    disabled: true,
  },
};

export const Count: Story = {
  args: {
    label: 'Name',
    maxLength: 20,
    showCharacterCount: true,
    value: 'Some Text',
  },
};

export const ClearButton: Story = {
  args: {
    label: 'Name',
    clearButton: true,
  },
};

export const MonoSpaced: Story = {
  args: {
    label: 'Name',
    monospaced: true,
  },
};

export const SelectOnFocus: Story = {
  args: {
    label: 'Name',
    selectTextOnFocus: true,
  },
};

export const Suggestions = () => {
  const suggestions = React.useMemo(
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
      <Input
        type="text"
        label="State"
        value={value}
        onChange={handleChange}
        suggestion={suggestion}
      />
    </div>
  );
};
