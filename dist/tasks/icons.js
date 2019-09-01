"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var gulp_cache_1 = __importDefault(require("gulp-cache"));
var gulp_changed_1 = __importDefault(require("gulp-changed"));
var gulp_imagemin_1 = __importDefault(require("gulp-imagemin"));
var gulp_rename_1 = __importDefault(require("gulp-rename"));
function default_1(config) {
    function processIcons() {
        return gulp_1.src(config.src)
            .pipe(gulp_cache_1.default(gulp_imagemin_1.default([
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
            .pipe(gulp_rename_1.default({
            extname: '.php',
        }))
            .pipe(gulp_changed_1.default(config.dest))
            .pipe(gulp_1.dest(config.dest));
    }
    return gulp_1.parallel(processIcons);
}
exports.default = default_1;
