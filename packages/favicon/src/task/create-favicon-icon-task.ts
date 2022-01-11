import type {
  Globs,
  TaskFunction,
} from 'gulp';

import { createFaviconIconStream } from '../stream/create-favicon-icon-stream';

export const createFaviconIconTask = (
  srcGlobs: Globs,
  destFolder: string,
): TaskFunction => () => createFaviconIconStream(srcGlobs, destFolder);
