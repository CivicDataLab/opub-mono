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
    return red(args);
  },
  warn(args: string | number | null | undefined) {
    return yellow(args);
  },
  info(args: string | number | null | undefined) {
    return cyan(args);
  },
  success(args: string | number | null | undefined) {
    return green(args);
  },
};
