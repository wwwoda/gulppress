import { ProjectConfig } from './interfaces';
export declare function copyFileSync(source: string, target: string): void;
/**
 * Resolve `cwd`, a.k.a, current working directory or context from user input.
 * It takes into account the `--context [path]` option from CLI and uses process
 * cwd, if not provided.
 *
 * @param options Options as received from CLI
 */
export declare function resolveCWD(options: {
    context?: string | undefined;
} | undefined): string;
export declare function isYarn(): boolean;
export declare function installWithYarn(config: ProjectConfig | undefined): boolean;
export declare function getFileContent(filePath: string): string;
export declare function fileExists(filePath: string): boolean;
export declare function directoryExists(directoryPath: string): boolean;
export declare function getDirectories(source: string): string[];
export declare function compileAndWriteHandlebarsTemplate(source: string, target: string, config?: ProjectConfig): void;
export declare function getFormattedPath(source: string, cwd: string): string;
