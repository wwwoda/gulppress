import type { Transform } from 'stream';

interface TtfToWoffOptions {
  ignoreExt: boolean;
  clone: boolean;
}

export type TtfToWoff2Method = (options?: TtfToWoffOptions) => Transform;
