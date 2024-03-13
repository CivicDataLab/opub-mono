export const useIsMac = () => {
  const [isMac, setIsMac] = React.useState(false);
  React.useEffect(() => {
    setIsMac(window.navigator.platform.includes('Mac'));
  }, []);
  return isMac;
};
