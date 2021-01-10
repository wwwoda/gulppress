import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';

import * as gulppress from '../../types';

const sort = require('gulp-sort');
const wpPot = require('gulp-wp-pot');

export function createPotFileTask(
  globs: Globs,
  folder: string,
  wpPotOptions: gulppress.WpPotOptions = {},
): TaskFunction {
  return () => createPotFileStream(globs, folder, wpPotOptions);
}

export function createPotFileStream(
  globs: Globs,
  folder: string,
  wpPotOptions: gulppress.WpPotOptions = {},
): NodeJS.ReadWriteStream {
  return src(globs, { allowEmpty: true })
    .pipe(sort())
    .pipe(
      wpPot(wpPotOptions),
    )
    .pipe(dest(`${folder}`));
}
