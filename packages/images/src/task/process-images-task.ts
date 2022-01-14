import type { ImageMinConfig } from '@gulppress/types';
import type {
  Globs,
  TaskFunction,
} from 'gulp';

import { createProcessImagesStream } from '../stream/process-images-stream';

export const createProcessImagesTask = (
  srcGlobs: Globs,
  destFolder: string,
  imageminConfig?: ImageMinConfig,
  cacheName?: string,
): TaskFunction => () => createProcessImagesStream(srcGlobs, destFolder, imageminConfig, cacheName);
