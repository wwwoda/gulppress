import browserSync from 'browser-sync';
import { TaskFunction, parallel } from 'gulp';

import { getEmptyTask } from '../utils';

export function getStartServerTask(
  config: browserSync.Options | undefined,
): TaskFunction {
  return config
    ? composeStartServerTasks(config)
    : getEmptyTask('BrowserSync task is missing config.');
}

function composeStartServerTasks(config: browserSync.Options): TaskFunction {
  return parallel(
    (Object.assign(<T extends Function>(cb: T) => {
      browserSync.init(config);
      cb();
    }, { displayName: 'browserSync:start' })),
  );
}
