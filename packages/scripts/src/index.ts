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
  getWatchers,
  isDevEnv,
  reload,
} from './utils';

export {
  clean as cleanTasks,
  favicon as faviconTask,
  fonts as fontsTask,
  icons as iconsTask,
  images as imagesTask,
  scripts as scriptsTask,
  serve as serveTask,
  styles as stylesTask,
  vendorScripts as vendorScriptsTask,
  translate as translationTask,
  gulppress,
  getWatchers,
  isDevEnv,
  reload,
};
