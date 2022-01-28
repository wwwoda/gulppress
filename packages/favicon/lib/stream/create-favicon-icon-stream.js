"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaviconIconStream = void 0;
const gulp_1 = require("gulp");
const sharp_1 = __importDefault(require("sharp"));
const gulp_image_factory_1 = __importDefault(require("@gulppress/gulp-image-factory"));
const to_ico_1 = __importDefault(require("../plugin/to-ico"));
const createFaviconIconStream = (srcGlobs, destFolder) => (0, gulp_1.src)(srcGlobs, { allowEmpty: true })
    .pipe((0, gulp_image_factory_1.default)({
    '*.svg': [{
            format: 'png',
            resize: {
                width: 32,
                height: 32,
                fit: sharp_1.default.fit.inside,
            },
            rename: 'favicon.png',
        }],
}, {
    silent: true,
    passThroughMatched: false,
    passThroughUnmatched: false,
}))
    .pipe((0, to_ico_1.default)())
    .pipe((0, gulp_1.dest)(destFolder));
exports.createFaviconIconStream = createFaviconIconStream;
