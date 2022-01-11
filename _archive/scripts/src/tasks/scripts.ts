import { TaskFunction } from 'gulp';
import { Configuration } from 'webpack';

// import { WebpackConfig } from '../classes/webpackConfig';
import { ScriptConfig } from '../types';
// import { PresetTargets, ScriptConfig } from '../types';
import { getEmptyTask } from '../utils';
import { compileScriptsStream, compileScriptsTask } from './scripts/compileScripts';

export function getScriptsTask(
  config: ScriptConfig | undefined,
  webpackConfig: Configuration | undefined,
  // presetTargets?: PresetTargets,
  // createSeparateMinFiles?: boolean,
): TaskFunction {
  return config && webpackConfig
    ? composeScriptsTasks(config, webpackConfig)
    : getEmptyTask('Images task is missing config.');
  // return config
  //   ? composeScriptsTasks(config, presetTargets, createSeparateMinFiles)
  //   : getEmptyTask('Images task is missing config.');
}

function composeScriptsTasks(
  config: ScriptConfig,
  webpackConfig: Configuration,
  // presetTargets?: PresetTargets,
  // createSeparateMinFiles?: boolean,
): TaskFunction {
  // const webpackConfig = config.webpackConfig || ((): WebpackConfiguration => {
  //   WebpackConfig.init(
  //     config.features?.typescript,
  //     config.features?.typeChecks,
  //     presetTargets,
  //     createSeparateMinFiles,
  //   );
  //   return WebpackConfig.getWebpackConfig(config.src, config.dest);
  // })();

  // return Object.assign(
  //   compileScriptsTask(webpackConfig),
  //   { displayName: 'scripts:compile' },
  // );

  return Object.assign(
    compileScriptsTask(
      config.src,
      config.dest,
      webpackConfig,
    ),
    { displayName: 'scripts:compile' },
  );
}

export const subtasks = { compileScriptsTask, compileScriptsStream };
