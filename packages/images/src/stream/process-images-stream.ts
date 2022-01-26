import sharpImages, { ImageFactoryConfigs, ImageFactoryOptions } from '@gulppress/gulp-image-factory';
import { logError } from '@gulppress/utils';
import {
  Globs,
  dest,
  src,
} from 'gulp';
import cache from 'gulp-cache';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import type { ImageMinOptions } from '../types';

export const createProcessImagesStream = (
  srcGlobs: Globs,
  destFolder: string,
  imageMinOptions?: ImageMinOptions,
  imageFactoryConfigs?: ImageFactoryConfigs,
  imageFactoryOptions?: ImageFactoryOptions,
  displayName = 'images',
): NodeJS.ReadWriteStream => src(srcGlobs, {
  silent: true,
})
  .pipe(sharpImages(imageFactoryConfigs || {}, { ...imageFactoryOptions, name: displayName }))
  .pipe(
    cache(
      imagemin(
        [
          imagemin.gifsicle(imageMinOptions?.gifsicle || {}),
          imagemin.mozjpeg(imageMinOptions?.mozjpeg || {}),
          imagemin.optipng(imageMinOptions?.optipng || {}),
          imagemin.svgo({
            plugins: [
              { removeViewBox: false },
              { cleanupIDs: false },
            ],
            ...(imageMinOptions?.svgo || {}),
          }),
        ],
        imageMinOptions?.options || {},
      ),
      {
        name: displayName,
      },
    ),
  )
  .on('error', logError)
  .pipe(changed(destFolder))
  .pipe(dest(destFolder));
