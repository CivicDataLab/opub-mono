export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function getPkgManager(): PackageManager {
  // TODO: Add support for pnpm and npm
  return 'yarn';
}
