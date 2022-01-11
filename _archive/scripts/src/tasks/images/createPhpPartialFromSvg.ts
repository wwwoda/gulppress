import { Globs, TaskFunction, dest } from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import rename from 'gulp-rename';

import { getStream } from '../../utils';

/**
 * Create favicon PNGs
 * @param globs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder for images
 */
export function createPhpPartialFromSvgTask(
  globs: Globs | NodeJS.ReadWriteStream,
  destFolder: string,
): TaskFunction {
  return () => (createPhpPartialFromSvgStream(globs, destFolder));
}

/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder for images
 */
export function createPhpPartialFromSvgStream(
  srcGlobs: Globs | NodeJS.ReadWriteStream,
  destFolder: string,
): NodeJS.ReadWriteStream {
  const svgFilter = filter('**/*.svg');
  return getStream(srcGlobs, { allowEmpty: true })
    .pipe(svgFilter)
    .pipe(rename({
      extname: '.php',
    }))
    .pipe(changed(destFolder))
    .pipe(dest(destFolder));
}
