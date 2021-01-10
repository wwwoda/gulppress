import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';
import filter from 'gulp-filter';

import { Favicon } from '../../classes/favicon';

const ico = require('gulp-to-ico');

const pngFilter = filter('**/*.png');

/**
 * Create favicon.ico file
 * @param globs Takes a glob string or an array of glob strings as the first argument
 * @param folder destination folder
 * @param favicon
 */
export function createFaviconIconTask(
  globs: Globs,
  folder: string,
  favicon: Favicon,
): TaskFunction {
  return () => createFaviconIconStream(globs, folder, favicon);
}

export function createFaviconIconStream(
  globs: Globs,
  folder: string,
  favicon: Favicon,
): NodeJS.ReadWriteStream {
  if (favicon.size < 16) {
    return src('./', { allowEmpty: true });
  }

  return src(globs, { allowEmpty: true })
    .pipe(pngFilter)
    .pipe(ico('favicon.ico', {
      resize: true,
      sizes: [16, 32, 48],
    }))
    .pipe(dest(folder));
}
