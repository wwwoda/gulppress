import type { FontFactoryConfigs, FontFactoryOptions } from '@gulppress/gulp-font-factory';
import type {
  Globs,
  TaskFunction,
} from 'gulp';

import { createProcessFontsStream } from '../stream/process-fonts-stream';

export const createProcessFontsTask = (
  srcGlobs: Globs,
  destFolder: string,
  factoryConfigs?: FontFactoryConfigs,
  factoryOptions?: FontFactoryOptions,
  displayName?: string,
): TaskFunction => () => createProcessFontsStream(
  srcGlobs,
  destFolder,
  factoryConfigs,
  factoryOptions,
  displayName,
);
