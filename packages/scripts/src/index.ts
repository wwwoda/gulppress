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

import {
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
} from './getters';

import {
  getWatchers,
  isDevEnv,
  reload,
} from './utils';

export {
  // Intefaces
  gulppress,
  // Tasks
  clean,
  favicon,
  fonts,
  icons,
  images,
  scripts,
  serve,
  styles,
  vendorScripts,
  translate,
  // Getters
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
  // Utilities
  getWatchers,
  isDevEnv,
  reload,
};
