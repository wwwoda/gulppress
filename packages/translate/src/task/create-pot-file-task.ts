import type{
  Globs,
  TaskFunction,
} from 'gulp';
import type { WpPotOptions } from 'gulp-wp-pot';
import { createPotFileStream } from '../stream/create-pot-file-stream';

export const createPotFileTask = (
  srcGlobs: Globs,
  destFolder: string,
  wpPotOptions: WpPotOptions = {},
): TaskFunction => () => createPotFileStream(srcGlobs, destFolder, wpPotOptions);
