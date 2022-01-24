import { Pkg, ProjectConfig } from './interfaces';
export declare class PackageJson {
    static data: Pkg;
    private static fileNamePackageJson;
    private static packageJsonPath;
    private static tasks;
    static init(cwd: string): Pkg;
    static setup(projectConfig: ProjectConfig): Pkg;
    private static readPackageData;
    private static preparePackage;
    private static addMissingTasks;
    private static writePackageJsonFile;
}
