import {
  ComboboxItem,
  ComboboxPopover,
  useComboboxState,
} from 'ariakit/combobox';
import { Portal } from 'ariakit/portal';
import cx from 'classnames';
import React, { forwardRef, useEffect } from 'react';
import { ComboboxSingleProps } from '../../../types/combobox';
import itemStyles from '../../ActionList/ActionList.module.scss';
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
      value: props.value,
      defaultList,
    });

    useEffect(() => {
      onFilter?.(combobox.matches);
    }, [combobox.matches]);

    const className = cx(itemStyles.Item);

    return (
      <div className={styles.Wrapper}>
        <Combobox combobox={combobox} ref={ref} {...comboboxProps} />

        <Portal style={{ zIndex: 'var(--z-1)' }}>
          <ComboboxPopover
            state={combobox}
            className={styles.Popover}
            style={
              { '--popover-padding': 'var(--space-1)' } as React.CSSProperties
            }
          >
            {combobox.matches.length ? (
              combobox.matches.map((value) => (
                <ComboboxItem key={value} value={value} className={className} />
              ))
            ) : (
              <div className={styles.NoResult}>No results found</div>
            )}
          </ComboboxPopover>
        </Portal>
      </div>
    );
  }
);
