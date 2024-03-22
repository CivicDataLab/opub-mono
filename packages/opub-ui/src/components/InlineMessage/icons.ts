import {
  IconAlertCircleFilled,
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconInfoCircleFilled,
  IconX,
} from '@tabler/icons-react';

const handler = {
  get: function (target: any, name: any) {
    return Object.prototype.hasOwnProperty.call(target, name)
      ? target[name]
      : IconAlertTriangleFilled; // default value
  },
};

export const icons = {
  success: IconCircleCheckFilled,
  error: IconAlertCircleFilled,
  warning: IconAlertTriangleFilled,
  info: IconInfoCircleFilled,
  close: IconX,
};

export const stateIcon = new Proxy(icons, handler);
