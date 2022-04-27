/// <reference types="node" />
import { Globs } from 'gulp';
import type { SrcOptions } from 'vinyl-fs';
export declare const createStream: (input: Globs | NodeJS.ReadWriteStream, options?: SrcOptions | undefined) => NodeJS.ReadWriteStream;
