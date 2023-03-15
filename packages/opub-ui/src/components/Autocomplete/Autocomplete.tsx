import React, { forwardRef } from "react";
import styles from "./Autocomplete.module.scss";
import cx from "classnames";

type Props = {
  children: React.ReactNode
};

const Autocomplete = forwardRef((props: Props, ref: any) => {
  const themeClass = cx(styles.Autocomplete, {});

  return (
    <div className={`opub-Autocomplete ${themeClass}`} ref={ref} {...props} />
  );
});

export { Autocomplete };
