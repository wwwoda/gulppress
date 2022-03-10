import type{
  Globs,
  TaskFunction,
} from 'gulp';
import type { WpPotOptions } from 'gulp-zip';
import { createPotFileStream } from '../stream/create-zip-file-stream';

export const createPotFileTask = (
  srcGlobs: Globs,
  destFolder: string,
  options: WpPotOptions = {},
): TaskFunction => () => createPotFileStream(srcGlobs, destFolder, wpPotOptions);
