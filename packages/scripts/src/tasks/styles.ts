import { TaskFunction, series } from 'gulp';

import { StylesConfig } from '../types';
import { getEmptyTask } from '../utils';
import {
  compileStylesTask,
  compileStylesWithMinFileStream,
  compileStylesWithoutMinFileStream,
} from './styles/compileStyles';
import { bustCacheTask } from './utils/bustCache';

export function getStylesTask(
  config: StylesConfig | undefined,
  createSeparateMinFiles?: boolean,
): TaskFunction {
  return config
    ? composeStylesTasks(config, createSeparateMinFiles)
    : getEmptyTask('Styles task is missing config.');
}

function composeStylesTasks(
  config: StylesConfig,
  createSeparateMinFiles: boolean = false,
): TaskFunction {
  return series(
    Object.assign(
      compileStylesTask(
        config.src,
        config.dest,
        config.sassOptions || {
          includePaths: [
            'node_modules',
          ],
          outputStyle: 'expanded',
        },
        config.postcssPlugins,
        createSeparateMinFiles,
      ),
      { displayName: 'styles:compile' },
    ),
    Object.assign(
      bustCacheTask(`${config.dest}/*.css`, config.dest),
      { displayName: 'styles:bust-cache' },
    ),
  );
}

export const subtasks = {
  compileStylesTask,
  compileStylesWithMinFileStream,
  compileStylesWithoutMinFileStream,
};
