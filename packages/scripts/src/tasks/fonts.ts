import { TaskFunction, parallel, series } from 'gulp';

import { FontsConfig } from '../types';
import { getEmptyTask } from '../utils';
import { copyFontsStream, copyFontsTask } from './fonts/copyFonts';
import { createWoff2FromTtfStream, createWoff2FromTtfTask } from './fonts/createWoff2FromTtf';
import { createWoffFromTtfStream, createWoffFromTtfTask } from './fonts/createWoffFromTtf';

export function getFontsTask(
  config: FontsConfig | undefined,
): TaskFunction {
  return config
    ? composeFontsTasks(config)
    : getEmptyTask('Fonts task is missing config.');
}

/**
 * Get composed fonts task
 * @param config
 */
function composeFontsTasks(config: FontsConfig): TaskFunction {
  return series(
    parallel(
      Object.assign(
        createWoffFromTtfTask(config.src),
        { displayName: 'fonts:createWoffFromTtf' },
      ),
      Object.assign(
        createWoff2FromTtfTask(config.src),
        { displayName: 'fonts:createWoff2FromTtf' },
      ),
    ),
    Object.assign(copyFontsTask(config.src, config.dest), { displayName: 'fonts:copyFonts' }),
  );
}

export const subtasks = {
  copyFontsStream,
  copyFontsTask,
  createWoff2FromTtfStream,
  createWoff2FromTtfTask,
  createWoffFromTtfStream,
  createWoffFromTtfTask,
};
