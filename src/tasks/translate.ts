import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import gulpPress from '../interfaces';

const sort = require('gulp-sort');
const wpPot = require('gulp-wp-pot');

export default function (config: gulpPress.TranslationConfig): TaskFunction {
  function translate(): NodeJS.ReadWriteStream {
    return src(config.src)
      .pipe(sort())
      .pipe(
        wpPot(config.wpPotOptions),
      )
      .pipe(dest(`${config.dest}`));
  }

  return parallel(translate);
}
