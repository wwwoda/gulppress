import { series, TaskFunction } from 'gulp';

import { getCompileStylesTask } from './styles/compileStyles';
import { getBustCacheTask } from './utils/bustCache';
import gulpress from '../interfaces';

export default function (
  config: gulpress.StylesConfig,
  baseConfig: gulpress.BaseConfig,
): TaskFunction {
  return series(
    Object.assign(
      getCompileStylesTask(
        config.src,
        config.dest,
        config.sassOptions || {
          includePaths: [
            'node_modules',
          ],
          outputStyle: 'expanded',
        },
        config.postcssPlugins,
        baseConfig.createSeparateMinFiles,
      ),
      { displayName: 'compileStyles' },
    ),
    Object.assign(
      getBustCacheTask(`${config.dest}/*.css`, config.dest),
      { displayName: 'bustCacheForStyles' },
    ),
  );
}
