import { AsyncTask } from 'async-done';
import { TaskFunction, TaskFunctionCallback, watch } from 'gulp';

import { MainConfig } from '../types';
import { watch as watchTask } from '../utils';
import { getIconsTask } from './icons';
import { getImagesTask } from './images';
import { getStylesTask } from './styles';

export function getWatchTask(
  config: MainConfig,
): TaskFunction {
  return Object.assign(
    composeWatchTask(config),
    { displayName: 'watch' },
  );
}

function composeWatchTask(config: MainConfig): TaskFunction {
  return (done: TaskFunctionCallback): ReturnType<AsyncTask> => {
    if (watchTask('styles') && config.styles?.watch) {
      watch(config.styles.watch, getStylesTask(config.styles, config.base.createSeparateMinFiles));
    }
    if (watchTask('icons') && config.icons?.src) {
      watch(config.icons.src, getIconsTask(config.icons));
    }
    if (watchTask('images') && config.images?.src) {
      watch(config.images.src, getImagesTask(config.images));
    }
    return done();
  };
}
