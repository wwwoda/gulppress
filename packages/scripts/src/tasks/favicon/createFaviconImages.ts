import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';
import imagemin from 'gulp-imagemin';

import { Favicon } from '../../classes/favicon';
import * as gulppress from '../../types';

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
  sizes: gulppress.FaviconSizes = [],
  favicon: Favicon,
): TaskFunction {
  return () => createFaviconImagesStream(
    srcGlobs,
    destFolder,
    [
      ...sizes,
      ...defaultFaviconSizes,
    ],
    favicon,
  );
}

export function createFaviconImagesStream(
  srcGlobs: Globs,
  destFolder: string,
  sizes: gulppress.FaviconSizes = [],
  favicon: Favicon,
): NodeJS.ReadWriteStream {
  const faviconSizes = [
    ...sizes,
    ...defaultFaviconSizes,
  ];
  return src(srcGlobs, { allowEmpty: true })
    .pipe(favicon.processImage)
    .pipe(responsive({
      'favicon.png': Favicon.getReponsiveConfigs(faviconSizes),
    }, {
      errorOnUnusedConfig: false,
      errorOnUnusedImage: false,
      passThroughUnused: true,
      silent: true,
    }))
    .pipe(imagemin())
    .pipe(dest(destFolder));
}
