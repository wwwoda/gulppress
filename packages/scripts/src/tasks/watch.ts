import { AsyncTask } from 'async-done';
import { TaskFunction, series, watch } from 'gulp';

import { MainConfig } from '../types';
import { getWatchers } from '../utils';
import { getIconsTask } from './icons';
import { getImagesTask } from './images';
import { getStylesTask } from './styles';

export function getWatchTask(config: MainConfig): TaskFunction {
  return <T extends Function>(cb: T): ReturnType<AsyncTask> => {
    const watchers = getWatchers();

    if (config) {
      if (watchers.styles && config.styles && config.styles.watch) {
        watch(
          config.styles.watch,
          series(getStylesTask(config.styles, config.base.createSeparateMinFiles)),
        );
      }
      if (watchers.icons && config.icons && config.icons.src) {
        watch(config.icons.src, series(getIconsTask(config.icons)));
      }
      if (watchers.images && config.images && config.images.src) {
        watch(config.images.src, series(getImagesTask(config.images)));
      }
    }
    return cb();
  };
}
