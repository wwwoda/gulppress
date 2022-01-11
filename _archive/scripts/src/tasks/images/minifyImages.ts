import {
  Globs,
  TaskFunction,
  dest,
} from 'gulp';
import cache from 'gulp-cache';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';

import { ImagesConfig } from '../../types';
import { getStream } from '../../utils';

export function minifyImagesTask (
  srcGlobs: Globs | NodeJS.ReadWriteStream,
  destFolder: string,
  imageminConfig?: ImagesConfig['imagemin'],
): TaskFunction {
  return () => (minifyImagesStream(srcGlobs, destFolder, imageminConfig));
}

export function minifyImagesStream(
  srcGlobs: Globs | NodeJS.ReadWriteStream,
  destFolder: string,
  imageminConfig?: ImagesConfig['imagemin'],
): NodeJS.ReadWriteStream {
  return getStream(srcGlobs, { allowEmpty: true })
    .pipe(
      cache(
        imagemin(
          [
            imagemin.gifsicle(imageminConfig?.gifsicle || {
              interlaced: true,
            }),
            imagemin.mozjpeg(imageminConfig?.mozjpeg || {
              progressive: true,
            }),
            imagemin.optipng(imageminConfig?.optipng || {
              optimizationLevel: 3,
            }),
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
            silent: true,
          },
        ),
        {
          name: 'images',
        },
      ),
    )
    .on('error', e => { console.log(e); })
    .pipe(changed(destFolder))
    .pipe(dest(destFolder));
}
