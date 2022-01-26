import type { ImageFactoryConfigs, ImageFactoryOptions } from '@gulppress/gulp-image-factory';
import type {
  Globs,
  TaskFunction,
} from 'gulp';
import type { ImageMinOptions } from '../types';

import { createProcessImagesStream } from '../stream/process-images-stream';

export const createProcessImagesTask = (
  srcGlobs: Globs,
  destFolder: string,
  imageMinOptions?: ImageMinOptions,
  imageFactoryConfigs?: ImageFactoryConfigs,
  imageFactoryOptions?: ImageFactoryOptions,
  displayName?: string,
): TaskFunction => () => createProcessImagesStream(
  srcGlobs,
  destFolder,
  imageMinOptions,
  imageFactoryConfigs,
  imageFactoryOptions,
  displayName,
);
