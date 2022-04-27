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
  imageminOptions?: ImageMinOptions,
  imageFactoryConfigs?: ImageFactoryConfigs,
  imageFactoryOptions?: ImageFactoryOptions,
  disableCache?: boolean,
  disableGulpChanged?: boolean,
  disableImagemin?: boolean,
  displayName?: string,
): TaskFunction => () => createProcessImagesStream(
  srcGlobs,
  destFolder,
  imageminOptions,
  imageFactoryConfigs,
  imageFactoryOptions,
  disableCache,
  disableGulpChanged,
  disableImagemin,
  displayName,
);
