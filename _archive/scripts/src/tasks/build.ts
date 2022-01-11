import { Globs, TaskFunction, parallel, series } from 'gulp';
import { Configuration } from 'webpack';

import { MainConfig } from '../types';
import { getEmptyTask, notEmpty } from '../utils';
import { getAssetsDestFolders, getAssetsTasks } from './assets';
import { getCleanTask } from './clean';
import { getDevDestFolders, getDevTasks } from './dev';

export function getBuildTask(config: MainConfig, webpackConfig: Configuration): TaskFunction {
  const buildTasks = getBuildTasks(config, webpackConfig);
  if (buildTasks.length) {
    return series(
      getCleanTask(getBuildDestFolders(config)),
      parallel(...buildTasks),
    );
  }
  return getEmptyTask('Build task pipeline is empty');
}

export function getBuildTasks(config: MainConfig, webpackConfig: Configuration): TaskFunction[] {
  return [...getDevTasks(config, webpackConfig), ...getAssetsTasks(config)];
}

export function getBuildDestFolders(config: MainConfig): Globs {
  return [...getDevDestFolders(config), ...getAssetsDestFolders(config)].filter(notEmpty);
}
