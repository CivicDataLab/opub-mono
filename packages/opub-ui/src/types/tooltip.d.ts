type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;

type Provider = {
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   * @defaultValue 500
   */
  globalDelayDuration?: number;
  /**
   * How much time a user has to enter another trigger without incurring a delay again.
   * @defaultValue 300
   */
  skipDelayDuration?: number;
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  globalDisableHoverableContent?: boolean;
};

type Root = {
  /** The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state */
  open?: boolean;
  /** The controlled open state of the tooltip. Must be used in conjunction with onOpenChange. */
  defaultOpen?: boolean;
  /** Event handler called when the open state of the tooltip changes */
  onOpenChange?: (open: boolean) => void;
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened. This will
   * override the prop with the same name passed to Provider.
   * @defaultValue 500
   */
  delayDuration?: number;
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  disableHoverableContent?: boolean;
};

type Content = {
  /**
   * A more descriptive label for accessibility purpose
   */
  ariaLabel?: string;
  /**
   * Event handler called when the escape key is down
   */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `Tooltip`
   */
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur and avoidCollisions is enabled
   *  @defaultValue top
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * The distance in pixels from the trigger
   */
  sideOffset?: number;
  /**
   * The preferred alignment against the trigger. May change when collisions occur
   *  @defaultValue center
   */
  align?: 'start' | 'center' | 'end';
  /**
   * An offset in pixels from the "start" or "end" alignment options
   */
  alignOffset?: number;
};

export type TooltipProps = Root &
  Content & {
    /** The element that will activate to tooltip */
    children: React.ReactNode;
    /** The content to display within the tooltip */
    content: React.ReactNode;

    /** Width of content */
    width?: 'default' | 'wide';
  };

export type TooltipProviderProps = Provider & {
  children: React.ReactNode;
  /** Whether to render a dotted underline underneath the tooltip's activator */
  hasUnderline?: boolean;
};
