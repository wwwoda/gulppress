import {
  dest,
  Globs,
  src,
  TaskFunction,
} from 'gulp';

import gulpress from '../../interfaces';

const sort = require('gulp-sort');
const wpPot = require('gulp-wp-pot');

export function getCreatePotFileTask(
  globs: Globs,
  folder: string,
  wpPotOptions: gulpress.WpPotOptions = {},
): TaskFunction {
  return (): NodeJS.ReadWriteStream => getCreatePotFileStream(globs, folder, wpPotOptions);
}

export function getCreatePotFileStream(
  globs: Globs,
  folder: string,
  wpPotOptions: gulpress.WpPotOptions = {},
): NodeJS.ReadWriteStream {
  return src(globs, { allowEmpty: true })
    .pipe(sort())
    .pipe(
      wpPot(wpPotOptions),
    )
    .pipe(dest(`${folder}`));
}
