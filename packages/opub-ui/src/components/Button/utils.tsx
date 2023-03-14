import type { ComplexAction } from '@ui/types/button';
import { Button } from './Button';
import type { ButtonProps } from './Button';

export function buttonFrom(
  { content, onAction, ...action }: ComplexAction,
  overrides?: Partial<ButtonProps>,
  key?: any
) {
  return (
    <Button key={key} onClick={onAction} {...action} {...overrides}>
      {/* @ts-ignore */}
      {content}
    </Button>
  );
}
