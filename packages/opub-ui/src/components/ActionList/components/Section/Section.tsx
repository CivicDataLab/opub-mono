import type {
  ActionListItemDescriptor,
  ActionListSection,
} from '../../../../types/actionlist';
// import { Box } from '../../../Box';
import { MenuContext } from '../../../Menu/Menu';
import { Text } from '../../../Text';
import { Item } from '../Item';
import React from 'react';

export interface SectionProps {
  /** Section of action items */
  section: ActionListSection;
  /** Should there be multiple sections */
  hasMultipleSections: boolean;
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'option' | 'menuitem' | string;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
  /** Whether it is the first in a group of sections */
  isFirst?: boolean;
}

export function Section({
  section,
  hasMultipleSections,
  isFirst,
  actionRole,
  onActionAnyItem,
}: SectionProps) {
  const callbackContent = React.useContext(MenuContext);

  const handleAction = (
    itemOnAction: ActionListItemDescriptor['onAction'],
    content?: string
  ) => {
    return () => {
      if (itemOnAction) {
        itemOnAction(callbackContent || content);
      }
      if (onActionAnyItem) {
        onActionAnyItem(callbackContent || content);
      }
    };
  };
  const actionMarkup = section.items.map(
    ({ content, helpText, onAction, ...item }, index) => {
      return (
        <li
          key={`${content}-${index}`}
          role={actionRole === 'menuitem' ? 'presentation' : undefined}
        >
          <Item
            content={content}
            helpText={helpText}
            role={actionRole}
            onAction={handleAction(onAction, content)}
            {...item}
          />
        </li>
      );
    }
  );

  const titleMarkup = section.title ? (
    <div style={{ padding: 'var(--space-2)' }}>
      <Text as="p" variant="bodySm" fontWeight="semibold">
        {section.title}
      </Text>
    </div>
  ) : null;

  let sectionRole: 'menu' | 'presentation' | undefined;
  switch (actionRole) {
    case 'option':
      sectionRole = 'presentation';
      break;
    case 'menuitem':
      sectionRole = !hasMultipleSections ? 'menu' : 'presentation';
      break;
    default:
      sectionRole = undefined;
      break;
  }

  const sectionMarkup = (
    <>
      {titleMarkup}
      <ul
        style={{
          ...(hasMultipleSections && { paddingBlockStart: '0' }),
          ...(sectionRole && { role: sectionRole }),
          padding: 'var(--space-05)',
        }}
        tabIndex={!hasMultipleSections ? -1 : undefined}
      >
        {actionMarkup}
      </ul>
    </>
  );

  return hasMultipleSections ? (
    <li
      role="presentation"
      style={{
        ...(!isFirst && {
          borderBlockStart: 'var(--border-default)',
          borderBlockStartWidth: 'var(--space-025)',
          borderBlockStartStyle: 'solid',
        }),
        ...(!section.title && { paddingBlockStart: 'var(--space-2)' }),
      }}
    >
      {sectionMarkup}
    </li>
  ) : (
    sectionMarkup
  );
}
