import processFonts, { FontFactoryConfigs, FontFactoryOptions } from '@gulppress/gulp-font-factory';
import { logError } from '@gulppress/utils';
import {
  Globs,
  dest,
  src,
} from 'gulp';

export const createProcessFontsStream = (
  srcGlobs: Globs,
  destFolder: string,
  factoryConfigs?: FontFactoryConfigs,
  factoryOptions?: FontFactoryOptions,
  displayName = 'fonts',
): NodeJS.ReadWriteStream => src(srcGlobs)
  .pipe(processFonts(factoryConfigs || {}, {
    name: displayName,
    ...factoryOptions,
  }))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .on('error', logError)
  .pipe(dest(destFolder));
