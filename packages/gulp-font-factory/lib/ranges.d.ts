import type { UnicodeBlockName, UnicodeRange } from './types';
export declare const getCodePointsForUnicodeBlocks: (...blockName: UnicodeBlockName[]) => number[];
export declare const getCodePointsForUnicodeBlock: (name: UnicodeBlockName) => number[];
export declare const getTextForUnicodeBlocks: (...blockName: UnicodeBlockName[]) => string;
export declare const getTextForUnicodeBlock: (name: UnicodeBlockName) => string;
export declare const charCodeRangeToText: (from: number, to: number) => string;
export declare const rangesToCodePoints: (ranges: UnicodeRange[]) => number[];
export declare const rangesToText: (ranges: UnicodeRange[]) => string;
export declare const stringToCodePoints: (str: string, unique?: boolean) => number[];
