"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaviconImagesStream = void 0;
const gulp_1 = require("gulp");
const gulp_imagemin_1 = __importDefault(require("gulp-imagemin"));
const sharp_1 = __importDefault(require("sharp"));
const gulp_image_factory_1 = __importDefault(require("@gulppress/gulp-image-factory"));
const createFaviconImagesStream = (srcGlobs, destFolder, createAppleTouchIcon, createManifestIcons) => {
    const configs = [];
    if (createAppleTouchIcon === true) {
        configs.push({
            format: 'png',
            resize: {
                width: 180,
                height: 180,
                fit: sharp_1.default.fit.inside,
            },
            rename: 'apple-touch-icon.png',
        });
    }
    if (createManifestIcons === true) {
        configs.push({
            format: 'png',
            resize: {
                width: 192,
                height: 192,
                fit: sharp_1.default.fit.inside,
            },
            rename: 'icon-192.png',
        }, {
            format: 'png',
            resize: {
                width: 512,
                height: 512,
                fit: sharp_1.default.fit.inside,
            },
            rename: 'icon-512.png',
        });
    }
    return (0, gulp_1.src)(srcGlobs, { allowEmpty: true })
        .pipe((0, gulp_image_factory_1.default)({
        '*.svg': [...configs],
    }, {
        silent: true,
        passThroughMatched: false,
        passThroughUnmatched: false,
    }))
        .pipe((0, gulp_imagemin_1.default)({ silent: true }))
        .pipe((0, gulp_1.dest)(destFolder));
};
exports.createFaviconImagesStream = createFaviconImagesStream;
