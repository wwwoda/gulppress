"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var changed = require("gulp-changed");
var filter = require("gulp-filter");
var gulp_ttf2woff_1 = __importDefault(require("gulp-ttf2woff"));
var gulp_ttf2woff2_1 = __importDefault(require("gulp-ttf2woff2"));
function default_1(config) {
    function createWoffFromTtf() {
        return gulp_1.src(config.src)
            .pipe(filter(function (file) { return /ttf$/.test(file.path); }))
            .pipe(gulp_ttf2woff_1.default())
            .pipe(gulp_1.dest(config.srcPath));
    }
    function createWoff2FromTtf() {
        return gulp_1.src(config.src)
            .pipe(filter(function (file) { return /ttf$/.test(file.path); }))
            .pipe(gulp_ttf2woff2_1.default())
            .pipe(gulp_1.dest(config.srcPath));
    }
    function copyFonts() {
        return gulp_1.src(config.src)
            .pipe(filter(function (file) { return /(woff|woff2)$/.test(file.path); }))
            .pipe(changed(config.dest))
            .pipe(gulp_1.dest(config.dest));
    }
    return gulp_1.series(gulp_1.parallel(createWoffFromTtf, createWoff2FromTtf), copyFonts);
}
exports.default = default_1;
