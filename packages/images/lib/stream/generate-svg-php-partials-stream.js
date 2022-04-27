"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenerateSvgPhpPartialStream = void 0;
const utils_1 = require("@gulppress/utils");
const gulp_1 = require("gulp");
const gulp_changed_1 = __importDefault(require("gulp-changed"));
const gulp_filter_1 = __importDefault(require("gulp-filter"));
const gulp_if_1 = __importDefault(require("gulp-if"));
const gulp_rename_1 = __importDefault(require("gulp-rename"));
const createGenerateSvgPhpPartialStream = (input, destFolder, disableGulpChanged) => (0, utils_1.createStream)(input, {
    silent: true,
})
    .pipe((0, gulp_filter_1.default)('**/*.svg'))
    .pipe((0, gulp_rename_1.default)({
    extname: '.php',
}))
    .pipe((0, gulp_if_1.default)(disableGulpChanged !== true, (0, gulp_changed_1.default)(destFolder)))
    .pipe((0, gulp_1.dest)(destFolder));
exports.createGenerateSvgPhpPartialStream = createGenerateSvgPhpPartialStream;
