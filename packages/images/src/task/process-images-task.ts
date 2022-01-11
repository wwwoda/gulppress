import type {
  Globs,
  TaskFunction,
} from 'gulp';

import { createProcessImagesStream } from '../stream/process-images-stream';
import type { ImageMinConfig } from '../types';

export const createProcessImagesTask = (
  srcGlobs: Globs,
  destFolder: string,
  imageminConfig?: ImageMinConfig,
): TaskFunction => () => createProcessImagesStream(srcGlobs, destFolder, imageminConfig);
