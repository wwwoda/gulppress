/// <reference types="node" />
import type { BufferFile } from 'vinyl';
import type { FontConfig, FontFormatWrite } from './types';
import type { FontFormatRead } from '.';
export declare const createFontPromise: (file: BufferFile, config: FontConfig, toFormat: FontFormatWrite) => Promise<Buffer | null>;
export declare const createFont: (file: BufferFile, config: FontConfig, fileFormat: FontFormatRead, toFormat: FontFormatWrite) => Buffer;
