// Type definitions for gulp-ttf2woff2 4.0.1
// Project: https://github.com/nfroidure/gulp-ttf2woff2#readme
// Definitions by: Woda <https://github.com/wwwoda>
// TypeScript Version: 2.2

/// <reference types="node" />

declare module 'gulp-ttf2woff2' {
  import type { Transform } from 'stream';

  export interface TtfToWoff2Options {
    ignoreExt: boolean;
    clone: boolean;
  }

  export default function ttf2woff2(options?: TtfToWoff2Options): Transform;
}
