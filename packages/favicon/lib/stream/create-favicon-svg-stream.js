"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaviconSvgStream = void 0;
const gulp_1 = require("gulp");
const gulp_imagemin_1 = __importDefault(require("gulp-imagemin"));
const gulp_rename_1 = __importDefault(require("gulp-rename"));
const createFaviconSvgStream = (srcGlobs, destFolder) => (0, gulp_1.src)(srcGlobs, { allowEmpty: true })
    .pipe((0, gulp_imagemin_1.default)({ silent: true }))
    .pipe((0, gulp_rename_1.default)({ basename: 'favicon' }))
    .pipe((0, gulp_1.dest)(destFolder));
exports.createFaviconSvgStream = createFaviconSvgStream;
