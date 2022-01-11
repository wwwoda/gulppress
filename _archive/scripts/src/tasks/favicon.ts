import { TaskFunction, parallel, series } from 'gulp';

import { Favicon } from '../classes/favicon';
import { FaviconConfig } from '../types';
import { getEmptyTask } from '../utils';
import { createFaviconIconStream, createFaviconIconTask } from './favicon/createFaviconIcon';
import { createFaviconImagesStream, createFaviconImagesTask } from './favicon/createFaviconImages';
import {
  createFaviconManifestStream,
  createFaviconManifestTask,
} from './favicon/createFaviconManifest';
import { createFaviconHtmlStream, createFaviconHtmlTask } from './favicon/creatFaviconHtml';
import { setFaviconColorStream, setFaviconColorTask } from './favicon/setFaviconColor';

export function getFaviconTask(
  config: FaviconConfig | undefined,
): TaskFunction {
  return config
    ? composeFaviconTasks(config)
    : getEmptyTask('Favicon task is missing config.');
}

/**
 * Get composed favicon task
 * @param config
 */
function composeFaviconTasks(config: FaviconConfig): TaskFunction {
  const favicon = new Favicon();
  return series(
    (Object.assign(
      createFaviconImagesTask(config.src, config.dest, config.sizes, favicon),
      { displayName: 'favicon::createImages' },
    )),
    (Object.assign(
      setFaviconColorTask(config.color, favicon),
      { displayName: 'favicon:setColor' },
    )),
    parallel(
      (Object.assign(
        createFaviconIconTask(config.src, config.dest, favicon),
        { displayName: 'favicon:createIcon' },
      )),
      (Object.assign(
        createFaviconHtmlTask(config.dest, favicon),
        { displayName: 'favicon:createHtml' },
      )),
      (Object.assign(
        createFaviconManifestTask(config.dest, favicon),
        { displayName: 'favicon:createManifest' },
      )),
    ),
  );
}

export const subtasks = {
  createFaviconHtmlStream,
  createFaviconHtmlTask,
  createFaviconIconStream,
  createFaviconIconTask,
  createFaviconImagesStream,
  createFaviconImagesTask,
  createFaviconManifestStream,
  createFaviconManifestTask,
  setFaviconColorStream,
  setFaviconColorTask,
};
