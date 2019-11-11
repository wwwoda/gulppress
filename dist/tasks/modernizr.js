"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const gulp_modernizr_1 = __importDefault(require("gulp-modernizr"));
const gulp_uglify_1 = __importDefault(require("gulp-uglify"));
function default_1(config) {
    function generateModernizr() {
        return gulp_1.src(config.src)
            .pipe(gulp_modernizr_1.default(config.modernizrOptions))
            .pipe(gulp_uglify_1.default())
            .pipe(gulp_1.dest(config.dest));
    }
    return gulp_1.parallel(generateModernizr);
}
exports.default = default_1;
