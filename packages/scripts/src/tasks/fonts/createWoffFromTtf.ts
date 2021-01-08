import { dest, src, Globs } from 'gulp';
import filter from 'gulp-filter';

const ttf2woff = require('gulp-ttf2woff');

/**
 * Create favicon PNGs
 * @param globs Takes a glob string or an array of glob strings as the first argument
 * @param srcFolder source folder
 */
export function getCreateWoffFromTtfTask(globs: Globs) {
  return (): NodeJS.ReadWriteStream => src(globs, { allowEmpty: true, base: './' })
    .pipe(filter(file => /ttf$/.test(file.path)))
    .pipe(ttf2woff())
    .pipe(dest('./'), { overwrite: false });
}
