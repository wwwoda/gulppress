import type { BufferFile } from 'vinyl';
import type { ImageFormat, SharpConfig } from './types';
export declare const getFormat: (file: BufferFile) => ImageFormat | 'unsupported';
export declare const getFormatsFromConfig: (file: BufferFile, config: SharpConfig) => ImageFormat[];
