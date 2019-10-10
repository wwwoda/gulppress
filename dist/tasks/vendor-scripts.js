"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
function default_1(config) {
    function processVendorScripts() {
        return gulp_1.src(config.src).pipe(gulp_1.dest(config.dest));
    }
    return gulp_1.parallel(processVendorScripts);
}
exports.default = default_1;
