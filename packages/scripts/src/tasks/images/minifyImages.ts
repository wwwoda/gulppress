import {
  Globs,
  TaskFunction,
  dest,
} from 'gulp';
import cache from 'gulp-cache';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';

import { ImageMin } from '../../types';
import { getStream } from '../../utils';

export function minifyImagesTask(
  srcGlobs: Globs | NodeJS.ReadWriteStream,
  destFolder: string,
): TaskFunction {
  return () => (minifyImagesStream(srcGlobs, destFolder));
}

export function minifyImagesStream(
  srcGlobs: Globs | NodeJS.ReadWriteStream,
  destFolder: string,
  imageminConfig?: ImageMin,
): NodeJS.ReadWriteStream {
  return getStream(srcGlobs, { allowEmpty: true })
    .pipe(
      cache(
        imagemin([
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
        ], imageminConfig?.options || {}),
      ),
    )
    .on('error', e => { console.log(e); })
    .pipe(changed(destFolder))
    .pipe(dest(destFolder));
}
