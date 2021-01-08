import { parallel, TaskFunction } from 'gulp';

import gulpress from '../interfaces';
import { getCreatePotFileTask } from './translate/createPotFile';

export default (config: gulpress.TranslationConfig):
TaskFunction => parallel(
  (Object.assign(
    getCreatePotFileTask(config.src, config.dest, config.wpPotOptions),
    { displayName: 'translate' },
  )),
);
