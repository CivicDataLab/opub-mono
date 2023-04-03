import {
  AlertMinor,
  CircleCancelMinor,
  CircleTickMinor,
  InfoMinor,
  RiskMinor,
} from '@shopify/polaris-icons';

const handler = {
  get: function (target: any, name: any) {
    return target.hasOwnProperty(name) ? target[name] : AlertMinor; // default value
  },
};

export const icons = {
  success: CircleTickMinor,
  error: AlertMinor,
  warning: RiskMinor,
  info: InfoMinor,
  close: CircleCancelMinor,
};

export const stateIcon = new Proxy(icons, handler);
