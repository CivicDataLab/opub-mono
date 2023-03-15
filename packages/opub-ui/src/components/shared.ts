export const scrollable = {
  props: { 'data-opub-scrollable': true },
  selector: '[data-opub-scrollable]',
};

export const overlay = {
  props: { 'data-opub-overlay': true },
  selector: '[data-opub-overlay]',
};

export const layer = {
  props: { 'data-opub-layer': true },
  selector: '[data-opub-layer]',
};

export const unstyled = {
  props: { 'data-opub-unstyled': true },
  selector: '[data-opub-unstyled]',
};

export const dataOpubTopBar = {
  props: { 'data-opub-top-bar': true },
  selector: '[data-opub-top-bar]',
};

export const headerCell = {
  props: { 'data-opub-header-cell': true },
  selector: '[data-opub-header-cell]',
};

export const portal = {
  props: ['data-portal-id'],
  selector: '[data-portal-id]',
};

export const DATA_ATTRIBUTE = {
  overlay,
  layer,
};
