import { parallel, TaskFunction } from 'gulp';

import gulpress from '../interfaces';
import { getCreateIconsTask } from './icons/createIcons';

/**
 * Get composed icons task
 * @param config
 */
export default (config: gulpress.IconsConfig):
TaskFunction => parallel((
  Object.assign(
    getCreateIconsTask(config.src, config.dest, config.destPhpPartials),
    { displayName: 'processIcons' },
  )));
