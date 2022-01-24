"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasYarnLockFile = exports.detect = void 0;
const path_1 = require("./path");
const file_1 = require("./file");
const detect = () => {
    const execPath = process.env.npm_execpath || '';
    if (execPath.endsWith('yarn.js')
        || execPath.endsWith('yarn')
        || (0, exports.hasYarnLockFile)()) {
        return 'yarn';
    }
    return 'npm';
};
exports.detect = detect;
const hasYarnLockFile = () => (0, file_1.fileExists)((0, path_1.root)('yarn.lock'));
exports.hasYarnLockFile = hasYarnLockFile;
