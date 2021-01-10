import del from 'del';
import { TaskFunction, parallel } from 'gulp';

import { getEmptyTask } from '../utils';

export function getCleanTask(
  folders: (string | undefined)[],
): TaskFunction {
  return folders
    ? composeCleanTasks(folders)
    : getEmptyTask('Clean task is missing config.');
}

function composeCleanTasks(folders: string | (string | undefined)[]): TaskFunction {
  return parallel(() => del(
    typeof folders === 'string'
      ? folders
      : folders.filter(notEmpty),
    { force: true },
  ));
}

function notEmpty<T>(value: T | undefined): value is T {
  return value !== undefined;
}
