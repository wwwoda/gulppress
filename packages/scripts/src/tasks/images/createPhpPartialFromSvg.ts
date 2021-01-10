import { Globs, TaskFunction, dest } from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import rename from 'gulp-rename';

import { getStream } from '../../utils';

/**
 * Create favicon PNGs
 * @param globs Takes a glob string or an array of glob strings as the first argument
 * @param folder destination folder for images
 */
export function createPhpPartialFromSvgTask(
  globs: Globs | NodeJS.ReadWriteStream,
  folder: string,
): TaskFunction {
  return () => (createPhpPartialFromSvgStream(globs, folder));
}

/**
 * Create favicon PNGs
 * @param globs Takes a glob string or an array of glob strings as the first argument
 * @param folder destination folder for images
 */
export function createPhpPartialFromSvgStream(
  globs: Globs | NodeJS.ReadWriteStream,
  folder: string,
): NodeJS.ReadWriteStream {
  const svgFilter = filter('**/*.svg');
  return getStream(globs, { allowEmpty: true })
    .pipe(svgFilter)
    .pipe(rename({
      extname: '.php',
    }))
    .pipe(changed(folder))
    .pipe(dest(folder));
}
