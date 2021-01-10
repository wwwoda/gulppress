import { TaskFunction, parallel } from 'gulp';
import { Configuration as WebpackConfiguration } from 'webpack';

import { WebpackConfig } from '../classes/webpackConfig';
import { PresetTargets, ScriptConfig } from '../types';
import { getEmptyTask } from '../utils';
import { compileScriptsStream, compileScriptsTask } from './scripts/compileScripts';

export function getScriptsTask(
  config: ScriptConfig | undefined,
  presetTargets?: PresetTargets,
  createSeparateMinFiles?: boolean,
): TaskFunction {
  return config
    ? composeScriptsTasks(config, presetTargets, createSeparateMinFiles)
    : getEmptyTask('Images task is missing config.');
}

function composeScriptsTasks(
  config: ScriptConfig,
  presetTargets?: PresetTargets,
  createSeparateMinFiles?: boolean,
): TaskFunction {
  const webpackConfig = config.webpackConfig || ((): WebpackConfiguration => {
    WebpackConfig.init(
      config.features?.typescript,
      config.features?.typeChecks,
      presetTargets,
      createSeparateMinFiles,
    );
    return WebpackConfig.getWebpackConfig(config.src, config.dest);
  })();

  return parallel(
    Object.assign(
      compileScriptsTask(
        config.src,
        config.dest,
        webpackConfig,
      ),
      { displayName: 'scripts:compile' },
    ),
  );
}

export const subtasks = { compileScriptsTask, compileScriptsStream };
