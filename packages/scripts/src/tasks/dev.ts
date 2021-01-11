import { TaskFunction, parallel, series } from 'gulp';
import { getEmptyTask, shouldWatch } from '../utils';

import { MainConfig } from '../types';
import { getCleanTask } from './clean';
import { getScriptsTask } from './scripts';
import { getStartServerTask } from './browserSync';
import { getStylesTask } from './styles';
import { getWatchTask } from './watch';

export function getDevTask(config: MainConfig): TaskFunction {
  const devTasks = getDevTasks(config);
  if (devTasks.length) {
    return series(
      getCleanTask(getDevDestFolders(config)),
      parallel(...devTasks),
    );
  }
  return getEmptyTask('Dev task pipeline is empty');
}

export function getDevTasks(config: MainConfig): TaskFunction[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const devTasks: any[] = [];
  if (config.scripts) {
    devTasks.push(getScriptsTask(
      config.scripts,
      config.browserList,
      config.base.createSeparateMinFiles,
    ));
  }
  if (config.styles) {
    devTasks.push(getStylesTask(config.styles, config.base.createSeparateMinFiles));
  }
  if (shouldWatch()) {
    return devTasks;
  }
  if (devTasks.length > 0) {
    devTasks.push(getWatchTask(config));
  }
  if (config.browserSync) {
    devTasks.push(getStartServerTask(config.browserSync));
  }
  return devTasks;
}

export function getDevDestFolders(config: MainConfig): (string | undefined)[] {
  return [
    config.scripts?.dest,
    config.styles?.dest,
  ];
}
