import type through2 from 'through2';
import type Vinyl from 'vinyl';
export interface Stats {
    total: number;
    matched: number;
    created: number;
    unmatched: number;
    unmatchedBlocked: number;
    unmatchedPassed: number;
    matchedGlobs: string[];
    unmatchedGlobs: string[];
    skippedFiles: Vinyl[];
    passedThroughFiles: Vinyl[];
    incrementTotal: (val?: number) => Stats;
    incrementMatched: (val?: number) => Stats;
    incrementCreated: (val?: number) => Stats;
    incrementUnmatched: (val?: number) => Stats;
    incrementUnmatchedBlocked: (val?: number) => Stats;
    incrementUnmatchedPassed: (val?: number) => Stats;
    markGlobsAsMatched: (globs: string[]) => Stats;
    addSkippedFile: (path: Vinyl) => Stats;
    addPassedThroughFile: (path: Vinyl) => Stats;
}
export declare const createStats: <T>(configs: T[] | Record<string, T | T[]>) => Stats;
export declare const getFlushFunction: (stats: Stats, prefix: string, silent: boolean, showStats: boolean, errorOnUnusedConfig: boolean, type?: string) => (callback: through2.TransformCallback) => void;
