"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const sort = require('gulp-sort');
const wpPot = require('gulp-wp-pot');
function default_1(config) {
    function translate() {
        return gulp_1.src(config.src)
            .pipe(sort())
            .pipe(wpPot({
            domain: config.options.textDomain,
            package: config.options.packageName,
            bugReport: config.options.bugReport,
            lastTranslator: config.options.lastTranslator,
            team: config.options.team,
        }))
            .pipe(gulp_1.dest(`${config.dest}/${config.filename}`));
    }
    return gulp_1.parallel(translate);
}
exports.default = default_1;
