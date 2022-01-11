import { Globs, TaskFunction } from 'gulp';
/**
 * Create favicon.ico file
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder
 * @param favicon
 */
export declare function cleanFoldersTask(folders: Globs): TaskFunction;
export declare function cleanFoldersPromise(folders: Globs): () => Promise<string[]>;
