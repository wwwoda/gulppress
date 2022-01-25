import { range } from 'lodash';

export const arrayUnique = <T>(arr: readonly T[]): T[] => ([...new Set(arr)]);

export const stringToCodePoints = (str: string, unique = false): number[] => {
  const codes = str.split('').map((char) => char.charCodeAt(0));
  return unique === true ? arrayUnique(codes) : codes;
};

export const stripDuplicateCharacters = (str: string): string => arrayUnique(str.split('')).join('');

export const charCodeRangeToText = (
  from: number,
  to: number,
): string => String.fromCharCode(...range(from, to));

export const basicLatinText = charCodeRangeToText(33, 126);
export const latinSupplementText = charCodeRangeToText(160, 255);
export const latinExtendedAText = charCodeRangeToText(256, 383);
export const latinExtendedBText = charCodeRangeToText(384, 591);

export const getCleanText = (str: string): string => str
  .trim()
  .replace(/[\s]/g, '')
  .replace(/[\u2028]/g, '')
  .replace(/[\u2029]/g, '');

export const getSubsetText = (
  str = '',
  withBasicLatin = true,
  trimText = true,
): string => {
  let text = str;

  if (withBasicLatin === true) {
    text = stripDuplicateCharacters(text + basicLatinText);
  }

  if (trimText === true) {
    text = getCleanText(text);
  }

  return text;
};
