import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';
import cache from 'gulp-cache';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';

/**
 * Minif SVGs and turn them into PHP partials
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder for images
 * @param phpPartialsFolder destination folder for PHP partials created from SVGs
 */
export function createIconsTask(
  srcGlobs: Globs,
  destFolder: string,
  phpPartialsFolder: string | null | undefined,
): TaskFunction {
  return () => createIconsStream(srcGlobs, destFolder, phpPartialsFolder);
}

export function createIconsStream(
  srcGlobs: Globs,
  destFolder: string,
  phpPartialsFolder: string | null | undefined,
): NodeJS.ReadWriteStream {
  return src(srcGlobs, { allowEmpty: true })
    .pipe(
      cache(
        imagemin([
          imagemin.svgo({
            plugins: [
              {
                removeViewBox: false,
              },
              {
                cleanupIDs: false,
              },
            ],
          }),
        ], {
          silent: true,
        } as imagemin.Options),
      ),
    )
    .pipe(changed(destFolder))
    .pipe(dest(destFolder))
    .pipe(gulpif(!!phpPartialsFolder, rename({
      extname: '.php',
    })))
    .pipe(gulpif(!!phpPartialsFolder, changed(phpPartialsFolder || destFolder)))
    .pipe(gulpif(!!phpPartialsFolder, dest(phpPartialsFolder || destFolder)));
}
