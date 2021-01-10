import { TaskFunction, series } from 'gulp';

import { ImagesConfig } from '../types';
import { getEmptyTask } from '../utils';
import {
  createPhpPartialFromSvgStream,
  createPhpPartialFromSvgTask,
} from './images/createPhpPartialFromSvg';
import { minifyImagesStream, minifyImagesTask } from './images/minifyImages';

export function getImagesTask(
  config: ImagesConfig | undefined,
): TaskFunction {
  return config
    ? composeImagesTasks(config)
    : getEmptyTask('Images task is missing config.');
}

/**
 * Get composed images task
 * @param config
 */
function composeImagesTasks(config: ImagesConfig): TaskFunction {
  return series(
    Object.assign(
      <T extends Function>(cb: T) => {
        const minifyStream = minifyImagesStream(
          config.src,
          config.dest,
          config.imagemin,
        );
        if (config.destPhpPartials) {
          createPhpPartialFromSvgStream(minifyStream, config.destPhpPartials);
        }
        cb();
      },
      {
        displayName: config.destPhpPartials
          ? 'images:minify-and-create-partials'
          : 'images:minify',
      },
    ),
  );
}

export const subtasks = {
  createPhpPartialFromSvgTask,
  createPhpPartialFromSvgStream,
  minifyImagesTask,
  minifyImagesStream,
};
