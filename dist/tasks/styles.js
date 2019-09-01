"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var autoprefixer_1 = __importDefault(require("autoprefixer"));
var browser_sync_1 = __importDefault(require("browser-sync"));
var postcss_css_variables_1 = __importDefault(require("postcss-css-variables"));
var gulp_buster_1 = __importDefault(require("gulp-buster"));
var gulp_csso_1 = __importDefault(require("gulp-csso"));
var gulp_if_1 = __importDefault(require("gulp-if"));
var gulp_postcss_1 = __importDefault(require("gulp-postcss"));
var gulp_sass_1 = __importDefault(require("gulp-sass"));
var gulp_sourcemaps_1 = __importDefault(require("gulp-sourcemaps"));
var postcss_calc_1 = __importDefault(require("postcss-calc"));
var postcss_easing_gradients_1 = __importDefault(require("postcss-easing-gradients"));
var gulp_plumber_1 = __importDefault(require("gulp-plumber"));
var utils_1 = require("../utils");
var stream = browser_sync_1.default.stream;
function default_1(config) {
    var postcssPlugins = [
        autoprefixer_1.default({}),
        postcss_css_variables_1.default({
            preserve: true,
        }),
        postcss_calc_1.default(),
        postcss_easing_gradients_1.default(),
    ];
    function compileStyles() {
        return gulp_1.src(config.src)
            .pipe(gulp_plumber_1.default())
            .pipe(gulp_if_1.default(utils_1.isDev(), gulp_sourcemaps_1.default.init()))
            .pipe(gulp_sass_1.default({
            outputStyle: 'expanded',
            includePaths: config.includePaths,
        }).on('error', gulp_sass_1.default.logError))
            .pipe(gulp_postcss_1.default(postcssPlugins))
            .pipe(gulp_if_1.default(!utils_1.isDev(), gulp_csso_1.default()))
            .pipe(gulp_if_1.default(utils_1.isDev(), gulp_sourcemaps_1.default.write('.')))
            .pipe(gulp_1.dest(config.dest))
            .pipe(gulp_if_1.default(utils_1.getWatchers()['styles'] === true, stream()))
            .pipe(gulp_buster_1.default({
            fileName: '.assets.json',
            relativePath: config.busterRelativePath,
        }))
            .pipe(gulp_1.dest(config.dest));
    }
    return gulp_1.parallel(compileStyles);
}
exports.default = default_1;
