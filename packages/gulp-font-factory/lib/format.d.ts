import type { BufferFile } from 'vinyl';
import type { FontFormatRead, FontFormatWrite } from '.';
import type { FontConfig } from './types';
export declare const getFileFormat: (file: BufferFile) => FontFormatRead | null;
export declare const getWriteFormats: (file: BufferFile, config: FontConfig) => FontFormatWrite[];
