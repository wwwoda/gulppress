import { series, TaskFunction } from 'gulp';
import { addDisplayNameToTask, getSuccessLogger } from '@gulppress/utils';
import { createPotFileTask } from './task/create-pot-file-task';
import type { TranslationConfig } from './types';

export const getTask = (config: TranslationConfig): TaskFunction => series(
  addDisplayNameToTask(
    config.displayName || 'create pot file',
    createPotFileTask(config.src, config.dest, config.wpPotOptions),
  ),
  getSuccessLogger(config.displayName || 'translation'),
);
