"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToCodePoints = exports.rangesToText = exports.rangesToCodePoints = exports.charCodeRangeToText = exports.getTextForUnicodeBlock = exports.getTextForUnicodeBlocks = exports.getCodePointsForUnicodeBlock = exports.getCodePointsForUnicodeBlocks = exports.getUnicodeBlockByName = exports.unicodeBlocks = void 0;
const array_uniq_1 = __importDefault(require("array-uniq"));
const lodash_1 = require("lodash");
exports.unicodeBlocks = [
    { name: 'Basic Latin', ranges: [['\u0020', '\u007F']] },
    { name: 'Latin-1 Supplement', ranges: [['\u00A0', '\u00FF']] },
    { name: 'Latin Extended-A', ranges: [['\u0100', '\u017F']] },
    { name: 'Latin Extended-B', ranges: [['\u0180', '\u024F']] },
    { name: 'IPA Extensions', ranges: [['\u0250', '\u02AF']] },
    { name: 'Spacing Modifier Letters', ranges: [['\u02B0', '\u02FF']] },
    { name: 'Combining Diacritical Marks', ranges: [['\u0300', '\u036F']] },
    { name: 'Greek and Coptic', ranges: [['\u0370', '\u03FF']] },
    { name: 'Cyrillic', ranges: [['\u0400', '\u04FF']] },
    { name: 'Cyrillic Supplementary', ranges: [['\u0500', '\u052F']] },
    { name: 'Armenian', ranges: [['\u0530', '\u058F']] },
    { name: 'Hebrew', ranges: [['\u0590', '\u05FF']] },
    { name: 'Arabic', ranges: [['\u0600', '\u06FF']] },
    { name: 'Phonetic Extensions', ranges: [['\u1D00', '\u1D7F']] },
    { name: 'Latin Extended Additional', ranges: [['\u1E00', '\u1EFF']] },
    { name: 'Greek Extended', ranges: [['\u1F00', '\u1FFF']] },
    { name: 'General Punctuation', ranges: [['\u2000', '\u206F']] },
    { name: 'Superscripts and Subscripts', ranges: [['\u2070', '\u209F']] },
    { name: 'Currency Symbols', ranges: [['\u20A0', '\u20CF']] },
    { name: 'Combining Diacritical Marks for Symbols', ranges: [['\u20D0', '\u20FF']] },
    { name: 'Letterlike Symbols', ranges: [['\u2100', '\u214F']] },
    { name: 'Number Forms', ranges: [['\u2150', '\u218F']] },
    { name: 'Arrows', ranges: [['\u2190', '\u21FF']] },
    { name: 'Mathematical Operators', ranges: [['\u2200', '\u22FF']] },
    { name: 'Miscellaneous Technical', ranges: [['\u2300', '\u23FF']] },
    { name: 'Latin Alphabet', ranges: [['\u0041', '\u005A'], ['\u0061', '\u007A']] },
    { name: 'Digits', ranges: [['\u0030', '\u0039']] },
    { name: 'German Alphabet', ranges: [['\u0041', '\u005A'], ['\u0061', '\u007A']], text: 'ÄÖÜäöüß' },
    { name: 'Punctuation & Symbols', ranges: [['\u0020', '\u002F'], ['\u003A', '\u0040'], ['\u005B', '\u0060'], ['\u007B', '\u007E']] },
];
const getUnicodeBlockByName = (name) => exports.unicodeBlocks.find((block) => block.name === name);
exports.getUnicodeBlockByName = getUnicodeBlockByName;
const getCodePointsForUnicodeBlocks = (...blockName) => {
    const numbers = blockName.flatMap((name) => (0, exports.getCodePointsForUnicodeBlock)(name));
    return (0, array_uniq_1.default)(numbers);
};
exports.getCodePointsForUnicodeBlocks = getCodePointsForUnicodeBlocks;
const getCodePointsForUnicodeBlock = (name) => {
    const block = (0, exports.getUnicodeBlockByName)(name);
    const codePointsFromRanges = block?.ranges ? (0, exports.rangesToCodePoints)(block.ranges) : [];
    return block?.text
        ? (0, array_uniq_1.default)([...codePointsFromRanges, ...(0, exports.stringToCodePoints)(block.text)])
        : codePointsFromRanges;
};
exports.getCodePointsForUnicodeBlock = getCodePointsForUnicodeBlock;
const getTextForUnicodeBlocks = (...blockName) => blockName.reduce((text, name) => {
    const block = (0, exports.getUnicodeBlockByName)(name);
    const textFromRanges = block?.ranges ? (0, exports.rangesToText)(block.ranges) : '';
    return block?.text
        ? text + textFromRanges + block.text
        : text + textFromRanges;
}, '');
exports.getTextForUnicodeBlocks = getTextForUnicodeBlocks;
const getTextForUnicodeBlock = (name) => {
    const block = (0, exports.getUnicodeBlockByName)(name);
    return block?.ranges
        ? (0, exports.rangesToText)(block.ranges)
        : '';
};
exports.getTextForUnicodeBlock = getTextForUnicodeBlock;
const charCodeRangeToText = (from, to) => String.fromCharCode(...(0, lodash_1.range)(from, to + 1));
exports.charCodeRangeToText = charCodeRangeToText;
const rangesToCodePoints = (ranges) => ranges.flatMap((range) => (0, lodash_1.range)(range[0].charCodeAt(0), range[1].charCodeAt(0) + 1));
exports.rangesToCodePoints = rangesToCodePoints;
const rangesToText = (ranges) => ranges.reduce((text, range) => text + (0, exports.charCodeRangeToText)(range[0].charCodeAt(0), range[1].charCodeAt(0)), '');
exports.rangesToText = rangesToText;
const stringToCodePoints = (str, unique = false) => {
    const codes = str.split('').map((char) => char.charCodeAt(0));
    return unique === true ? (0, array_uniq_1.default)(codes) : codes;
};
exports.stringToCodePoints = stringToCodePoints;
