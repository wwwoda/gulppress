"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPotFileStream = void 0;
const gulp_1 = require("gulp");
const gulp_sort_1 = __importDefault(require("gulp-sort"));
const gulp_wp_pot_1 = __importDefault(require("gulp-wp-pot"));
const createPotFileStream = (srcGlobs, destFolder, wpPotOptions = {}) => (0, gulp_1.src)(srcGlobs, { allowEmpty: true })
    .pipe((0, gulp_sort_1.default)())
    .pipe((0, gulp_wp_pot_1.default)(wpPotOptions))
    .pipe((0, gulp_1.dest)(`${destFolder}`));
exports.createPotFileStream = createPotFileStream;
