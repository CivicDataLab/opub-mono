import React, { forwardRef } from "react";
import styles from "./Combobox.module.scss";
import cx from "classnames";

type Props = {
  children: React.ReactNode
};

const Combobox = forwardRef((props: Props, ref: any) => {
  const themeClass = cx(styles.Combobox, {});

  return <div className={`opub-Combobox ${themeClass}`} ref={ref} {...props} />;
});

export { Combobox };
