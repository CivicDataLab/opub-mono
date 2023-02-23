export type MouseUpBlurHandler = (
  event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
) => void;

export const handleMouseUpByBlurring: MouseUpBlurHandler = ({
  currentTarget,
}) => currentTarget.blur();
