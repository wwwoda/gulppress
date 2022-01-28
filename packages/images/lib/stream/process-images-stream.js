"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProcessImagesStream = void 0;
const gulp_image_factory_1 = __importDefault(require("@gulppress/gulp-image-factory"));
const gulp_1 = require("gulp");
const gulp_cache_1 = __importDefault(require("gulp-cache"));
const gulp_changed_1 = __importDefault(require("gulp-changed"));
const gulp_imagemin_1 = __importDefault(require("gulp-imagemin"));
const createProcessImagesStream = (srcGlobs, destFolder, imageMinOptions, imageFactoryConfigs, imageFactoryOptions, displayName = 'images') => (0, gulp_1.src)(srcGlobs, {
    silent: true,
})
    .pipe((0, gulp_image_factory_1.default)(imageFactoryConfigs || {}, { ...imageFactoryOptions, name: displayName }))
    .pipe((0, gulp_cache_1.default)((0, gulp_imagemin_1.default)([
    gulp_imagemin_1.default.gifsicle(imageMinOptions?.gifsicle || {}),
    gulp_imagemin_1.default.mozjpeg(imageMinOptions?.mozjpeg || {}),
    gulp_imagemin_1.default.optipng(imageMinOptions?.optipng || {}),
    gulp_imagemin_1.default.svgo({
        plugins: [
            { removeViewBox: false },
            { cleanupIDs: false },
        ],
        ...(imageMinOptions?.svgo || {}),
    }),
], imageMinOptions?.options || {}), {
    name: displayName,
}))
    .on('error', (e) => {
    console.log(e);
})
    .pipe((0, gulp_changed_1.default)(destFolder))
    .pipe((0, gulp_1.dest)(destFolder));
exports.createProcessImagesStream = createProcessImagesStream;
