// https://stackoverflow.com/questions/51093666/conditional-gulp-task-inside-gulp-paralell-or-gulp-series
import chalk from 'chalk';
import {
  dest,
  parallel,
  series,
  src,
  TaskFunction,
} from 'gulp';
import filter from 'gulp-filter';
import imagemin from 'gulp-imagemin';
import gulpress from '../interfaces';

import { FaviconHelper } from '../module/favicon';

const file = require('gulp-file');
const responsive = require('gulp-responsive');
const ico = require('gulp-to-ico');

const pngFilter = filter('**/*.png');

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

export default function (
  config: gulpress.FaviconConfig | null | undefined,
): TaskFunction {
  if (!config) {
    return parallel(cb => {
      console.log(chalk.red('Favicon configuration missing!'));
      cb();
    });
  }
  const faviconHelper = new FaviconHelper();
  const faviconSrc = (config && config.src) || '';
  const faviconDest = (config && config.dest) || '';
  const faviconColor = (config && config.color) || '';
  const customFaviconSizes = (config && config.sizes) || [];
  const faviconSizes = [
    ...customFaviconSizes,
    ...defaultFaviconSizes,
  ];

  function faviconToImages(): NodeJS.ReadWriteStream {
    return src(faviconSrc, { allowEmpty: true })
      .pipe(faviconHelper.processImage)
      .pipe(responsive({
        'favicon.png': FaviconHelper.getReponsiveConfigs(faviconSizes),
      }, {
        errorOnUnusedConfig: false,
        errorOnUnusedImage: false,
        passThroughUnused: true,
        silent: true,
      }))
      .pipe(imagemin())
      .pipe(dest((faviconDest)));
  }

  function setColor(cb: CallableFunction): NodeJS.ReadWriteStream {
    faviconHelper.setColor(faviconColor);
    return cb();
  }

  function faviconToIco(): NodeJS.ReadWriteStream {
    if (faviconHelper.size < 16) {
      return src('./');
    }

    return src(faviconSrc, { allowEmpty: true })
      .pipe(pngFilter)
      .pipe(ico('favicon.ico', {
        resize: true,
        sizes: [16, 32, 48],
      }))
      .pipe(dest(faviconDest));
  }

  function createManifest(): NodeJS.ReadWriteStream {
    const manifest = faviconHelper.getManifest();
    if (!manifest) {
      return src('./');
    }
    return file('manifest.json', manifest, { src: true })
      .pipe(dest((faviconDest)));
  }

  function createHtml(): NodeJS.ReadWriteStream {
    const html = faviconHelper.getHtml();
    if (!html) {
      return src('./');
    }
    return file('favicon.html', html, { src: true })
      .pipe(dest((faviconDest)));
  }

  return series(faviconToImages, setColor, parallel(faviconToIco, createHtml, createManifest));
}
