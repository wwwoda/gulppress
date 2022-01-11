import type { Transform } from 'stream';

export interface TtfToWoffOptions {
  ignoreExt: boolean;
  clone: boolean;
}

export type TtfToWoffMethod = (options?: TtfToWoffOptions) => Transform;
