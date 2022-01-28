"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormatsFromConfig = exports.getFormat = void 0;
const path_1 = __importDefault(require("path"));
const getFormat = (file) => {
    const extname = path_1.default.extname(file.path);
    switch (extname) {
        case '.jpeg':
            return 'jpeg';
        case '.png':
            return 'png';
        case '.webp':
            return 'webp';
        case '.gif':
            return 'gif';
        case '.avif':
            return 'avif';
        case '.heif':
            return 'heif';
        case '.tiff':
            return 'tiff';
        case '.raw':
            return 'raw';
        default:
            return 'unsupported';
    }
};
exports.getFormat = getFormat;
const getFormatsFromConfig = (file, config) => {
    const toFormat = config.format || (0, exports.getFormat)(file);
    if (toFormat === 'unsupported') {
        return [];
    }
    return Array.isArray(toFormat)
        ? toFormat
        : [toFormat];
};
exports.getFormatsFromConfig = getFormatsFromConfig;
