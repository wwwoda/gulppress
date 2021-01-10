import { reload } from 'browser-sync';
import fancyLog from 'fancy-log';
import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';
import plumber from 'gulp-plumber';
import { Configuration as WebpackConfiguration } from 'webpack';
import webpackStream from 'webpack-stream';

import { getWatchers, isDevEnv } from '../../utils';

const named = require('vinyl-named');

export function compileScriptsTask(
  globs: Globs,
  folder: string,
  webpackConfig: WebpackConfiguration,
): TaskFunction {
  return () => compileScriptsStream(globs, folder, webpackConfig);
}

export function compileScriptsStream(
  globs: Globs,
  folder: string,
  webpackConfig: WebpackConfiguration,
): NodeJS.ReadWriteStream {
  return src(globs, { allowEmpty: true })
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
    console.log('Aborting webpack due to error!');
    process.exit(1);
  }
  this.emit('end');
}
