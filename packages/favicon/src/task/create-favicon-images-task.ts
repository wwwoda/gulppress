import type {
  Globs,
  TaskFunction,
} from 'gulp';

import { createFaviconImagesStream } from '../stream/create-favicon-images-stream';

export const createFaviconImagesTask = (
  srcGlobs: Globs,
  destFolder: string,
): TaskFunction => () => createFaviconImagesStream(
  srcGlobs,
  destFolder,
);
