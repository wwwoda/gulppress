"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubsetText = exports.getCleanText = exports.stripDuplicateCharacters = void 0;
const array_uniq_1 = __importDefault(require("array-uniq"));
const ranges_1 = require("./ranges");
const stripDuplicateCharacters = (str) => (0, array_uniq_1.default)(str.split('')).join('');
exports.stripDuplicateCharacters = stripDuplicateCharacters;
const getCleanText = (str) => str
    .trim()
    .replace(/[\s]/g, '')
    .replace(/[\u2028]/g, '')
    .replace(/[\u2029]/g, '');
exports.getCleanText = getCleanText;
const getSubsetText = (str = '', withBasicLatin = true, trimText = true) => {
    let text = str;
    if (withBasicLatin === true) {
        const basicLatinText = (0, ranges_1.getTextForUnicodeBlock)('Basic Latin');
        text = (0, exports.stripDuplicateCharacters)(text + basicLatinText);
    }
    if (trimText === true) {
        text = (0, exports.getCleanText)(text);
    }
    return text;
};
exports.getSubsetText = getSubsetText;
