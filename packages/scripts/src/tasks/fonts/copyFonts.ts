import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';

/**
 * Create favicon PNGs
 * @param globs Takes a glob string or an array of glob strings as the first argument
 * @param folder destination folder
 */
export function copyFontsTask(globs: Globs, folder: string): TaskFunction {
  return () => copyFontsStream(globs, folder);
}

export function copyFontsStream(globs: Globs, folder: string): NodeJS.ReadWriteStream {
  return src(globs, { allowEmpty: true })
    .pipe(filter(file => /(woff|woff2)$/.test(file.path)))
    .pipe(changed(folder))
    .pipe(dest(folder));
}
