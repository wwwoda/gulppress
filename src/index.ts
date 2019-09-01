import clean from './tasks/clean';
import favicon from './tasks/favicon';
import fonts from './tasks/fonts';
import icons from './tasks/icons';
import images from './tasks/images';
import modernizr from './tasks/modernizr';
import scripts from './tasks/scripts';
import serve from './tasks/serve';
import styles from './tasks/styles';
import languages from './tasks/translate';
import vendorScripts from './tasks/vendor-scripts';

import { getProxyUrl, getTheme, getWatchers, isDev, reload } from './utils';

export {
	clean as cleanTasks,
	favicon as faviconTask,
	fonts as fontsTask,
	icons as iconsTask,
	images as imagesTask,
	languages as languagesTask,
	modernizr as modernizrTask,
	scripts as scriptsTask,
	serve as serveTask,
	styles as stylesTask,
	vendorScripts as vendorScriptsTask,
	getProxyUrl,
	getTheme,
	getWatchers,
	isDev,
	reload,
};
