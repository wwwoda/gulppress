/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { BufferFile } from 'vinyl';
import { Font, FontEditor, woff2 } from 'fonteditor-core';
import pako from 'pako';
import arrayUniq from 'array-uniq';
import type { FontConfig, FontFormatWrite } from './types';
import type { FontFormatRead } from '.';
import { getFileFormat } from './format';
import { getSubsetText } from './util';
import { getCodePointsForUnicodeBlocks, stringToCodePoints } from './ranges';

export const createFontPromise = (
  file: BufferFile,
  config: FontConfig,
  toFormat: FontFormatWrite,
): Promise<Buffer | null> => {
  const fileFormat = getFileFormat(file);
  if (fileFormat === null) {
    return (new Promise((resolve) => {
      resolve(null);
    }));
  }

  if (fileFormat === 'woff2' || toFormat === 'woff2') {
    return woff2.init('').then(() => createFont(file, config, fileFormat, toFormat));
  }

  return (new Promise((resolve) => {
    resolve(createFont(file, config, fileFormat, toFormat));
  }));
};

export const createFont = (
  file: BufferFile,
  config: FontConfig,
  fileFormat: FontFormatRead,
  toFormat: FontFormatWrite,
): Buffer => {
  const {
    compound2simple,
    hinting,
    subsetText,
    subsetUnicodeBlockRanges,
    subset,
  } = config;

  const readOptions: FontEditor.FontReadOptions = {
    type: fileFormat,
    hinting: typeof hinting !== 'undefined' ? hinting : true,
    compound2simple: typeof compound2simple !== 'undefined' ? compound2simple : false,
  };

  const writeOptions: FontEditor.FontWriteOptions = {
    type: toFormat,
    toBuffer: true,
  };

  if (fileFormat === 'woff') {
    // @ts-ignore
    readOptions.inflate = pako.inflate;
  }

  if (toFormat === 'woff') {
    // @ts-ignore
    writeOptions.deflate = pako.deflate;
  }

  const codes = [];
  if (typeof subsetText === 'string' && subsetText !== '') {
    codes.push(...stringToCodePoints(getSubsetText(subsetText)));
  }
  if (Array.isArray(subsetUnicodeBlockRanges) && subsetUnicodeBlockRanges.length > 0) {
    codes.push(...getCodePointsForUnicodeBlocks(...subsetUnicodeBlockRanges));
  }
  if (Array.isArray(subset) && subset.length > 0) {
    codes.push(...subset);
  }
  if (codes.length > 0) {
    readOptions.subset = arrayUniq(codes);
  }

  const font = Font.create(file.contents, readOptions);

  return font.write(writeOptions) as Buffer;
};
