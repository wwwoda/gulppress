/// <reference types="node" />
/// <reference types="vinyl-fs" />
import { Globs } from 'gulp';
export declare const createGenerateSvgPhpPartialStream: (input: Globs | NodeJS.ReadWriteStream, destFolder: string, disableGulpChanged?: boolean | undefined) => NodeJS.ReadWriteStream;
