import React from 'react';

export const useIsMac = () => {
  const [isMac, setIsMac] = React.useState(false);
  React.useEffect(() => {
    setIsMac(window.navigator.userAgent.includes('Mac'));
  }, []);
  return isMac;
};
