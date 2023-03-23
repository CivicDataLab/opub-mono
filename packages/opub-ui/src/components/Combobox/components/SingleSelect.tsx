import { ComboboxSingleProps } from '@ui/types/combobox';
import {
  ComboboxItem,
  ComboboxPopover,
  useComboboxState,
} from 'ariakit/combobox';
import { forwardRef, useEffect } from 'react';
import styles from '../Combobox.module.scss';
import { Combobox } from './Atoms';

export const SingleSelect = forwardRef<HTMLInputElement, ComboboxSingleProps>(
  (props: ComboboxSingleProps, ref) => {
    const { onChange, defaultValue, defaultList, onFilter, ...comboboxProps } =
      props;

    const combobox = useComboboxState({
      sameWidth: true,
      gutter: 8,
      defaultValue,
      setValue: onChange,
      defaultList,
    });

    useEffect(() => {
      onFilter?.(combobox.matches);
    }, [combobox.matches]);

    return (
      <div className="opub-combobox-multi">
        <Combobox combobox={combobox} ref={ref} {...comboboxProps} />

        <ComboboxPopover state={combobox} className={styles.Popover}>
          {combobox.matches.length ? (
            combobox.matches.map((value) => (
              <ComboboxItem
                key={value}
                value={value}
                className={styles.ComboboxItem}
              />
            ))
          ) : (
            <div className={styles.NoResult}>No results found</div>
          )}
        </ComboboxPopover>
      </div>
    );
  }
);
