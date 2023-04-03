import { useRef } from 'react';
import type { ActionListItemDescriptor, ActionListSection } from '../../types';
import { Key } from '../../types';
import {
  wrapFocusNextFocusableMenuItem,
  wrapFocusPreviousFocusableMenuItem,
} from '../../utils/focus';
import { Box } from '../Box';
import { KeypressListener } from '../KeypressListener';
import { Item, ItemProps } from './components/Item';
import { Section } from './components/Section';

export interface ActionListProps {
  /** Collection of actions for list */
  items?: readonly ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: readonly ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'menuitem' | string;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
}

export type ActionListItemProps = ItemProps;

export function ActionList({
  items,
  sections = [],
  actionRole,
  onActionAnyItem,
}: ActionListProps) {
  let finalSections: readonly ActionListSection[] = [];
  const actionListRef = useRef<HTMLDivElement & HTMLUListElement>(null);

  if (items) {
    finalSections = [{ items }, ...sections];
  } else if (sections) {
    finalSections = sections;
  }

  const hasMultipleSections = finalSections.length > 1;
  const elementRole =
    hasMultipleSections && actionRole === 'menuitem' ? 'menu' : undefined;
  const elementTabIndex =
    hasMultipleSections && actionRole === 'menuitem' ? -1 : undefined;

  const sectionMarkup = finalSections.map((section, index) => {
    return section.items.length > 0 ? (
      <Section
        key={section.title || index}
        section={section}
        hasMultipleSections={hasMultipleSections}
        actionRole={actionRole}
        onActionAnyItem={onActionAnyItem}
        isFirst={index === 0}
      />
    ) : null;
  });

  const handleFocusChange = (
    evt: KeyboardEvent,
    focusFn: (a: any, b: any) => void
  ) => {
    if (actionListRef.current && evt.target) {
      if (actionListRef.current.contains(evt.target as HTMLElement)) {
        focusFn(actionListRef.current, evt.target as HTMLElement);
      }
    }
  };

  const listeners =
    actionRole === 'menuitem' ? (
      <>
        <KeypressListener
          keyEvent="keydown"
          keyCode={Key.ArrowDown}
          handler={(e: KeyboardEvent) =>
            handleFocusChange(e, wrapFocusNextFocusableMenuItem)
          }
        />
        <KeypressListener
          keyEvent="keydown"
          keyCode={Key.ArrowRight}
          handler={(e: KeyboardEvent) =>
            handleFocusChange(e, wrapFocusNextFocusableMenuItem)
          }
        />
        <KeypressListener
          keyEvent="keydown"
          keyCode={Key.ArrowUp}
          handler={(e: KeyboardEvent) =>
            handleFocusChange(e, wrapFocusPreviousFocusableMenuItem)
          }
        />
        <KeypressListener
          keyEvent="keydown"
          keyCode={Key.ArrowLeft}
          handler={(e: KeyboardEvent) =>
            handleFocusChange(e, wrapFocusPreviousFocusableMenuItem)
          }
        />
      </>
    ) : null;

  return (
    <Box
      as={hasMultipleSections ? 'ul' : 'div'}
      ref={actionListRef}
      role={elementRole}
      tabIndex={elementTabIndex}
    >
      {listeners}
      {sectionMarkup}
    </Box>
  );
}

ActionList.Item = Item;
