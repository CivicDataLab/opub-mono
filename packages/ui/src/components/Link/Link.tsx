import React from "react";
import styles from "./Link.module.scss";
import cx from "classnames";

type Props = {
  children: React.ReactNode
};

const Link = React.forwardRef((props: Props, ref: any) => {
  const themeClass = cx(styles.base, {});

  return <div className={`opub-Link ${themeClass}`} ref={ref} {...props} />;
});

export { Link };
