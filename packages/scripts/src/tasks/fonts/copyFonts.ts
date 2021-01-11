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
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder
 */
export function copyFontsTask(srcGlobs: Globs, destFolder: string): TaskFunction {
  return () => copyFontsStream(srcGlobs, destFolder);
}

export function copyFontsStream(srcGlobs: Globs, destFolder: string): NodeJS.ReadWriteStream {
  return src(srcGlobs, { allowEmpty: true })
    .pipe(filter(file => /(woff|woff2)$/.test(file.path)))
    .pipe(changed(destFolder))
    .pipe(dest(destFolder));
}
