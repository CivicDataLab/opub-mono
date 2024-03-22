const MENUITEM_FOCUSABLE_SELECTORS =
  'a[role="menuitem"],frame[role="menuitem"],iframe[role="menuitem"],input[role="menuitem"]:not([type=hidden]):not(:disabled),select[role="menuitem"]:not(:disabled),textarea[role="menuitem"]:not(:disabled),button[role="menuitem"]:not(:disabled),*[tabindex]:not([tabindex="-1"])';

export type MouseUpBlurHandler = (
  event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
) => void;

/**
 * Blurs the current target of a mouse up event.
 *
 * @param {React.MouseEvent<HTMLElement>} event - The mouse up event.
 */
export const handleMouseUpByBlurring: MouseUpBlurHandler = ({
  currentTarget,
}) => currentTarget.blur();

/**
 * Focuses the previous focusable menu item in a parent element.
 *
 * @param {HTMLElement} parentElement - The parent element.
 * @param {HTMLElement} currentFocusedElement - The currently focused element.
 */
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

/**
 * Focuses the next focusable menu item in a parent element.
 *
 * @param {HTMLElement} parentElement - The parent element.
 * @param {HTMLElement} currentFocusedElement - The currently focused element.
 */
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

/**
 * Focuses the first focusable menu item in a parent element.
 *
 * @param {HTMLElement} parentElement - The parent element.
 */
export function focusFirstFocusableMenuItem(parentElement: HTMLElement) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  allFocusableChildren[0].focus();
}

/**
 * Focuses the last focusable menu item in a parent element.
 *
 * @param {HTMLElement} parentElement - The parent element.
 */
export function focusLastFocusableMenuItem(parentElement: HTMLElement) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  allFocusableChildren[allFocusableChildren.length - 1].focus();
}

/**
 * Returns all focusable descendants of a menu element.
 *
 * @param {HTMLElement} element - The parent element.
 * @return {NodeListOf<HTMLElement>} The focusable descendants.
 */
function getMenuFocusableDescendants(
  element: HTMLElement
): NodeListOf<HTMLElement> {
  return element.querySelectorAll(
    MENUITEM_FOCUSABLE_SELECTORS
  ) as NodeListOf<HTMLElement>;
}

/**
 * Returns the index of the currently focused element among all focusable children.
 *
 * @param {NodeListOf<HTMLElement>} allFocusableChildren - All focusable children.
 * @param {HTMLElement} currentFocusedElement - The currently focused element.
 * @return {number} The index of the currently focused element, or -1 if the element is not found.
 */
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
