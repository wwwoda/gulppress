import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';
import filter from 'gulp-filter';

const ttf2woff2 = require('gulp-ttf2woff2');

/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param srcFolder source folder
 */
export function createWoff2FromTtfTask(srcGlobs: Globs): TaskFunction {
  return () => createWoff2FromTtfStream(srcGlobs);
}

export function createWoff2FromTtfStream(srcGlobs: Globs): NodeJS.ReadWriteStream {
  return src(srcGlobs, { allowEmpty: true, base: './' })
    .pipe(filter(file => /ttf$/.test(file.path)))
    .pipe(ttf2woff2())
    .pipe(dest('./'), { overwrite: false });
}
