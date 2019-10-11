"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const autoprefixer_1 = __importDefault(require("autoprefixer"));
const browser_sync_1 = __importDefault(require("browser-sync"));
const gulp_csso_1 = __importDefault(require("gulp-csso"));
const gulp_if_1 = __importDefault(require("gulp-if"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const gulp_postcss_1 = __importDefault(require("gulp-postcss"));
const gulp_rename_1 = __importDefault(require("gulp-rename"));
const gulp_sass_1 = __importDefault(require("gulp-sass"));
const gulp_sourcemaps_1 = __importDefault(require("gulp-sourcemaps"));
const postcss_calc_1 = __importDefault(require("postcss-calc"));
const utils_1 = require("../utils");
const gulpBuster = require('gulp-buster');
const cssVariables = require('postcss-css-variables');
const postcssEasingGradients = require('postcss-easing-gradients');
const { stream } = browser_sync_1.default;
function default_1(config, project) {
    const postcssPlugins = [
        autoprefixer_1.default(config.autoprefixerOptions),
        cssVariables({
            preserve: true,
        }),
        postcss_calc_1.default(),
        postcssEasingGradients(),
    ];
    function compileStyles() {
        if (project.createSeparateMinFiles === true) {
            return gulp_1.src(config.src)
                .pipe(gulp_plumber_1.default())
                .pipe(gulp_if_1.default(utils_1.isDev(), gulp_sourcemaps_1.default.init()))
                .pipe(gulp_sass_1.default(config.sassOptions).on('error', gulp_sass_1.default.logError))
                .pipe(gulp_postcss_1.default(postcssPlugins))
                .pipe(gulp_if_1.default(utils_1.isDev(), gulp_sourcemaps_1.default.write({ includeContent: false })))
                .pipe(gulp_1.dest(config.dest))
                .pipe(stream())
                .pipe(gulp_rename_1.default({ suffix: '.min' }))
                .pipe(gulp_if_1.default(utils_1.isDev(), gulp_sourcemaps_1.default.init({ loadMaps: true })))
                .pipe(gulp_csso_1.default())
                .pipe(gulp_if_1.default(utils_1.isDev(), gulp_sourcemaps_1.default.write('./')))
                .pipe(gulp_1.dest(config.dest))
                .pipe(stream());
        }
        return gulp_1.src(config.src)
            .pipe(gulp_plumber_1.default())
            .pipe(gulp_if_1.default(utils_1.isDev(), gulp_sourcemaps_1.default.init()))
            .pipe(gulp_sass_1.default(config.sassOptions).on('error', gulp_sass_1.default.logError))
            .pipe(gulp_postcss_1.default(postcssPlugins))
            .pipe(gulp_if_1.default(!utils_1.isDev(), gulp_csso_1.default()))
            .pipe(gulp_if_1.default(utils_1.isDev(), gulp_sourcemaps_1.default.write('.')))
            .pipe(gulp_1.dest(config.dest))
            .pipe(stream());
    }
    function bustCache() {
        return gulp_1.src(`${config.dest}/*.css`)
            .pipe(gulpBuster({
            fileName: '.assets.json',
            relativePath: config.dest,
        }))
            .pipe(gulp_1.dest(config.dest));
    }
    return gulp_1.series(compileStyles, bustCache);
}
exports.default = default_1;
