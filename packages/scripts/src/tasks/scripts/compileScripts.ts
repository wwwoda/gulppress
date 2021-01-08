import { Configuration as WebpackConfiguration } from 'webpack';

import { reload } from 'browser-sync';
import fancyLog from 'fancy-log';
import { dest, Globs, src } from 'gulp';
import plumber from 'gulp-plumber';
import webpackStream from 'webpack-stream';

import { getWatchers, isDevEnv } from '../../utils';

const named = require('vinyl-named');

export function compileScripts(
  globs: Globs,
  folder: string,
  webpackConfig: WebpackConfiguration,
) {
  return (): NodeJS.ReadWriteStream => src(globs, { allowEmpty: true })
    .pipe(plumber())
    .pipe(named())
    .pipe(webpackStream(webpackConfig, undefined, () => {
      if (getWatchers().scripts === true) {
        reload();
      }
    }).on('error', onWebpackError))
    .pipe(dest(folder));
}

function onWebpackError(this: any, error: Error) {
  fancyLog.error(error.message);
  if (!isDevEnv()) {
    console.log('Aborting scripts build task due to error!');
    process.exit(1);
  }
  this.emit('end');
}
