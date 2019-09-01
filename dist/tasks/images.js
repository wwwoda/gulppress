"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var gulp_cache_1 = __importDefault(require("gulp-cache"));
var gulp_changed_1 = __importDefault(require("gulp-changed"));
var gulp_imagemin_1 = __importDefault(require("gulp-imagemin"));
function default_1(config) {
    function processImages() {
        return gulp_1.src(config.src)
            .pipe(gulp_cache_1.default(gulp_imagemin_1.default([
            gulp_imagemin_1.default.gifsicle({
                interlaced: true
            }),
            gulp_imagemin_1.default.jpegtran({
                progressive: true
            }),
            gulp_imagemin_1.default.optipng({
                optimizationLevel: 3
            }),
            gulp_imagemin_1.default.svgo({
                plugins: [
                    {
                        removeViewBox: false,
                    }, {
                        cleanupIDs: false
                    },
                ],
            }),
        ])))
            .pipe(gulp_changed_1.default(config.dest))
            .pipe(gulp_1.dest(config.dest));
    }
    return gulp_1.parallel(processImages);
}
exports.default = default_1;
