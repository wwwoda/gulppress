import { TaskFunction, parallel, series } from 'gulp';
import { addDisplayNameToTask, getSuccessLogger } from '@gulppress/utils';
import type { FaviconConfig } from './types';
import { createFaviconImagesTask } from './task/create-favicon-images-task';
import { createFaviconHtmlTask } from './task/create-favicon-html-task';
import { createFaviconIconTask } from './task/create-favicon-icon-task';
import { createFaviconManifestTask } from './task/create-favicon-manifest-task';
import { createFaviconSvgTask } from './task/create-favicon-svg-task';

const getDisplayName = (displayName?: string): string => displayName || 'favicon';

export const getTask = (
  config: FaviconConfig,
): TaskFunction => {
  const tasks = [
    addDisplayNameToTask(
      `${getDisplayName(config.displayName)}:create favicon.ico`,
      createFaviconIconTask(config.src, config.dest),
    ),
    addDisplayNameToTask(
      `${getDisplayName(config.displayName)}:create favicon.svg`,
      createFaviconSvgTask(config.src, config.dest),
    ),
  ];
  if (config.manifest) {
    tasks.push(addDisplayNameToTask(
      `${getDisplayName(config.displayName)}:create manifest.json`,
      createFaviconManifestTask(config.dest, config.manifest),
    ));
  }
  if (config.omitAppleTouchIcon !== true || config.manifest) {
    tasks.push(addDisplayNameToTask(
      `${getDisplayName(config.displayName)}:create icon.png(s)`,
      createFaviconImagesTask(
        config.src,
        config.dest,
        !config.omitAppleTouchIcon,
        !!config.manifest,
      ),
    ));
  }
  if (config.omitHtml !== true) {
    tasks.push(addDisplayNameToTask(
      `${getDisplayName(config.displayName)}:create html code`,
      createFaviconHtmlTask(config.dest),
    ));
  }
  return series(
    parallel(...tasks),
    getSuccessLogger(getDisplayName(config.displayName)),
  );
};
