const MENUITEM_FOCUSABLE_SELECTORS =
  'a[role="menuitem"],frame[role="menuitem"],iframe[role="menuitem"],input[role="menuitem"]:not([type=hidden]):not(:disabled),select[role="menuitem"]:not(:disabled),textarea[role="menuitem"]:not(:disabled),button[role="menuitem"]:not(:disabled),*[tabindex]:not([tabindex="-1"])';

export type MouseUpBlurHandler = (
  event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
) => void;

export const handleMouseUpByBlurring: MouseUpBlurHandler = ({
  currentTarget,
}) => currentTarget.blur();

export function wrapFocusPreviousFocusableMenuItem(
  parentElement: HTMLElement,
  currentFocusedElement: HTMLElement
) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  const currentItemIdx = getCurrentFocusedElementIndex(
    allFocusableChildren,
    currentFocusedElement
  );
  if (currentItemIdx === -1) {
    allFocusableChildren[0].focus();
  } else {
    allFocusableChildren[
      (currentItemIdx - 1 + allFocusableChildren.length) %
        allFocusableChildren.length
    ].focus();
  }
}

export function wrapFocusNextFocusableMenuItem(
  parentElement: HTMLElement,
  currentFocusedElement: HTMLElement
) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  const currentItemIdx = getCurrentFocusedElementIndex(
    allFocusableChildren,
    currentFocusedElement
  );
  if (currentItemIdx === -1) {
    allFocusableChildren[0].focus();
  } else {
    allFocusableChildren[
      (currentItemIdx + 1) % allFocusableChildren.length
    ].focus();
  }
}

export function focusFirstFocusableMenuItem(parentElement: HTMLElement) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  allFocusableChildren[0].focus();
}

export function focusLastFocusableMenuItem(parentElement: HTMLElement) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  allFocusableChildren[allFocusableChildren.length - 1].focus();
}

function getMenuFocusableDescendants(
  element: HTMLElement
): NodeListOf<HTMLElement> {
  return element.querySelectorAll(
    MENUITEM_FOCUSABLE_SELECTORS
  ) as NodeListOf<HTMLElement>;
}

function getCurrentFocusedElementIndex(
  allFocusableChildren: NodeListOf<HTMLElement>,
  currentFocusedElement: HTMLElement
): number {
  let currentItemIdx = 0;

  for (const focusableChild of allFocusableChildren) {
    if (focusableChild === currentFocusedElement) {
      break;
    }
    currentItemIdx++;
  }
  return currentItemIdx === allFocusableChildren.length ? -1 : currentItemIdx;
}
