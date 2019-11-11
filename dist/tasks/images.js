"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const gulp_cache_1 = __importDefault(require("gulp-cache"));
const gulp_changed_1 = __importDefault(require("gulp-changed"));
const gulp_filter_1 = __importDefault(require("gulp-filter"));
const gulp_if_1 = __importDefault(require("gulp-if"));
const gulp_imagemin_1 = __importDefault(require("gulp-imagemin"));
const gulp_rename_1 = __importDefault(require("gulp-rename"));
function shouldCreatePhpPartials(config) {
    return !!config.phpPartialsDest;
}
function default_1(config) {
    function processImages() {
        return gulp_1.src(config.src)
            .pipe(gulp_cache_1.default(gulp_imagemin_1.default([
            gulp_imagemin_1.default.gifsicle({
                interlaced: true,
            }),
            gulp_imagemin_1.default.jpegtran({
                progressive: true,
            }),
            gulp_imagemin_1.default.optipng({
                optimizationLevel: 3,
            }),
            gulp_imagemin_1.default.svgo({
                plugins: [
                    {
                        removeViewBox: false,
                    },
                    {
                        cleanupIDs: false,
                    },
                ],
            }),
        ])))
            .pipe(gulp_changed_1.default(config.dest))
            .pipe(gulp_1.dest(config.dest))
            .pipe(gulp_if_1.default(shouldCreatePhpPartials(config), gulp_filter_1.default(file => /svg$/.test(file.path))))
            .pipe(gulp_if_1.default(shouldCreatePhpPartials(config), gulp_rename_1.default({
            extname: '.php',
        })))
            .pipe(gulp_if_1.default(shouldCreatePhpPartials(config), gulp_changed_1.default(config.phpPartialsDest || config.dest)))
            .pipe(gulp_if_1.default(shouldCreatePhpPartials(config), gulp_1.dest(config.phpPartialsDest || config.dest)));
    }
    return gulp_1.parallel(processImages);
}
exports.default = default_1;
