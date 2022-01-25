import { series, TaskFunction } from 'gulp';
import { addDisplayNameToTask, getSuccessLogger } from '@gulppress/utils';
import { createProcessFontsTask } from './task/process-fonts-task';
import type { FontsConfig } from './types';

export const getDisplayName = (displayName?: string): string => displayName || 'fonts';

export const getTask = (config: FontsConfig): TaskFunction => series(
  addDisplayNameToTask(
    `${getDisplayName(config.displayName)}:process fonts`,
    createProcessFontsTask(
      config.src,
      config.dest,
      config.fontFactoryConfigs,
      config.fontFactoryOptions,
    ),
  ),
  getSuccessLogger(getDisplayName(config.displayName)),
);
