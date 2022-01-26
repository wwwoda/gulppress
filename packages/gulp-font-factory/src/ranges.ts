import arrayUniq from 'array-uniq';
import { range as _range } from 'lodash';
import type { UnicodeBlockName } from './types';

type UnicodeRange = [string, string];

interface UnicodeBlock {
  name: UnicodeBlockName;
  ranges?: UnicodeRange[];
  text?: string;
}

const unicodeBlocks: UnicodeBlock[] = [
  { name: 'Latin Alphabet', ranges: [['\u0041', '\u005A'], ['\u0061', '\u007A']] },
  { name: 'Digits', ranges: [['\u0030', '\u0039']] },
  { name: 'Punctuation & Symbols', ranges: [['\u0020', '\u002F'], ['\u003A', '\u0040'], ['\u005B', '\u0060'], ['\u007B', '\u007E']] },
  { name: 'Basic Latin', ranges: [['\u0020', '\u007F']] },
  { name: 'Latin-1 Supplement', ranges: [['\u00A0', '\u00FF']] },
  { name: 'Latin Extended-A', ranges: [['\u0100', '\u017F']] },
  { name: 'Latin Extended-B', ranges: [['\u0180', '\u024F']] },
  { name: 'IPA Extensions', ranges: [['\u0250', '\u02AF']] },
  { name: 'Spacing Modifier Letters', ranges: [['\u02B0', '\u02FF']] },
  { name: 'Combining Diacritical Marks', ranges: [['\u0300', '\u036F']] },
  { name: 'Greek and Coptic', ranges: [['\u0370', '\u03FF']] },
  { name: 'Cyrillic', ranges: [['\u0400', '\u04FF']] },
  { name: 'Cyrillic Supplement', ranges: [['\u0500', '\u052F']] },
  { name: 'German', text: '€äöüÄÖÜß‚‘„“' },
  {
    name: 'Punctuation & Symbols Minimal',
    ranges: [['\u0020', '\u002F']],
    text: ':=?@€',
  },
];

const getUnicodeBlockByName = (
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
): string => String.fromCharCode(..._range(from, to));

export const rangesToCodePoints = (
  ranges: UnicodeRange[],
): number[] => ranges.flatMap((range) => _range(range[0].charCodeAt(0), range[1].charCodeAt(0)));

export const rangesToText = (
  ranges: UnicodeRange[],
): string => ranges.reduce((text, range) => text + charCodeRangeToText(range[0].charCodeAt(0), range[1].charCodeAt(0)), '');

export const stringToCodePoints = (str: string, unique = false): number[] => {
  const codes = str.split('').map((char) => char.charCodeAt(0));
  return unique === true ? arrayUniq(codes) : codes;
};
