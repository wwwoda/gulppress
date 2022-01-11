import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';

import { Favicon } from '../../classes/favicon';
import { FaviconConfig, FaviconSize } from '../../types';

const responsive = require('gulp-responsive');

const defaultFaviconSizes = [
  16, // Generic
  32, // Generic
  48, // Generic
  96, // Generic
  { size: 120, rename: 'apple-touch-icon.png' }, // iPhone old
  128, // Generic, MS Tile
  { size: 152, rename: 'apple-touch-icon-152.png' }, // iPad
  { size: 167, rename: 'apple-touch-icon-167.png' }, // iPad Retina
  { size: 180, rename: 'apple-touch-icon-180.png' }, // iPhone Retina
  192, // Generic, Google Developer Web App Manifest Recommendation
  270, // MS Tile
  512, // Google Developer Web App Manifest Recommendation
];

/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder
 * @param sizes
 * @param favicon
 */
export function createFaviconImagesTask(
  srcGlobs: Globs,
  destFolder: string,
  sizes: FaviconSize[] = [],
  favicon: Favicon,
  imageminConfig?: FaviconConfig['imagemin'],
): TaskFunction {
  return () => createFaviconImagesStream(
    srcGlobs,
    destFolder,
    sizes,
    favicon,
    imageminConfig,
  );
}

export function createFaviconImagesStream(
  srcGlobs: Globs,
  destFolder: string,
  sizes: FaviconSize[] = [],
  favicon: Favicon,
  imageminConfig?: FaviconConfig['imagemin'],
): NodeJS.ReadWriteStream {
  const faviconSizes = [
    ...sizes,
    ...defaultFaviconSizes,
  ].filter(uniqueFontSizes);
  console.log(faviconSizes);

  return src(srcGlobs, { allowEmpty: true })
    .pipe(favicon.processImage)
    .pipe(responsive({
      'favicon.png': Favicon.getReponsiveConfigs(faviconSizes),
    }, {
      errorOnUnusedConfig: false,
      errorOnUnusedImage: false,
      passThroughUnused: false,
      silent: true,
    }))
    .pipe(cache(
      imagemin(
        [
          imagemin.optipng(imageminConfig?.optipng || {
            optimizationLevel: 3,
          }),
        ],
        imageminConfig?.options || {
          // silent: true,
        },
      ),
      {
        name: 'favicon',
      },
    ))
    .pipe(dest(destFolder));
}

function uniqueFontSizes(
  size: FaviconSize,
  index: number,
  arr: FaviconSize[],
): size is FaviconSize {
  return arr.findIndex((s: FaviconSize) => {
    if (typeof size === 'number') {
      return size === s;
    }
    if (typeof s === 'number') {
      return false;
    }
    return size.rename === s.rename && size.size === s.size;
  }) === index;
}
