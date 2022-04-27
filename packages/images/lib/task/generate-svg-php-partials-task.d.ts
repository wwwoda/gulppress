/// <reference types="node" />
/// <reference types="vinyl-fs" />
import type { Globs, TaskFunction } from 'gulp';
export declare const createGenerateSvgPhpPartialsTask: (input: Globs | NodeJS.ReadWriteStream, destFolder: string, disableGulpChanged?: boolean | undefined) => TaskFunction;
