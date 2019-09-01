"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var gulp_sort_1 = __importDefault(require("gulp-sort"));
var gulp_wp_pot_1 = __importDefault(require("gulp-wp-pot"));
function default_1(config) {
    function translate() {
        return gulp_1.src(config.src)
            .pipe(gulp_sort_1.default())
            .pipe(gulp_wp_pot_1.default({
            domain: config.options.textDomain,
            package: config.options.packageName,
            bugReport: config.options.bugReport,
            lastTranslator: config.options.lastTranslator,
            team: config.options.team,
        }))
            .pipe(gulp_1.dest(config.dest + "/" + config.filename));
    }
    return gulp_1.parallel(translate);
}
exports.default = default_1;
