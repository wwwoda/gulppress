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
 * @param globs Takes a glob string or an array of glob strings as the first argument
 * @param folder destination folder for images
 * @param phpPartialsFolder destination folder for PHP partials created from SVGs
 */
export function createIconsTask(
  globs: Globs,
  folder: string,
  phpPartialsFolder: string | null | undefined,
): TaskFunction {
  return () => createIconsStream(globs, folder, phpPartialsFolder);
}

export function createIconsStream(
  globs: Globs,
  folder: string,
  phpPartialsFolder: string | null | undefined,
): NodeJS.ReadWriteStream {
  return src(globs, { allowEmpty: true })
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
    .pipe(changed(folder))
    .pipe(dest(folder))
    .pipe(gulpif(!!phpPartialsFolder, rename({
      extname: '.php',
    })))
    .pipe(gulpif(!!phpPartialsFolder, changed(phpPartialsFolder || folder)))
    .pipe(gulpif(!!phpPartialsFolder, dest(phpPartialsFolder || folder)));
}
