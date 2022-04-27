"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWriteFormats = exports.getFileFormat = void 0;
const path_1 = __importDefault(require("path"));
const getFileFormat = (file) => {
    switch (path_1.default.extname(file.path)) {
        case '.ttf':
            return 'ttf';
        case '.woff':
            return 'woff';
        case '.woff2':
            return 'woff2';
        case '.eot':
            return 'eot';
        case '.svg':
            return 'svg';
        case '.otf':
            return 'otf';
        default:
            return null;
    }
};
exports.getFileFormat = getFileFormat;
const getWriteFormats = (file, config) => {
    const toFormat = config.format || (0, exports.getFileFormat)(file);
    if (toFormat === null
        || toFormat === 'otf'
        || toFormat === 'eot'
        || toFormat === 'svg') {
        return [];
    }
    return Array.isArray(toFormat)
        ? [...new Set(toFormat)]
        : [toFormat];
};
exports.getWriteFormats = getWriteFormats;
