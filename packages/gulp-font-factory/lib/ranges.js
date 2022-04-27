"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToCodePoints = exports.rangesToText = exports.rangesToCodePoints = exports.charCodeRangeToText = exports.getTextForUnicodeBlock = exports.getTextForUnicodeBlocks = exports.getCodePointsForUnicodeBlock = exports.getCodePointsForUnicodeBlocks = void 0;
const array_uniq_1 = __importDefault(require("array-uniq"));
const lodash_1 = require("lodash");
const unicodeBlocks_1 = require("./unicodeBlocks");
const unicodeBlocks = [...unicodeBlocks_1.unicodeBlocks, ...unicodeBlocks_1.customUnicodeBlocks];
const getUnicodeBlockByName = (name) => unicodeBlocks.find((block) => block.name === name);
const getCodePointsForUnicodeBlocks = (...blockName) => {
    const numbers = blockName.flatMap((name) => (0, exports.getCodePointsForUnicodeBlock)(name));
    return (0, array_uniq_1.default)(numbers);
};
exports.getCodePointsForUnicodeBlocks = getCodePointsForUnicodeBlocks;
const getCodePointsForUnicodeBlock = (name) => {
    const block = getUnicodeBlockByName(name);
    const codePointsFromRanges = block?.ranges ? (0, exports.rangesToCodePoints)(block.ranges) : [];
    return block?.text
        ? (0, array_uniq_1.default)([...codePointsFromRanges, ...(0, exports.stringToCodePoints)(block.text)])
        : codePointsFromRanges;
};
exports.getCodePointsForUnicodeBlock = getCodePointsForUnicodeBlock;
const getTextForUnicodeBlocks = (...blockName) => blockName.reduce((text, name) => {
    const block = getUnicodeBlockByName(name);
    const textFromRanges = block?.ranges ? (0, exports.rangesToText)(block.ranges) : '';
    return block?.text
        ? text + textFromRanges + block.text
        : text + textFromRanges;
}, '');
exports.getTextForUnicodeBlocks = getTextForUnicodeBlocks;
const getTextForUnicodeBlock = (name) => {
    const block = getUnicodeBlockByName(name);
    return block?.ranges
        ? (0, exports.rangesToText)(block.ranges)
        : '';
};
exports.getTextForUnicodeBlock = getTextForUnicodeBlock;
const charCodeRangeToText = (from, to) => String.fromCharCode(...(0, lodash_1.range)(from, to));
exports.charCodeRangeToText = charCodeRangeToText;
const rangesToCodePoints = (ranges) => ranges.flatMap((range) => (0, lodash_1.range)(range[0].charCodeAt(0), range[1].charCodeAt(0)));
exports.rangesToCodePoints = rangesToCodePoints;
const rangesToText = (ranges) => ranges.reduce((text, range) => text + (0, exports.charCodeRangeToText)(range[0].charCodeAt(0), range[1].charCodeAt(0)), '');
exports.rangesToText = rangesToText;
const stringToCodePoints = (str, unique = false) => {
    const codes = str.split('').map((char) => char.charCodeAt(0));
    return unique === true ? (0, array_uniq_1.default)(codes) : codes;
};
exports.stringToCodePoints = stringToCodePoints;
