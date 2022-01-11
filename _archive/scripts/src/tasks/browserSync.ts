import browserSync from 'browser-sync';
import { TaskFunction, TaskFunctionCallback } from 'gulp';

import { getEmptyTask } from '../utils';

export function getStartServerTask(
  config: browserSync.Options | undefined,
): TaskFunction {
  return config
    ? composeStartServerTasks(config)
    : getEmptyTask('BrowserSync task is missing config.');
}

function composeStartServerTasks(config: browserSync.Options): TaskFunction {
  return Object.assign((done: TaskFunctionCallback) => {
      browserSync.init(config);
      done();
    }, { displayName: 'browserSync:start' },
  );
}
