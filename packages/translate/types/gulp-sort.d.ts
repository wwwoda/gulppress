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
