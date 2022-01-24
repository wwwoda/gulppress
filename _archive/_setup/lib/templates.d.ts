import { ProjectConfig } from './interfaces';
export declare class TemplatesHandler {
    private static cwd;
    private static projectConfig;
    private static filenames;
    private static templatesPath;
    static writeFiles(cwd: string, projectConfig: ProjectConfig): void;
    private static registerHelpers;
    private static getregisterHelperTextFunction;
    private static getregisterHelperArrayFunction;
    private static compileAndWriteFiles;
}
