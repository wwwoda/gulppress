"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = exports.setRootPath = exports.getRootPath = void 0;
const path_1 = __importDefault(require("path"));
const getRootPath = () => {
    if (process.env.NODE_ENV === 'test') {
        return path_1.default.resolve(__dirname, '../');
    }
    return process.cwd();
};
exports.getRootPath = getRootPath;
const setRootPath = (newRootPath) => {
    rootPath = newRootPath;
};
exports.setRootPath = setRootPath;
const root = (append = '') => path_1.default.resolve(rootPath, append);
exports.root = root;
let rootPath = (0, exports.getRootPath)();
