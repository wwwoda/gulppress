import { parallel, series, TaskFunction } from 'gulp';

import gulppress from '../interfaces';
import { getCreateWoffFromTtfTask } from './fonts/createWoffFromTtf';
import { getCreateWoff2FromTtfTask } from './fonts/createWoff2FromTtf';
import { getCopyFontsTask } from './fonts/copyFonts';

/**
 * Get composed fonts task
 * @param config
 */
export default (config: gulppress.FontsConfig):
TaskFunction => series(
  parallel(
    Object.assign(
      getCreateWoffFromTtfTask(config.src),
      { displayName: 'createWoffFromTtf' },
    ),
    Object.assign(
      getCreateWoff2FromTtfTask(config.src),
      { displayName: 'createWoff2FromTtf' },
    ),
  ),
  Object.assign(getCopyFontsTask(config.src, config.dest), { displayName: 'copyFonts' }),
);
