import type { TaskFunction } from 'gulp';
import { addDisplayNameToTask } from '@gulppress/utils';
import { createPotFileTask } from './task/create-pot-file-task';
import type { TranslationConfig } from './types';

const getTranslationTask = (config: TranslationConfig): TaskFunction => addDisplayNameToTask(
  'translate',
  createPotFileTask(config.src, config.dest, config.wpPotOptions),
);

export default getTranslationTask;
