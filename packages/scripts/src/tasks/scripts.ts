import chalk from 'chalk';
import { reload } from 'browser-sync';
import fancyLog from 'fancy-log';
import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import plumber from 'gulp-plumber';
import webpackStream from 'webpack-stream';

import { ScriptsHelper } from '../module/scripts';
import gulpress from '../interfaces';
import {
  getWatchers,
  isDevEnv,
  getConfigSource,
  getConfigDestination,
} from '../utils';

const named = require('vinyl-named');

export default function (
  scriptConfig: gulpress.ScriptConfig | null | undefined,
  baseConfig: gulpress.BaseConfig,
): TaskFunction {
  if (!scriptConfig) {
    return parallel(cb => {
      console.log(chalk.red('Scripts configuration missing!'));
      cb();
    });
  }

  const scriptSrc = getConfigSource(scriptConfig);
  const scriptDest = getConfigDestination(scriptConfig);
  ScriptsHelper.init(scriptConfig, baseConfig);
  const webpackConfig = ScriptsHelper.getWebpackConfig(scriptSrc, scriptDest);

  function compileScripts(): NodeJS.ReadWriteStream {
    return src(scriptSrc, { allowEmpty: true })
      .pipe(plumber())
      .pipe(named())
      .pipe(webpackStream(webpackConfig, undefined, () => {
        if (getWatchers().scripts === true) {
          reload();
        }
      }).on('error', (error: Error) => {
        fancyLog.error(error.message);
        if (!isDevEnv()) {
          console.log('Aborting scripts build task due to error!');
          process.exit(1);
        }
      }))
      .pipe(dest(scriptDest));
  }

  return parallel(compileScripts);
}
