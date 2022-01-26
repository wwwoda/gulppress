import arrayUniq from 'array-uniq';
import { getTextForUnicodeBlock } from './ranges';

export const stripDuplicateCharacters = (str: string): string => arrayUniq(str.split('')).join('');

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
    const basicLatinText = getTextForUnicodeBlock('Basic Latin');
    text = stripDuplicateCharacters(text + basicLatinText);
  }

  if (trimText === true) {
    text = getCleanText(text);
  }

  return text;
};
