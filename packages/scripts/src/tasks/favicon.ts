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

export default function (config: gulpress.BasicTaskConfig): TaskFunction {
  function faviconToIco(): NodeJS.ReadWriteStream {
    return src(config.src)
      .pipe(pngFilter)
      .pipe(ico('favicon.ico', {
        resize: true,
        sizes: [32],
      }))
      .pipe(dest(config.dest));
  }

  function faviconToImages(): NodeJS.ReadWriteStream {
    return src(config.src)
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
      .pipe(dest(config.dest));
  }

  return parallel(faviconToIco, faviconToImages);
}
