import arrayUniq from 'array-uniq';
import { range as _range } from 'lodash';
import type { UnicodeBlock, UnicodeRange } from '.';
import type { UnicodeBlockName } from './types';

export const unicodeBlocks: UnicodeBlock[] = [
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

export const getUnicodeBlockByName = (
  name: UnicodeBlockName,
): UnicodeBlock | undefined => unicodeBlocks.find((block) => block.name === name);

export const getCodePointsForUnicodeBlocks = (...blockName: UnicodeBlockName[]): number[] => {
  const numbers = blockName.flatMap((name) => getCodePointsForUnicodeBlock(name));
  return arrayUniq(numbers);
};

export const getCodePointsForUnicodeBlock = (name: UnicodeBlockName): number[] => {
  const block = getUnicodeBlockByName(name);
  const codePointsFromRanges = block?.ranges ? rangesToCodePoints(block.ranges) : [];
  return block?.text
    ? arrayUniq([...codePointsFromRanges, ...stringToCodePoints(block.text)])
    : codePointsFromRanges;
};

export const getTextForUnicodeBlocks = (
  ...blockName: UnicodeBlockName[]
): string => blockName.reduce((text: string, name): string => {
  const block = getUnicodeBlockByName(name);
  const textFromRanges = block?.ranges ? rangesToText(block.ranges) : '';
  return block?.text
    ? text + textFromRanges + block.text
    : text + textFromRanges;
}, '');

export const getTextForUnicodeBlock = (name: UnicodeBlockName): string => {
  const block = getUnicodeBlockByName(name);
  return block?.ranges
    ? rangesToText(block.ranges)
    : '';
};

export const charCodeRangeToText = (
  from: number,
  to: number,
): string => String.fromCharCode(..._range(from, to + 1));

export const rangesToCodePoints = (
  ranges: UnicodeRange[],
): number[] => ranges.flatMap((range) => _range(
  range[0].charCodeAt(0),
  range[1].charCodeAt(0) + 1,
));

export const rangesToText = (
  ranges: UnicodeRange[],
): string => ranges.reduce((text, range) => text + charCodeRangeToText(range[0].charCodeAt(0), range[1].charCodeAt(0)), '');

export const stringToCodePoints = (str: string, unique = false): number[] => {
  const codes = str.split('').map((char) => char.charCodeAt(0));
  return unique === true ? arrayUniq(codes) : codes;
};
