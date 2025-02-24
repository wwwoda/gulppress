"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProcessFontsStream = void 0;
const gulp_font_factory_1 = __importDefault(require("@gulppress/gulp-font-factory"));
const utils_1 = require("@gulppress/utils");
const gulp_1 = require("gulp");
const createProcessFontsStream = (srcGlobs, destFolder, factoryConfigs, factoryOptions, displayName = 'fonts') => (0, gulp_1.src)(srcGlobs)
    .pipe((0, gulp_font_factory_1.default)(factoryConfigs || {}, {
    name: displayName,
    ...factoryOptions,
}))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .on('error', utils_1.logError)
    .pipe((0, gulp_1.dest)(destFolder));
exports.createProcessFontsStream = createProcessFontsStream;
