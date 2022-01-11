// declare module 'gulp-ttf2woff2' {
//   import type { Transform } from 'stream';

//   interface TtfToWoffOptions {
//     ignoreExt: boolean;
//     clone: boolean;
//   }

//   export default function ttf2woff2(options?: TtfToWoffOptions): Transform;
// }

declare module 'gulp-ttf2woff' {
  import type { TtfToWoff2Method } from '@gulppress/types';

  const ttf2woff2: TtfToWoff2Method;

  export default ttf2woff2;
}
