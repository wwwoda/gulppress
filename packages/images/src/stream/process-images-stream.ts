import {
  Globs,
  dest,
  src,
} from 'gulp';
import cache from 'gulp-cache';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import { cacheName } from '../cache';
import type { ImageMinConfig } from '../types';

export const createProcessImagesStream = (
  srcGlobs: Globs,
  destFolder: string,
  imageminConfig: ImageMinConfig = {},
): NodeJS.ReadWriteStream => src(srcGlobs, { allowEmpty: true })
  .pipe(
    cache(
      imagemin(
        [
          imagemin.gifsicle(imageminConfig.gifsicle || {}),
          imagemin.mozjpeg(imageminConfig.mozjpeg || {}),
          imagemin.optipng(imageminConfig.optipng || {}),
          imagemin.svgo({
            plugins: [
              { removeViewBox: false },
              { cleanupIDs: false },
            ],
            ...(imageminConfig.svgo || {}),
          }),
        ],
        imageminConfig.options || {},
      ),
      {
        name: cacheName,
      },
    ),
  )
  .on('error', (e: any) => {
    console.log(e); console.log(imageminConfig);
  })
  .pipe(changed(destFolder))
  .pipe(dest(destFolder));
