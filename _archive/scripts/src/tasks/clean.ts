import { Globs, TaskFunction } from 'gulp';

import { getEmptyTask } from '../utils';
import { cleanFoldersTask } from './clean/deleteFilesDirs';

export function getCleanTask(folders: Globs): TaskFunction {
  return folders
    ? composeCleanTasks(folders)
    : getEmptyTask('Clean task is missing config.');
}

function composeCleanTasks(folders: Globs): TaskFunction {
  return Object.assign(
    cleanFoldersTask(folders),
    { displayName: 'clean' },
  );
}
