import type { ComplexAction } from '../../types/button';
import { Button } from './Button';
import type { ButtonProps } from './Button';

export function buttonFrom(
  { content, onAction, ...action }: ComplexAction,
  overrides?: Partial<ButtonProps>,
  key?: any
) {
  return (
    <Button key={key} onClick={onAction} {...action} {...overrides}>
      {content}
    </Button>
  );
}

export function buttonsFrom(
  actions: ComplexAction[] | ComplexAction,
  overrides: Partial<ButtonProps> = {}
) {
  if (Array.isArray(actions)) {
    return actions.map((action, index) => buttonFrom(action, overrides, index));
  } else {
    const action = actions;
    return buttonFrom(action, overrides);
  }
}
