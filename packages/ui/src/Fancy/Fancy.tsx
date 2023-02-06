import React from "react";

interface Props {
  children: React.ReactNode
}

const Fancy = React.forwardRef((props: Props, ref: any) => {
  return <div ref={ref} {...props} />;
});

export { Fancy };
