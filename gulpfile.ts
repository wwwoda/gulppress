// *****************************************************************************
// Theme Name defined here is overridden by THEME setting in .env file
const themeName = 'assets';
// *****************************************************************************

import { parallel, series, task, watch } from 'gulp';
import nodeEnvFile from 'node-env-file';
import path from 'path';
import {
	cleanTasks,
	faviconTask,
	fontsTask,
	getProxyUrl,
	getTheme,
	getWatchers,
	iconsTask,
	imagesTask,
	modernizrTask,
	reload,
	scriptsTask,
	serveTask,
	stylesTask,
} from './src/index';

const argv = require('yargs').argv;
nodeEnvFile(path.join(__dirname, './.env'), { raise: false });

const theme = getTheme(themeName);

const paths = {
  theme: path.resolve(__dirname, `./${theme}`),
  src: path.resolve(__dirname, `./${theme}/src`),
  dist: path.resolve(__dirname, `./${theme}/dist`),
};

const browserSyncConfig = {
  proxy: getProxyUrl(),
  host: '192.168.50.5',
  open: !!argv.browser || false,
  tunnel: !!argv.tunnel || false,
  ghostMode: false,
  injectChanges: true,
};

const taskConfigs = {
  favicon: {
    src: `${paths.src}/favicon/favicon.+(ico|png)`,
    dest: `${paths.dist}/favicon`,
  },
  fonts: {
    srcPath: `${paths.src}/fonts`,
    src: `${paths.src}/fonts/*.+(ttf|woff|woff2)`,
    dest: `${paths.dist}/fonts`,
  },
  icons: {
    src: `${paths.src}/icons/**/*.svg`,
    dest: `${paths.theme}/template-parts/partials/icons`,
  },
  images: {
    src: `${paths.src}/images/**/*.+(jpg|jpeg|png|svg)`,
    dest: `${paths.dist}/images`,
  },
  modernizr: {
    src: `${paths.src}/scripts/main.js`,
    dest: `${paths.dist}/scripts`,
    options: {
      crawl: true,
      tests: [
        'touchevents',
        'json',
        'canvas',
        'cssfilters',
      ],
      uglify: true,
    },
  },
  scripts: {
    src: `${paths.src}/scripts/*.+(js|ts)`,
    dest: `${paths.dist}/scripts`,
    assets: `.assets.json`,
    alias: {
    },
  },
  styles: {
    src: `${paths.src}/styles/*.scss`,
    dest: `${paths.dist}/styles`,
    includePaths: [
      './node_modules',
    ],
    busterRelativePath: `./${theme}/dist/styles`,
  },
};

const clean = cleanTasks(taskConfigs);
const compileScripts = scriptsTask(taskConfigs.scripts);
const compileStyles = stylesTask(taskConfigs.styles);
const processFavicon = faviconTask(taskConfigs.favicon);
const processFonts = fontsTask(taskConfigs.fonts);
const processIcons = iconsTask(taskConfigs.icons);
const processImages = imagesTask(taskConfigs.images);
const modernizr = modernizrTask(taskConfigs.modernizr);
const startServer = serveTask(browserSyncConfig);

task('watch', () => {
  const watchers = getWatchers();

  if (watchers.scripts) {
    watch(taskConfigs.scripts.src, series(reload));
  }
  if (watchers.styles) {
    watch(taskConfigs.styles.src, series(compileStyles, reload));
  }
  if (watchers.icons) {
    watch(taskConfigs.icons.src, series(processIcons));
  }
  if (watchers.images) {
    watch(taskConfigs.images.src, series(processImages));
  }
});

task('dev', series(
  clean.scriptsStyles,
  parallel(
    compileScripts,
    compileStyles,
    'watch',
    startServer,
  ),
));

task('assets', series(
  clean.assets,
  parallel(
    processFavicon,
    processFonts,
    processIcons,
    processImages,
  ),
));

task('build', series(
  clean.all,
  parallel(
    compileScripts,
    compileStyles,
    'assets',
  ),
));

task('default', series('build'));

task('favicon', processFavicon);
task('fonts', processFonts);
task('icons', processIcons);
task('images', processImages);
task('modernizr', modernizr);
task('scripts', compileScripts);
task('serve', startServer);
task('styles', compileStyles);
task('clean', series(clean.all));
