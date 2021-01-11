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
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param srcFolder source folder
 */
export function createWoffFromTtfTask(srcGlobs: Globs): TaskFunction {
  return () => createWoffFromTtfStream(srcGlobs);
}

export function createWoffFromTtfStream(srcGlobs: Globs): NodeJS.ReadWriteStream {
  return src(srcGlobs, { allowEmpty: true, base: './' })
    .pipe(filter(file => /ttf$/.test(file.path)))
    .pipe(ttf2woff())
    .pipe(dest('./'), { overwrite: false });
}
