"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const sort = require('gulp-sort');
const wpPot = require('gulp-wp-pot');
function default_1(config) {
    function translate() {
        return gulp_1.src(config.src)
            .pipe(sort())
            .pipe(wpPot(config.wpPotOptions))
            .pipe(gulp_1.dest(`${config.dest}`));
    }
    return gulp_1.parallel(translate);
}
exports.default = default_1;
