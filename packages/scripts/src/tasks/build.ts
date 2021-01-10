import { TaskFunction, parallel, series } from 'gulp';

import { MainConfig } from '../types';
import { getEmptyTask } from '../utils';
import { getAssetsDestFolders, getAssetsTasks } from './assets';
import { getCleanTask } from './clean';
import { getDevDestFolders, getDevTasks } from './dev';

export function getBuildTask(config: MainConfig): TaskFunction {
  const buildTasks = getBuildTasks(config);
  if (buildTasks.length) {
    return series(
      getCleanTask(getBuildDestFolders(config)),
      parallel(...buildTasks),
    );
  }
  return getEmptyTask('Build task pipeline is empty');
}

export function getBuildTasks(config: MainConfig): TaskFunction[] {
  return [...getDevTasks(config), ...getAssetsTasks(config)];
}

export function getBuildDestFolders(config: MainConfig): (string | undefined)[] {
  return [...getDevDestFolders(config), ...getAssetsDestFolders(config)];
}
