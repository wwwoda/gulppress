"use strict";
/* eslint-disable @typescript-eslint/ban-ts-comment */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFont = exports.createFontPromise = void 0;
const fonteditor_core_1 = require("fonteditor-core");
const pako_1 = __importDefault(require("pako"));
const array_uniq_1 = __importDefault(require("array-uniq"));
const format_1 = require("./format");
const util_1 = require("./util");
const ranges_1 = require("./ranges");
const createFontPromise = (file, config, toFormat) => {
    const fileFormat = (0, format_1.getFileFormat)(file);
    if (fileFormat === null) {
        return (new Promise((resolve) => {
            resolve(null);
        }));
    }
    if (fileFormat === 'woff2' || toFormat === 'woff2') {
        return fonteditor_core_1.woff2.init('').then(() => (0, exports.createFont)(file, config, fileFormat, toFormat));
    }
    return (new Promise((resolve) => {
        resolve((0, exports.createFont)(file, config, fileFormat, toFormat));
    }));
};
exports.createFontPromise = createFontPromise;
const createFont = (file, config, fileFormat, toFormat) => {
    const { compound2simple, hinting, subset, subsetText, subsetUnicodeBlocks, subsetUnicodeRanges, trimText, withBasicLatin, } = config;
    const readOptions = {
        type: fileFormat,
        hinting: typeof hinting !== 'undefined' ? hinting : true,
        compound2simple: typeof compound2simple !== 'undefined' ? compound2simple : false,
    };
    const writeOptions = {
        type: toFormat,
        toBuffer: true,
    };
    if (fileFormat === 'woff') {
        // @ts-ignore
        readOptions.inflate = pako_1.default.inflate;
    }
    if (toFormat === 'woff') {
        // @ts-ignore
        writeOptions.deflate = pako_1.default.deflate;
    }
    const codes = [];
    if (Array.isArray(subset) && subset.length > 0) {
        codes.push(...subset);
    }
    if (typeof subsetText === 'string') {
        const text = (0, util_1.getSubsetText)(subsetText, withBasicLatin, trimText);
        codes.push(...(0, ranges_1.stringToCodePoints)(text));
    }
    if (Array.isArray(subsetUnicodeBlocks) && subsetUnicodeBlocks.length > 0) {
        codes.push(...(0, ranges_1.getCodePointsForUnicodeBlocks)(...subsetUnicodeBlocks));
    }
    if (Array.isArray(subsetUnicodeRanges) && subsetUnicodeRanges.length > 0) {
        codes.push(...(0, ranges_1.rangesToCodePoints)(subsetUnicodeRanges));
    }
    if (codes.length > 0) {
        readOptions.subset = (0, array_uniq_1.default)(codes);
    }
    const font = fonteditor_core_1.Font.create(file.contents, readOptions);
    return font.write(writeOptions);
};
exports.createFont = createFont;
