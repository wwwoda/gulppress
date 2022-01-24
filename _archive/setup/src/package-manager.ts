import { root } from './path';
import { fileExists } from './file';

export const detect = (): 'yarn' | 'npm' => {
  const execPath = process.env.npm_execpath || '';

  if (
    execPath.endsWith('yarn.js')
      || execPath.endsWith('yarn')
      || hasYarnLockFile()
  ) {
    return 'yarn';
  }

  return 'npm';
};

export const hasYarnLockFile = (): boolean => fileExists(root('yarn.lock'));
