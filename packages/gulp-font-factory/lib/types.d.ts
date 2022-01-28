import type { TTF } from 'fonteditor-core';
import type * as rename from 'rename';
export declare type FontFactoryConfigs = FontConfig[] | Record<string, FontConfig | FontConfig[]>;
export interface FontFactoryOptions {
    errorOnUnusedConfig?: boolean;
    errorOnUnmatchedFile?: boolean;
    passThroughUnmatched?: boolean;
    passThroughMatched?: boolean;
    silent?: boolean;
    stats?: boolean;
    name?: string;
}
export declare type FontFormatWrite = 'ttf' | 'woff' | 'woff2';
export declare type FontFormatRead = FontFormatWrite | 'eot' | 'svg' | 'otf';
export interface FontConfig {
    rename?: string | rename.Transformer;
    format?: FontFormatWrite | FontFormatWrite[];
    subsetText?: string;
    subsetUnicodeBlockRanges?: UnicodeBlockName[];
    subset?: TTF.CodePoint[];
    hinting?: boolean;
    compound2simple?: boolean;
}
export declare type UnicodeBlockName = 'Latin Alphabet' | 'Digits' | 'Punctuation & Symbols' | 'Basic Latin' | 'Latin-1 Supplement' | 'Latin Extended-A' | 'Latin Extended-B' | 'IPA Extensions' | 'Spacing Modifier Letters' | 'Combining Diacritical Marks' | 'Greek and Coptic' | 'Cyrillic' | 'Cyrillic Supplement' | 'German' | 'Punctuation & Symbols Minimal';
