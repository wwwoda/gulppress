// Type definitions for gulp-ttf2woff 1.1.1
// Project: https://github.com/nfroidure/gulp-ttf2woff#readme
// Definitions by: Woda <https://github.com/wwwoda>
// TypeScript Version: 2.2

/// <reference types="node" />

declare module 'gulp-ttf2woff' {
  import type { Transform } from 'stream';

  export interface TtfToWoffOptions {
    ignoreExt: boolean;
    clone: boolean;
  }

  export default function ttf2woff(options?: TtfToWoffOptions): Transform;
}
