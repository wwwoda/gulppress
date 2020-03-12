import chalk from 'chalk';
import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import filter from 'gulp-filter';
import imagemin from 'gulp-imagemin';

import gulpress from '../interfaces';

const responsive = require('gulp-responsive');
const ico = require('gulp-to-ico');

const pngFilter = filter('**/*.png');

export default function (
  config: gulpress.BasicTaskConfig | false | null | undefined,
): TaskFunction {
  if (!config) {
    return parallel(cb => {
      console.log(chalk.red('Favicon configuration missing!'));
      cb();
    });
  }

  const faviconSrc = (config && config.src) || '';
  const faviconDest = (config && config.dest) || '';

  function faviconToIco(): NodeJS.ReadWriteStream {
    return src(faviconSrc)
      .pipe(pngFilter)
      .pipe(ico('favicon.ico', {
        resize: true,
        sizes: [32],
      }))
      .pipe(dest(faviconDest));
  }

  function faviconToImages(): NodeJS.ReadWriteStream {
    return src(faviconSrc)
      .pipe(responsive({
        'favicon.png': [{
          width: 16,
          height: 16,
          fit: 'cover',
          skipOnEnlargement: true,
          rename: 'favicon-16.png',
        }, {
          width: 32,
          height: 32,
          fit: 'cover',
          skipOnEnlargement: true,
          rename: 'favicon-32.png',
        }, {
          width: 96,
          height: 96,
          fit: 'cover',
          skipOnEnlargement: true,
          rename: 'favicon-96.png',
        }, {
          width: 192,
          height: 192,
          fit: 'cover',
          skipOnEnlargement: true,
        }],
      }, {
        errorOnUnusedConfig: false,
        errorOnUnusedImage: false,
        passThroughUnused: true,
        silent: true,
      }))
      .pipe(imagemin())
      .pipe(dest((faviconDest)));
  }

  return parallel(faviconToIco, faviconToImages);
}
