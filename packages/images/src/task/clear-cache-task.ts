import type { TaskFunction, TaskFunctionCallback } from 'gulp';
import cache from 'gulp-cache';

export const createClearImagesTask = (): TaskFunction => (done: TaskFunctionCallback) => {
  cache.clearAll();
  done();
};
