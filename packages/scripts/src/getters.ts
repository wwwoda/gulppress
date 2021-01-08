import { parallel, TaskFunction } from 'gulp';

import clean from './tasks/clean';
import favicon from './tasks/favicon';
import fonts from './tasks/fonts';
import icons from './tasks/icons';
import images from './tasks/images';
import scripts from './tasks/scripts';
import serve from './tasks/serve';
import styles from './tasks/styles';
import translate from './tasks/translate';
import vendorScripts from './tasks/vendorScripts';
import gulppress from './interfaces';

const emptyTaskFunction = parallel(cb => { cb(); });

export const getCleanTask = (config: gulppress.ProjectConfig):
{
  scriptsStyles: TaskFunction;
  assets: TaskFunction;
  all: TaskFunction;
} => clean(config);

export const getFaviconTask = (config: gulppress.ProjectConfig):
TaskFunction => (config.favicon ? favicon(config.favicon) : emptyTaskFunction);

export const getFontsTask = (config: gulppress.ProjectConfig):
TaskFunction => (config.fonts ? fonts(config.fonts) : emptyTaskFunction);

export const getIconsTask = (config: gulppress.ProjectConfig):
TaskFunction => (config.icons ? icons(config.icons) : emptyTaskFunction);

export const getImagesTask = (config: gulppress.ProjectConfig):
TaskFunction => (config.images ? images(config.images) : emptyTaskFunction);

export const getScriptsTask = (config: gulppress.ProjectConfig):
TaskFunction => (config.scripts ? scripts(config.scripts, config.base || {}) : emptyTaskFunction);

export const getServeTask = (config: gulppress.ProjectConfig):
TaskFunction => (config.browserSync ? serve(config.browserSync) : emptyTaskFunction);

export const getStylesTask = (config: gulppress.ProjectConfig):
TaskFunction => (config.styles ? styles(config.styles, config.base || {}) : emptyTaskFunction);

export const getTranslationTask = (config: gulppress.ProjectConfig):
TaskFunction => (config.translation ? translate(config.translation) : emptyTaskFunction);

export const getVendorScriptsTask = (config: gulppress.ProjectConfig):
TaskFunction => (config.vendorScripts
  ? vendorScripts(config.vendorScripts)
  : emptyTaskFunction);

export const getAssetsTasks = (config: gulppress.ProjectConfig) => {
  const tasks: any[] = [];
  if (config.favicon) {
    tasks.push(getFaviconTask(config));
  }
  if (config.fonts) {
    tasks.push(getFontsTask(config));
  }
  if (config.icons) {
    tasks.push(getIconsTask(config));
  }
  if (config.images) {
    tasks.push(getImagesTask(config));
  }
  if (config.translation) {
    tasks.push(getTranslationTask(config));
  }
  if (config.vendorScripts) {
    tasks.push(getVendorScriptsTask(config));
  }
  if (tasks.length < 1) {
    return [emptyTaskFunction];
  }
  return tasks;
};

export const getBuildTasks = (config: gulppress.ProjectConfig) => {
  const tasks: any[] = [];
  if (config.scripts) {
    tasks.push(getScriptsTask(config));
  }
  if (config.styles) {
    tasks.push(getStylesTask(config));
  }
  const assetTasks = getAssetsTasks(config);
  if (assetTasks.length > 0) {
    tasks.push(...assetTasks);
  }
  if (tasks.length < 1) {
    return [emptyTaskFunction];
  }
  return tasks;
};

export const getDevTasks = (config: gulppress.ProjectConfig) => {
  const tasks: any[] = [];
  if (config.scripts) {
    tasks.push(getScriptsTask(config));
  }
  if (config.styles) {
    tasks.push(getStylesTask(config));
  }
  if (tasks.length > 0) {
    tasks.push('watch');
  }
  if (config.vendorScripts) {
    tasks.push(getVendorScriptsTask(config));
  }
  if (config.browserSync) {
    tasks.push(getServeTask(config));
  }
  if (tasks.length < 1) {
    return [emptyTaskFunction];
  }
  return tasks;
};
