import { parallel, series, TaskFunction } from 'gulp';
import { addDisplayNameToTask, getSuccessLogger } from '@gulppress/utils';
import type { FontsConfig } from '@gulppress/types';
import { createWoffFromTtfTask } from './task/create-woff-from-ttf-task';
import { createWoff2FromTtfTask } from './task/create-woff2-from-ttf-stream-task';
import { copyFontsTask } from './task/copy-fonts-task';

const getDisplayName = (displayName?: string): string => displayName || 'fonts';

const getFontsTask = (config: FontsConfig): TaskFunction => series(
  parallel(
    addDisplayNameToTask(
      `${getDisplayName(config.displayName)}:ttf to woff`,
      createWoffFromTtfTask(config.src),
    ),
    addDisplayNameToTask(
      `${getDisplayName(config.displayName)}:ttf to woff2`,
      createWoff2FromTtfTask(config.src),
    ),
  ),
  addDisplayNameToTask(
    `${getDisplayName(config.displayName)}:copy fonts to destination`,
    copyFontsTask(config.src, config.dest),
  ),
  getSuccessLogger(getDisplayName(config.displayName)),
);

export default getFontsTask;
