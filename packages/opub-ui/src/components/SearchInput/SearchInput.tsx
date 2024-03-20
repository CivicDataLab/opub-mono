import React, { forwardRef } from 'react';
import { IconSearch } from '@tabler/icons-react';

import { cn } from '../../utils';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import styles from './SearchInput.module.scss';

type Props = {
  // Additional classname for wrapper
  className?: string;
  // Default value for input
  defaultValue?: string;
  // onChange handler
  onChange?: (value: string) => void;
  // onSubmit handler
  onSubmit?: (value: string) => void;
  // Show button
  withButton?: boolean;
  // Disabled
  disabled?: boolean;
  // Placeholder
  placeholder?: string;
  // label
  label: string;
  // name
  name: string;

  suffix?: React.ReactNode;
};

const SearchInput = forwardRef((props: Props, ref: any) => {
  const [search, setSearch] = React.useState(props.defaultValue || '');

  const className = cn(props.withButton && styles.SearchInput, props.className);
  return (
    <div className={className}>
      <Input
        name={props.name}
        label={props.label}
        labelHidden
        placeholder={props.placeholder || 'Search'}
        value={search}
        onChange={(e) => {
          setSearch(e);
          props.onChange && props.onChange(e);
        }}
        suffix={props.suffix}
        ref={ref}
        prefix={!props.withButton && <Icon source={IconSearch} />}
        clearButton
        onClearButtonClick={() => {
          setSearch('');
          props.onChange && props.onChange('');
          ref?.current && ref.current.focus();
        }}
        disabled={props.disabled}
      />
      {props.withButton && (
        <IconButton
          color="highlight"
          icon={IconSearch}
          className={styles.SearchButton}
          onClick={() => props.onSubmit && props.onSubmit(search)}
          disabled={props.disabled}
        >
          Search
        </IconButton>
      )}
    </div>
  );
});

export { SearchInput };
