import { dest, src, Globs } from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';

/**
 * Create favicon PNGs
 * @param globs Takes a glob string or an array of glob strings as the first argument
 * @param folder destination folder
 */
export function getCopyFontsTask(globs: Globs, folder: string) {
  return (): NodeJS.ReadWriteStream => src(globs, { allowEmpty: true })
    .pipe(filter(file => /(woff|woff2)$/.test(file.path)))
    .pipe(changed(folder))
    .pipe(dest(folder));
}
