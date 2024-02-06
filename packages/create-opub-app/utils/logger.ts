import { cyan, green, red, yellow } from 'picocolors';

export const logger = {
  error(args: string | number | null | undefined) {
    console.log(red(args));
  },
  warn(args: string | number | null | undefined) {
    console.log(yellow(args));
  },
  info(args: string | number | null | undefined) {
    console.log(cyan(args));
  },
  success(args: string | number | null | undefined) {
    console.log(green(args));
  },
};

export const colors = {
  error(args: string | number | null | undefined) {
    red(args);
  },
  warn(args: string | number | null | undefined) {
    yellow(args);
  },
  info(args: string | number | null | undefined) {
    cyan(args);
  },
  success(args: string | number | null | undefined) {
    green(args);
  },
};
