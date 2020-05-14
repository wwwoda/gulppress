import { TaskFunction } from 'gulp';

import clean from './tasks/clean';
import favicon from './tasks/favicon';
import fonts from './tasks/fonts';
import icons from './tasks/icons';
import images from './tasks/images';
import scripts from './tasks/scripts';
import serve from './tasks/serve';
import styles from './tasks/styles';
import translate from './tasks/translate';
import vendorScripts from './tasks/vendor-scripts';
import gulppress from './interfaces';

const getCleanTask = (config: gulppress.ProjectConfig):
{
  scriptsStyles: TaskFunction;
  assets: TaskFunction;
  all: TaskFunction;
} => clean(config);

const getFaviconTask = (config: gulppress.ProjectConfig):
TaskFunction => favicon(config.favicon);

const getFontsTask = (config: gulppress.ProjectConfig):
TaskFunction => fonts(config.fonts);

const getIconsTask = (config: gulppress.ProjectConfig):
TaskFunction => icons(config.icons);

const getImagesTask = (config: gulppress.ProjectConfig):
TaskFunction => images(config.images);

const getScriptsTask = (config: gulppress.ProjectConfig):
TaskFunction => scripts(config.scripts, config.base || {});

const getServeTask = (config: gulppress.ProjectConfig):
TaskFunction => serve(config.browserSync);

const getStylesTask = (config: gulppress.ProjectConfig):
TaskFunction => styles(config.styles, config.base || {});

const getTranslationTask = (config: gulppress.ProjectConfig):
TaskFunction => translate(config.translation);

const getVendorScriptsTask = (config: gulppress.ProjectConfig):
TaskFunction => vendorScripts(config.vendorScripts, config.base || {});

const getAssetsTasks = (config: gulppress.ProjectConfig) => {
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
    tasks.push((cb: any) => {
      cb();
    });
  }
  return tasks;
};

const getBuildTasks = (config: gulppress.ProjectConfig) => {
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
    tasks.push((cb: any) => {
      cb();
    });
  }
  return tasks;
};

const getDevTasks = (config: gulppress.ProjectConfig) => {
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
    tasks.push((cb: any) => {
      cb();
    });
  }
  return tasks;
};

export {
  getAssetsTasks,
  getBuildTasks,
  getDevTasks,
  getCleanTask,
  getFaviconTask,
  getFontsTask,
  getIconsTask,
  getImagesTask,
  getScriptsTask,
  getServeTask,
  getStylesTask,
  getTranslationTask,
  getVendorScriptsTask,
};
