"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const gulp_changed_1 = __importDefault(require("gulp-changed"));
const gulp_filter_1 = __importDefault(require("gulp-filter"));
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
function default_1(config) {
    function createWoffFromTtf() {
        return gulp_1.src(config.src)
            .pipe(gulp_filter_1.default(file => /ttf$/.test(file.path)))
            .pipe(ttf2woff())
            .pipe(gulp_1.dest(config.srcPath));
    }
    function createWoff2FromTtf() {
        return gulp_1.src(config.src)
            .pipe(gulp_filter_1.default(file => /ttf$/.test(file.path)))
            .pipe(ttf2woff2())
            .pipe(gulp_1.dest(config.srcPath));
    }
    function copyFonts() {
        return gulp_1.src(config.src)
            .pipe(gulp_filter_1.default(file => /(woff|woff2)$/.test(file.path)))
            .pipe(gulp_changed_1.default(config.dest))
            .pipe(gulp_1.dest(config.dest));
    }
    return gulp_1.series(gulp_1.parallel(createWoffFromTtf, createWoff2FromTtf), copyFonts);
}
exports.default = default_1;
