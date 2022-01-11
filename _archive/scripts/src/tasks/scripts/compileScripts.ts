import { reload } from 'browser-sync';
import fancyLog from 'fancy-log';
import {
  Globs,
  TaskFunction,
  TaskFunctionCallback,
  dest,
  src,
} from 'gulp';
import plumber from 'gulp-plumber';
import notifier from 'node-notifier';
import { Configuration as WebpackConfiguration } from 'webpack';
import webpack from 'webpack-stream';

import { inProductionEnv, watch } from '../../utils';

const named = require('vinyl-named');
const compiler = require('webpack');


export function compileScriptsTask(
  srcGlobs: Globs,
  destFolder: string,
  webpackConfig: WebpackConfiguration,
): TaskFunction {
  return (done: TaskFunctionCallback) => compileScriptsStream(srcGlobs, destFolder, webpackConfig, done);
}

export function compileScriptsStream(
  srcGlobs: Globs,
  destFolder: string,
  webpackConfig: WebpackConfiguration,
  done: TaskFunctionCallback,
): NodeJS.ReadWriteStream {
  return src(srcGlobs, { allowEmpty: true })
    .pipe(plumber())
    .pipe(named())
    .pipe(webpack(webpackConfig, compiler, () => {
      if (watch('scripts')) {
        reload();
      }
      done();
    })
    .on('error', function (error: Error) {
      onWebpackError(error);
      done();
    }))
    .pipe(dest(destFolder));
}

function onWebpackError(error: Error) {
  notifier.notify({
    title: 'Webpack Error',
    message: error.message,
    wait: false,
  });
  fancyLog.error(error.message);

  if (inProductionEnv()) {
    fancyLog.error('Aborting webpack due to error!');
    process.exit(1);
  }
}
