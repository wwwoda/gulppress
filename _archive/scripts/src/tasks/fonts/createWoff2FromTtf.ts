import { existsSync } from 'fs';

import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';
import filter from 'gulp-filter';
import File from 'vinyl';

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
    .pipe(filter(fontFilter))
    .pipe(ttf2woff2())
    .pipe(dest('./'), { overwrite: false });
}

function fontFilter(file: File): boolean {
  if (!/ttf$/.test(file.path)) {
    return false;
  }
  return !existsSync(file.path.replace(/ttf$/, 'woff2'));
}
