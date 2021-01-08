import { dest, Globs, src } from 'gulp';
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
export function getCreateFaviconIconTask(
  globs: Globs,
  folder: string,
  favicon: Favicon,
) {
  return (): NodeJS.ReadWriteStream => {
    if (favicon.size < 16) {
      return src('./');
    }

    return src(globs, { allowEmpty: true })
      .pipe(pngFilter)
      .pipe(ico('favicon.ico', {
        resize: true,
        sizes: [16, 32, 48],
      }))
      .pipe(dest(folder));
  };
}
