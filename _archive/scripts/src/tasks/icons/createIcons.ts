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

import { IconsConfig } from '../../types';

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
  imageminConfig?: IconsConfig['imagemin'],
): TaskFunction {
  return () => createIconsStream(srcGlobs, destFolder, phpPartialsFolder, imageminConfig);
}

export function createIconsStream(
  srcGlobs: Globs,
  destFolder: string,
  phpPartialsFolder: string | null | undefined,
  imageminConfig?: IconsConfig['imagemin'],
): NodeJS.ReadWriteStream {
  return src(srcGlobs, { allowEmpty: true })
    .pipe(
      cache(
        imagemin(
          [
            imagemin.svgo(imageminConfig?.svgo || {
              plugins: [
                {
                  removeViewBox: false,
                },
                {
                  cleanupIDs: false,
                },
              ],
            }),
          ],
          imageminConfig?.options || {
            // silent: true,
          },
        ),
        {
          name: 'icons',
        },
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
