import { parallel, series, TaskFunction } from 'gulp';
import { addDisplayNameToTask } from '@gulppress/utils';
import type { FontsConfig } from '@gulppress/types';
import { createWoffFromTtfTask } from './task/create-woff-from-ttf-task';
import { createWoff2FromTtfTask } from './task/create-woff2-from-ttf-stream-task';
import { copyFontsTask } from './task/copy-fonts-task';

const getFontsTask = (config: FontsConfig): TaskFunction => series(
  parallel(
    addDisplayNameToTask(
      'fonts:createWoffFromTtf',
      createWoffFromTtfTask(config.src),
    ),
    addDisplayNameToTask(
      'fonts:createWoff2FromTtf',
      createWoff2FromTtfTask(config.src),
    ),
  ),
  addDisplayNameToTask(
    'fonts:copyFonts',
    copyFontsTask(config.src, config.dest),
  ),
);

export default getFontsTask;
