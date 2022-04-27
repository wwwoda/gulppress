"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProcessImagesStream = void 0;
const gulp_image_factory_1 = __importDefault(require("@gulppress/gulp-image-factory"));
const utils_1 = require("@gulppress/utils");
const gulp_1 = require("gulp");
const gulp_cache_1 = __importDefault(require("gulp-cache"));
const gulp_changed_1 = __importDefault(require("gulp-changed"));
const gulp_if_1 = __importDefault(require("gulp-if"));
const gulp_imagemin_1 = __importDefault(require("gulp-imagemin"));
const createProcessImagesStream = (srcGlobs, destFolder, imageminOptions, imageFactoryConfigs, imageFactoryOptions, disableCache, disableGulpChanged, disableImagemin, displayName = 'images') => {
    const imageminTransform = (0, gulp_imagemin_1.default)([
        gulp_imagemin_1.default.gifsicle(imageminOptions?.gifsicle || {}),
        gulp_imagemin_1.default.mozjpeg(imageminOptions?.mozjpeg || {}),
        gulp_imagemin_1.default.optipng(imageminOptions?.optipng || {}),
        gulp_imagemin_1.default.svgo(imageminOptions?.svgo || {}),
    ], imageminOptions?.options || {});
    return (0, gulp_1.src)(srcGlobs, {
        silent: true,
    })
        .pipe((0, gulp_image_factory_1.default)(imageFactoryConfigs || {}, { ...imageFactoryOptions, name: displayName }))
        .pipe((0, gulp_if_1.default)(disableImagemin !== true, disableCache === true
        ? imageminTransform
        : (0, gulp_cache_1.default)(imageminTransform, { name: displayName })))
        .on('error', utils_1.logError)
        .pipe((0, gulp_if_1.default)(disableGulpChanged !== true, (0, gulp_changed_1.default)(destFolder)))
        .pipe((0, gulp_1.dest)(destFolder));
};
exports.createProcessImagesStream = createProcessImagesStream;
