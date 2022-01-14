import { series, TaskFunction } from 'gulp';
import { addDisplayNameToTask, getSuccessLogger } from '@gulppress/utils';
import type { TranslationConfig } from '@gulppress/types';
import { createPotFileTask } from './task/create-pot-file-task';

const getTranslationTask = (config: TranslationConfig): TaskFunction => series(
  addDisplayNameToTask(
    config.displayName || 'create pot file',
    createPotFileTask(config.src, config.dest, config.wpPotOptions),
  ),
  getSuccessLogger(config.displayName || 'translation'),
);

export default getTranslationTask;
