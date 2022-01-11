import { TaskFunction } from 'gulp';

import { IconsConfig } from '../types';
import { getEmptyTask } from '../utils';
import { createIconsStream, createIconsTask } from './icons/createIcons';

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
  return Object.assign(
    createIconsTask(config.src, config.dest, config.destPhpPartials),
    { displayName: 'icons:create' },
  );
}

export const subtasks = { createIconsTask, createIconsStream };
