import React from 'react';

import { ComplexAction } from '../../../../types/button';
import { buttonsFrom } from '../../../Button/utils';

export interface FooterProps {
  /** Primary action */
  primaryAction?: ComplexAction;
  /** Collection of secondary actions */
  secondaryActions?: ComplexAction[];
  /** The content to display inside modal */
  children?: React.ReactNode;
}

export function Footer({
  primaryAction,
  secondaryActions,
  children,
}: FooterProps) {
  const primaryActionButton =
    (primaryAction && buttonsFrom(primaryAction)) || null;
  const secondaryActionButtons =
    (secondaryActions && buttonsFrom(secondaryActions)) || null;
  const actions =
    primaryActionButton || secondaryActionButtons ? (
      <div className="flex flex-wrap items-center justify-between gap-2">
        {secondaryActionButtons}
        {primaryActionButton}
      </div>
    ) : null;

  return (
    <div className="flex items-center gap-4">
      <div className="border-gray-200 min-h-16 w-full border-t-1 border-solid border-borderDefault p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>{children}</div>
          {actions}
        </div>
      </div>
    </div>
  );
}
