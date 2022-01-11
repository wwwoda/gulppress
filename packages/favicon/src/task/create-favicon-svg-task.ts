import type {
  Globs,
  TaskFunction,
} from 'gulp';

import { createFaviconSvgStream } from '../stream/create-favicon-svg-stream';

export const createFaviconSvgTask = (
  srcGlobs: Globs,
  destFolder: string,
): TaskFunction => () => createFaviconSvgStream(srcGlobs, destFolder);
