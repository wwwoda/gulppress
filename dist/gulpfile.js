"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const index_1 = require("./src/index");
const nodeEnvFile = require('node-env-file');
const config = require('./gulppress.config');
const gulppressConfig = config;
console.log(gulppressConfig);
console.log(config.project.envFile);
if (typeof config.project.envFile === 'string' && config.project.envFile) {
    console.log(fs_1.default.existsSync(config.project.envFile));
    try {
        if (fs_1.default.existsSync(config.project.envFile)) {
            nodeEnvFile(config.project.envFile, { raise: false });
            console.log(process.env);
        }
    }
    catch (err) {
        console.error('.env file not found, please check your configuration');
    }
}
const browserSyncConfig = Object.assign({
    proxy: index_1.getProxyUrl(),
}, config.browserSync);
const clean = index_1.cleanTasks(config);
config.scripts.dest = path_1.default.resolve(__dirname, `./${config.project.basePath}/dist/scripts`);
const compileScripts = index_1.scriptsTask(config.scripts, config.project);
config.styles.dest = path_1.default.relative(__dirname, `./${config.project.basePath}/dist/styles`);
const compileStyles = index_1.stylesTask(config.styles, config.project);
const processFavicon = index_1.faviconTask(config.favicon);
const processFonts = index_1.fontsTask(config.fonts);
const processIcons = index_1.iconsTask(config.icons);
const processImages = index_1.imagesTask(config.images);
const modernizr = index_1.modernizrTask(config.modernizr);
const startServer = index_1.serveTask(browserSyncConfig);
// task('watch', function (this: any) {
gulp_1.task('watch', () => {
    const watchers = index_1.getWatchers();
    if (watchers.scripts) {
        gulp_1.watch(config.scripts.src, gulp_1.series(index_1.reload));
    }
    if (watchers.styles) {
        gulp_1.watch(config.styles.src, gulp_1.series(compileStyles, index_1.reload));
    }
    if (watchers.icons) {
        gulp_1.watch(config.icons.src, gulp_1.series(processIcons));
    }
    if (watchers.images) {
        gulp_1.watch(config.images.src, gulp_1.series(processImages));
    }
});
gulp_1.task('dev', gulp_1.series(clean.scriptsStyles, gulp_1.parallel(compileScripts, compileStyles, 'watch', startServer)));
gulp_1.task('assets', gulp_1.series(clean.assets, gulp_1.parallel(processFavicon, processFonts, processIcons, processImages)));
gulp_1.task('build', gulp_1.series(clean.all, gulp_1.parallel(compileScripts, compileStyles, 'assets')));
gulp_1.task('default', gulp_1.series('build'));
gulp_1.task('favicon', processFavicon);
gulp_1.task('fonts', processFonts);
gulp_1.task('icons', processIcons);
gulp_1.task('images', processImages);
gulp_1.task('modernizr', modernizr);
gulp_1.task('scripts', compileScripts);
gulp_1.task('serve', startServer);
gulp_1.task('styles', compileStyles);
gulp_1.task('clean', gulp_1.series(clean.all));
