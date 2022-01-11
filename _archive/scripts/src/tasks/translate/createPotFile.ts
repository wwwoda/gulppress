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
  srcGlobs: Globs,
  destFolder: string,
  wpPotOptions: gulppress.WpPotOptions = {},
): TaskFunction {
  return () => createPotFileStream(srcGlobs, destFolder, wpPotOptions);
}

export function createPotFileStream(
  srcGlobs: Globs,
  destFolder: string,
  wpPotOptions: gulppress.WpPotOptions = {},
): NodeJS.ReadWriteStream {
  return src(srcGlobs, { allowEmpty: true })
    .pipe(sort())
    .pipe(
      wpPot(wpPotOptions),
    )
    .pipe(dest(`${destFolder}`));
}
