"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedPath = exports.compileAndWriteHandlebarsTemplate = exports.getDirectories = exports.directoryExists = exports.fileExists = exports.getFileContent = exports.installWithYarn = exports.isYarn = exports.resolveCWD = exports.copyFileSync = void 0;
const find_up_1 = __importDefault(require("find-up"));
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
require("./interfaces");
let isYarnCache = null;
function getTargetFilePath(source, target) {
    if (fs_1.default.existsSync(target)) {
        if (fs_1.default.lstatSync(target).isDirectory()) {
            return path_1.default.join(target, path_1.default.basename(source));
        }
    }
    return target;
}
function copyFileSync(source, target) {
    fs_1.default.writeFileSync(getTargetFilePath(source, target), fs_1.default.readFileSync(source));
}
exports.copyFileSync = copyFileSync;
/**
 * Resolve `cwd`, a.k.a, current working directory or context from user input.
 * It takes into account the `--context [path]` option from CLI and uses process
 * cwd, if not provided.
 *
 * @param options Options as received from CLI
 */
function resolveCWD(options) {
    let cwd = process.cwd();
    // If user has provided cwd, then use that instead
    if (options && options.context) {
        const { context } = options;
        if (path_1.default.isAbsolute(options.context)) {
            cwd = context;
        }
        else {
            cwd = path_1.default.resolve(cwd, context);
        }
    }
    return cwd;
}
exports.resolveCWD = resolveCWD;
function isYarn() {
    const cwd = process.cwd();
    if (isYarnCache !== null) {
        return isYarnCache;
    }
    try {
        isYarnCache = find_up_1.default.sync('yarn.lock', { cwd }) != null;
        return isYarnCache;
    }
    catch (_) {
        isYarnCache = false;
        return isYarnCache;
    }
}
exports.isYarn = isYarn;
function installWithYarn(config) {
    if (typeof config !== 'undefined') {
        return config.useYarn || isYarn();
    }
    return isYarn();
}
exports.installWithYarn = installWithYarn;
function getFileContent(filePath) {
    return fs_1.default
        .readFileSync(path_1.default.resolve(__dirname, filePath))
        .toString();
}
exports.getFileContent = getFileContent;
function fileExists(filePath) {
    try {
        return fs_1.default.statSync(filePath).isFile();
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
}
exports.fileExists = fileExists;
function directoryExists(directoryPath) {
    try {
        return fs_1.default.statSync(directoryPath).isDirectory();
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
}
exports.directoryExists = directoryExists;
function getDirectories(source) {
    return fs_1.default.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}
exports.getDirectories = getDirectories;
function compileAndWriteHandlebarsTemplate(source, target, config) {
    const templateContent = getFileContent(source);
    const compiler = handlebars_1.default.compile(templateContent);
    fs_1.default.writeFileSync(target, compiler(config));
}
exports.compileAndWriteHandlebarsTemplate = compileAndWriteHandlebarsTemplate;
function getFormattedPath(source, cwd) {
    const relativePath = path_1.default.relative(cwd, source);
    if (!relativePath.startsWith('./') || !relativePath.startsWith('../')) {
        return `./${relativePath}`;
    }
    return relativePath;
}
exports.getFormattedPath = getFormattedPath;
