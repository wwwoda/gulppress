import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';
import filter from 'gulp-filter';

const ttf2woff = require('gulp-ttf2woff');

/**
 * Create favicon PNGs
 * @param globs Takes a glob string or an array of glob strings as the first argument
 * @param srcFolder source folder
 */
export function createWoffFromTtfTask(globs: Globs): TaskFunction {
  return () => createWoffFromTtfStream(globs);
}

export function createWoffFromTtfStream(globs: Globs): NodeJS.ReadWriteStream {
  return src(globs, { allowEmpty: true, base: './' })
    .pipe(filter(file => /ttf$/.test(file.path)))
    .pipe(ttf2woff())
    .pipe(dest('./'), { overwrite: false });
}
