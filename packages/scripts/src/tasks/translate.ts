import { TaskFunction, parallel } from 'gulp';

import { TranslationConfig } from '../types';
import { getEmptyTask } from '../utils';
import { createPotFileStream, createPotFileTask } from './translate/createPotFile';

export function getTranslationTask(config: TranslationConfig | undefined): TaskFunction {
  return config
    ? composeTranslationTasks(config)
    : getEmptyTask('Translation task is missing config.');
}

function composeTranslationTasks(config: TranslationConfig): TaskFunction {
  return parallel(
    (Object.assign(
      createPotFileTask(config.src, config.dest, config.wpPotOptions),
      { displayName: 'translate' },
    )),
  );
}

export const subtasks = { createPotFileStream, createPotFileTask };
