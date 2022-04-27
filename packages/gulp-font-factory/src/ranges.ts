import arrayUniq from 'array-uniq';
import { range as _range } from 'lodash';
import type { UnicodeBlock, UnicodeBlockName, UnicodeRange } from './types';
import { unicodeBlocks as generalUnicodeBlocks, customUnicodeBlocks } from './unicodeBlocks';

const unicodeBlocks: UnicodeBlock[] = [...generalUnicodeBlocks, ...customUnicodeBlocks];

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
