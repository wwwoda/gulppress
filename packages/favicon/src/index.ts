import { TaskFunction, parallel } from 'gulp';
import { addDisplayNameToTask } from '@gulppress/utils';
import type { FaviconConfig } from '@gulppress/types';
import { createFaviconImagesTask } from './task/create-favicon-images-task';
import { createFaviconHtmlTask } from './task/create-favicon-html-task';
import { createFaviconIconTask } from './task/create-favicon-icon-task';
import { createFaviconManifestTask } from './task/create-favicon-manifest-task';
import { createFaviconSvgTask } from './task/create-favicon-svg-task';

const getFaviconTask = (
  config: FaviconConfig,
): TaskFunction => parallel(
  addDisplayNameToTask(
    'favicon:create images',
    createFaviconImagesTask(config.src, config.dest),
  ),
  addDisplayNameToTask(
    'favicon:create-svg',
    createFaviconSvgTask(config.src, config.dest),
  ),
  addDisplayNameToTask(
    'favicon:createIcon',
    createFaviconIconTask(config.src, config.dest),
  ),
  addDisplayNameToTask(
    'favicon:createHtml',
    createFaviconHtmlTask(config.dest),
  ),
  addDisplayNameToTask(
    'favicon:createManifest',
    createFaviconManifestTask(config.dest, config.manifest),
  ),
);

export default getFaviconTask;
