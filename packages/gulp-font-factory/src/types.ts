import type { TTF } from 'fonteditor-core';
import type * as rename from 'rename';

export type FontFactoryConfigs = FontConfig[] | Record<string, FontConfig | FontConfig[]>;

export interface FontFactoryOptions {
  errorOnUnusedConfig?: boolean;
  errorOnUnmatchedFile?: boolean;
  passThroughUnmatched?: boolean;
  passThroughMatched?: boolean;
  silent?: boolean;
  stats?: boolean;
  name?: string;
}

export type FontFormatWrite = 'ttf' | 'woff' | 'woff2';

export type FontFormatRead = FontFormatWrite | 'eot' | 'svg' | 'otf';

export interface FontConfig {
  rename?: string | rename.Transformer;
  format?: FontFormatWrite | FontFormatWrite[];
  subset?: TTF.CodePoint[];
  subsetText?: string;
  subsetUnicodeBlocks?: UnicodeBlockName[],
  subsetUnicodeRanges?: UnicodeRange[];
  hinting?: boolean;
  compound2simple?: boolean;
  withBasicLatin?: boolean;
  trimText?: boolean;
}

export type UnicodeBlockName = 'Basic Latin'
| 'Latin-1 Supplement'
| 'Latin Extended-A'
| 'Latin Extended-B'
| 'IPA Extensions'
| 'Spacing Modifier Letters'
| 'Combining Diacritical Marks'
| 'Greek and Coptic'
| 'Cyrillic'
| 'Cyrillic Supplementary'
| 'Armenian'
| 'Hebrew'
| 'Arabic'
| 'Phonetic Extensions'
| 'Latin Extended Additional'
| 'Greek Extended'
| 'General Punctuation'
| 'Superscripts and Subscripts'
| 'Currency Symbols'
| 'Combining Diacritical Marks for Symbols'
| 'Letterlike Symbols'
| 'Number Forms'
| 'Arrows'
| 'Mathematical Operators'
| 'Miscellaneous Technical'
| 'Latin Alphabet'
| 'Digits'
| 'German Alphabet'
| 'Punctuation & Symbols';

export type UnicodeRange = [string, string];

export interface UnicodeBlock {
  name: UnicodeBlockName;
  ranges?: UnicodeRange[];
  text?: string;
}
