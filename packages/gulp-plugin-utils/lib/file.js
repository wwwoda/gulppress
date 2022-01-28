"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePath = exports.createFile = void 0;
const vinyl_1 = __importDefault(require("vinyl"));
const path_1 = __importDefault(require("path"));
const rename_1 = __importDefault(require("rename"));
const createFile = (file, buffer, format, filePathpath) => {
    const newFile = new vinyl_1.default({
        cwd: file.cwd,
        base: file.base,
        path: filePathpath,
        contents: buffer,
    });
    newFile.extname = `.${format}`;
    return newFile;
};
exports.createFile = createFile;
const getFilePath = (file, renameTo) => (rename_1.default
    ? path_1.default.join(file.base, (0, rename_1.default)(file.relative, renameTo).toString())
    : file.path);
exports.getFilePath = getFilePath;
