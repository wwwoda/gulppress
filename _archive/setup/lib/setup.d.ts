import { ProjectConfig } from './interfaces';
declare class SetupResolve {
    projectConfig: ProjectConfig;
    devDependencies: string[];
    constructor(projectConfig: ProjectConfig, devDependencies: string[]);
}
export declare class Setup {
    private configPath;
    private cwd;
    private fileNameConfig;
    private fileNameGitIgnore;
    private fileNameLocalConfig;
    private gitIgnorePath;
    private projectType;
    private themePaths;
    constructor(cwd: string);
    startSetup(): Promise<SetupResolve>;
    private getProjectConfig;
    editGitIgnoreFile(): void;
    private getGitIgnoreContent;
    private getProjectType;
    private getThemePaths;
    private getCleanPath;
    private getDevDependencies;
    private getBasePath;
    private getCleanBasePath;
}
export declare function setup(): Promise<void>;
export {};
