import styles from '../Combobox.module.scss';
import cx from 'classnames';
import inputStyles from '../../Input/Input.module.scss';

export const List = ({
  getMenuProps,
  getItemProps,
  isOpen,
  items,
  selectedItem,
}: any) => {
  return (
    <ul
      {...getMenuProps()}
      className={cx(styles.List, isOpen && styles['List--open'])}
    >
      {isOpen &&
        items.map((item: any, index: number) => (
          <li key={`${item.value}${index}`} {...getItemProps({ item, index })}>
            <div
              className={cx(
                styles.Item,
                selectedItem === item && styles.active
              )}
            >
              <span>{item.label}</span>
            </div>
          </li>
        ))}
    </ul>
  );
};

export const Input = ({ getInputProps, ...props }: any) => {
  return (
    <div className={inputStyles.TextField}>
      <input {...getInputProps()} {...props} className={inputStyles.Input} />
      <div className={inputStyles.Backdrop} />
    </div>
  );
};
