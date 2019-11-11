"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const gulp_filter_1 = __importDefault(require("gulp-filter"));
const gulp_imagemin_1 = __importDefault(require("gulp-imagemin"));
const responsive = require('gulp-responsive');
const ico = require('gulp-to-ico');
const pngFilter = gulp_filter_1.default('**/*.png');
function default_1(config) {
    function faviconToIco() {
        return gulp_1.src(config.src)
            .pipe(pngFilter)
            .pipe(ico('favicon.ico', {
            resize: true,
            sizes: [32],
        }))
            .pipe(gulp_1.dest(config.dest));
    }
    function faviconToImages() {
        return gulp_1.src(config.src)
            .pipe(responsive({
            'favicon.png': [{
                    width: 16,
                    height: 16,
                    fit: 'cover',
                    skipOnEnlargement: true,
                    rename: 'favicon-16.png',
                }, {
                    width: 32,
                    height: 32,
                    fit: 'cover',
                    skipOnEnlargement: true,
                    rename: 'favicon-32.png',
                }, {
                    width: 96,
                    height: 96,
                    fit: 'cover',
                    skipOnEnlargement: true,
                    rename: 'favicon-96.png',
                }, {
                    width: 192,
                    height: 192,
                    fit: 'cover',
                    skipOnEnlargement: true,
                }],
        }, {
            errorOnUnusedConfig: false,
            errorOnUnusedImage: false,
            passThroughUnused: true,
            silent: true,
        }))
            .pipe(gulp_imagemin_1.default())
            .pipe(gulp_1.dest(config.dest));
    }
    return gulp_1.parallel(faviconToIco, faviconToImages);
}
exports.default = default_1;
