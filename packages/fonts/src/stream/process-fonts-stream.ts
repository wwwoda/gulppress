import processFonts, { FontFactoryConfigs, FontFactoryOptions } from '@gulppress/gulp-font-factory';
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
): NodeJS.ReadWriteStream => src(srcGlobs, {
  silent: true,
})
  .pipe(processFonts(factoryConfigs || {}, { ...factoryOptions, name: displayName }))
  .on('error', (e: any) => {
    console.log(e);
  })
  .pipe(dest(destFolder));
