import {
  parallel,
  series,
  task,
  watch,
} from 'gulp';
import fs from 'fs';
import path from 'path';
import {
  cleanTasks,
  faviconTask,
  fontsTask,
  getProxyUrl,
  getWatchers,
  iconsTask,
  imagesTask,
  modernizrTask,
  reload,
  scriptsTask,
  serveTask,
  stylesTask,
} from './src/index';
import gulpPress from './src/interfaces';

const nodeEnvFile = require('node-env-file');
const config: gulpPress.MainConfig = require('./config.js');

console.log(config.project.envFile);
console.log(typeof config.project.envFile);

if (typeof config.project.envFile === 'string' && config.project.envFile) {
  try {
    if (fs.existsSync(config.project.envFile)) {
      nodeEnvFile(config.project.envFile, { raise: false });
      console.log(process.env);
    }
  } catch (err) {
    console.error('.env file not found, please check your configuration');
  }
}

const browserSyncConfig = Object.assign({
  proxy: getProxyUrl(),
}, config.browserSync);

const clean = cleanTasks(config);
config.scripts.dest = path.resolve(__dirname, `./${config.project.basePath}/dist/scripts`);
const compileScripts = scriptsTask(config.scripts, config.project);
config.styles.dest = path.relative(__dirname, `./${config.project.basePath}/dist/styles`);
const compileStyles = stylesTask(config.styles, config.project);
const processFavicon = faviconTask(config.favicon);
const processFonts = fontsTask(config.fonts);
const processIcons = iconsTask(config.icons);
const processImages = imagesTask(config.images);
const modernizr = modernizrTask(config.modernizr);
const startServer = serveTask(browserSyncConfig);

// task('watch', function (this: any) {
task('watch', () => {
  const watchers = getWatchers();

  if (watchers.scripts) {
    watch(config.scripts.src, series(reload));
  }
  if (watchers.styles) {
    watch(config.styles.src, series(compileStyles, reload));
  }
  if (watchers.icons) {
    watch(config.icons.src, series(processIcons));
  }
  if (watchers.images) {
    watch(config.images.src, series(processImages));
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
