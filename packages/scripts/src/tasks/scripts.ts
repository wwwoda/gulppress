import { parallel, TaskFunction } from 'gulp';

import { WebpackConfig } from '../classes/webpackConfig';
import gulpress from '../interfaces';
import { getConfigSource, getConfigDestination } from '../utils';
import { compileScripts } from './scripts/compileScripts';

export default function (
  config: gulpress.ScriptConfig,
  baseConfig: gulpress.BaseConfig,
): TaskFunction {
  const scriptSrc = getConfigSource(config);
  const scriptDest = getConfigDestination(config);
  WebpackConfig.init(config, baseConfig);
  const webpackConfig = WebpackConfig.getWebpackConfig(scriptSrc, scriptDest);

  return parallel(
    Object.assign(
      compileScripts(
        config.src,
        config.dest,
        webpackConfig,
      ),
      { displayName: 'compileSscripts' },
    ),
  );
}
