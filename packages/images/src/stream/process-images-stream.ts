import sharpImages, { ImageFactoryConfigs, ImageFactoryOptions } from '@gulppress/gulp-image-factory';
import { logError } from '@gulppress/utils';
import {
  Globs,
  dest,
  src,
} from 'gulp';
import cache from 'gulp-cache';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import type { ImageMinOptions } from '../types';

export const createProcessImagesStream = (
  srcGlobs: Globs,
  destFolder: string,
  imageminOptions?: ImageMinOptions,
  imageFactoryConfigs?: ImageFactoryConfigs,
  imageFactoryOptions?: ImageFactoryOptions,
  disableCache?: boolean,
  disableGulpChanged?: boolean,
  disableImagemin?: boolean,
  displayName = 'images',
): NodeJS.ReadWriteStream => {
  const imageminTransform = imagemin(
    [
      imagemin.gifsicle(imageminOptions?.gifsicle || {}),
      imagemin.mozjpeg(imageminOptions?.mozjpeg || {}),
      imagemin.optipng(imageminOptions?.optipng || {}),
      imagemin.svgo(imageminOptions?.svgo || {}),
    ],
    imageminOptions?.options || {},
  );
  return src(srcGlobs, {
    silent: true,
  })
    .pipe(sharpImages(imageFactoryConfigs || {}, { ...imageFactoryOptions, name: displayName }))
    .pipe(gulpif(
      disableImagemin !== true,
      disableCache === true
        ? imageminTransform
        : cache(imageminTransform, { name: displayName }),
    ))
    .on('error', logError)
    .pipe(gulpif(disableGulpChanged !== true, changed(destFolder)))
    .pipe(dest(destFolder));
};
