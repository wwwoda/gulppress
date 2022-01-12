import type { TaskFunction } from 'gulp';
import { addDisplayNameToTask } from '@gulppress/utils';
import type { TranslationConfig } from '@gulppress/types';
import { createPotFileTask } from './task/create-pot-file-task';

const getTranslationTask = (config: TranslationConfig): TaskFunction => addDisplayNameToTask(
  'translate',
  createPotFileTask(config.src, config.dest, config.wpPotOptions),
);

export default getTranslationTask;
