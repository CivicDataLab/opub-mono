import { Search } from '@opub-icons/workflow';
import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useMemo, useState } from 'react';
import { Listbox } from '../Listbox';
import { Combobox } from './Combobox';

/**
 * Combobox Description
 *
 * Reference: #
 */
const meta = {
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export function Default() {
  const deselectedOptions = useMemo(
    () => [
      { value: 'rustic', label: 'Rustic' },
      { value: 'antique', label: 'Antique' },
      { value: 'vinyl', label: 'Vinyl' },
      { value: 'vintage', label: 'Vintage' },
      { value: 'refurbished', label: 'Refurbished' },
    ],
    []
  );

  const [selectedOption, setSelectedOption] = useState();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value: any) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );

  const updateSelection = useCallback(
    (selected: any) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });

      setSelectedOption(selected);
      setInputValue((matchedOption && matchedOption.label) || '');
    },
    [options]
  );

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOption === value}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  return (
    <div style={{ height: '225px' }}>
      <Combobox
        activator={
          <Combobox.TextField
            prefix={<Search size={12} />}
            onChange={updateText}
            label="Search tags"
            labelHidden
            value={inputValue}
            placeholder="Search tags"
          />
        }
      >
        {options.length > 0 ? (
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        ) : null}
      </Combobox>
    </div>
  );
}
