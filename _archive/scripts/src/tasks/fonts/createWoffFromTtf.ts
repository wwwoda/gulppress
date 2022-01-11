import { existsSync } from 'fs';

import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';
import filter from 'gulp-filter';
import File from 'vinyl';

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
    .pipe(filter(fontFilter))
    .pipe(ttf2woff())
    .pipe(dest('./'), { overwrite: false });
}

function fontFilter(file: File): boolean {
  if (!/ttf$/.test(file.path)) {
    return false;
  }
  return !existsSync(file.path.replace(/ttf$/, 'woff'));
}
