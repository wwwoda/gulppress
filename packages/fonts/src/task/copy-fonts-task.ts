import type{
  Globs,
  TaskFunction,
} from 'gulp';
import { createCopyFontsStream } from '../stream/copy-fonts-stream';

/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder
 */
export const copyFontsTask = (
  srcGlobs: Globs,
  destFolder: string,
): TaskFunction => () => createCopyFontsStream(srcGlobs, destFolder);
