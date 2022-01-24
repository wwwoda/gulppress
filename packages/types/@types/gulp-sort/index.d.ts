// Type definitions for gulp-ttf2woff 2.0.0
// Project: https://github.com/pgilad/gulp-sort#readme
// Definitions by: Woda <https://github.com/wwwoda>
// TypeScript Version: 2.2

/// <reference types="node" />

declare module 'gulp-sort' {
  import type { Transform } from 'stream';
  import type Vinyl from 'vinyl';

  type ComparatorFunction = (file1: Vinyl, file2: Vinyl) => -1 | 0 | 1;

  type CustomSortFunction = (files: Vinyl[], comparator: ComparatorFunction) => Vinyl[];

  interface SortOptions {
    asc?: boolean;
    comparator?: ComparatorFunction;
    customSortFn?: CustomSortFunction;
  }

  export default function sort(options?: SortOptions): Transform;
}
