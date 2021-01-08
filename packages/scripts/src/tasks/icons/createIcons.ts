import { dest, Globs, src } from 'gulp';
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
export function getCreateIconsTask(
  globs: Globs,
  folder: string,
  phpPartialsFolder: string | null | undefined,
) {
  return (): NodeJS.ReadWriteStream => src(globs, { allowEmpty: true })
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
        ]),
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
