import del from 'del';
import { Globs, TaskFunction } from 'gulp';

/**
 * Create favicon.ico file
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder
 * @param favicon
 */
export function cleanFoldersTask(folders: Globs): TaskFunction {
  return cleanFoldersPromise(folders);
}

export function cleanFoldersPromise(folders: Globs) {
  return () => del(folders, { force: true });
}
