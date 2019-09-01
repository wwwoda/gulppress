"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var gulp_uglify_1 = __importDefault(require("gulp-uglify"));
var gulp_modernizr_1 = __importDefault(require("gulp-modernizr"));
function default_1(config) {
    function generateModernizr() {
        return gulp_1.src(config.src)
            .pipe(gulp_modernizr_1.default(config.options))
            .pipe(gulp_uglify_1.default())
            .pipe(gulp_1.dest(config.dest));
    }
    return gulp_1.parallel(generateModernizr);
}
exports.default = default_1;
