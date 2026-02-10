export {};

declare module '*.scss';

declare global {
  interface Window {
    __resource: any;
  }
}
