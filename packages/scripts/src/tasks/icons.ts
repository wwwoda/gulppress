import { TaskFunction, parallel } from 'gulp';
import { createIconsStream, createIconsTask } from './icons/createIcons';

import { IconsConfig } from '../types';
import { getEmptyTask } from '../utils';

export function getIconsTask(
  config: IconsConfig | undefined,
): TaskFunction {
  return config
    ? composeIconsTasks(config)
    : getEmptyTask('Icons task is missing config.');
}

/**
 * Get composed icons task
 * @param config
 */
function composeIconsTasks(config: IconsConfig): TaskFunction {
  return parallel((
    Object.assign(
      createIconsTask(config.src, config.dest, config.destPhpPartials),
      { displayName: 'icons:create' },
    )));
}

export const subtasks = { createIconsTask, createIconsStream };
