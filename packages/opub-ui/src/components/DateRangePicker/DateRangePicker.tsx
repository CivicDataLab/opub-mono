import React, { forwardRef } from "react";
import styles from "./DateRangePicker.module.scss";
import cx from "classnames";

type Props = {
  children: React.ReactNode
};

const DateRangePicker = forwardRef((props: Props, ref: any) => {
  const themeClass = cx(styles.DateRangePicker, {});

  return (
    <div
      className={`opub-DateRangePicker ${themeClass}`}
      ref={ref}
      {...props}
    />
  );
});

export { DateRangePicker };
