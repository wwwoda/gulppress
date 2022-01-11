import { Globs, TaskFunction, parallel, series } from 'gulp';
import { Configuration } from 'webpack';

import { MainConfig } from '../types';
import { getEmptyTask, notEmpty, watch } from '../utils';
import { getStartServerTask } from './browserSync';
import { getCleanTask } from './clean';
import { getScriptsTask } from './scripts';
// import { getStylesTask } from './styles';
import { getWatchTask } from './watch';

export function getDevTask(config: MainConfig, webpackConfig: Configuration): TaskFunction {
  const devTasks = getDevTasks(config, webpackConfig);
  if (!devTasks.length) {
    return getEmptyTask('Dev task pipeline is empty');
  }
  const tasks = [parallel(...devTasks)];
  if (watch()) {
    tasks.push(getWatchTask(config));
  }
  if (config.browserSync) {
    tasks.push(getStartServerTask(config.browserSync));
  }
  if (devTasks.length) {
    return series(
      getCleanTask(getDevDestFolders(config)),
      series(...tasks),
    );
  }
  return getEmptyTask('Dev task pipeline is empty');
}

export function getDevTasks(config: MainConfig, webpackConfig: Configuration): TaskFunction[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const devTasks: TaskFunction[] = [];
  if (config.scripts && webpackConfig) {
    devTasks.push(getScriptsTask(config.scripts, webpackConfig));
    // devTasks.push(getScriptsTask(
    //   config.scripts,
    //   config.browserList,
    //   config.base.createSeparateMinFiles,
    // ));
  }
  // if (config.styles) {
  //   devTasks.push(getStylesTask(config.styles, config.base.createSeparateMinFiles));
  // }
  return devTasks;
}

export function getDevDestFolders(config: MainConfig): Globs {
  return [config.scripts?.dest, config.styles?.dest].filter(notEmpty);
}
