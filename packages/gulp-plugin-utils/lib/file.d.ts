import Vinyl from 'vinyl';
import type { BufferFile } from 'vinyl';
import rename from 'rename';
export declare const createFile: <Format extends string>(file: BufferFile, buffer: Buffer, format: Format, filePathpath: string) => BufferFile;
export declare const getFilePath: (file: Vinyl, renameTo: string | rename.Transformer) => string;
