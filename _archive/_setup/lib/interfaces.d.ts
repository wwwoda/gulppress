export declare type Feature = 'typescript' | 'eslint' | 'stylelint';
export declare type Task = 'styles' | 'browserSync' | 'favicon' | 'fonts' | 'icons' | 'images' | 'translation' | 'vendorScripts';
export declare type Type = 'theme' | 'plugin' | 'bedrock';
export interface Pkg {
    name: string;
    description: string;
    version: string;
    scripts: IndexedObject;
    keywords: string[];
    author: string | {
        name: string;
        email: string;
        url: string;
    };
    license: string;
    homepage: string;
    dependencies: IndexedObject;
    devDependencies: {
        [index: string]: string;
    };
}
export interface ProjectConfig {
    domain: string;
    environment: string | null;
    basePath: string;
    basePathClean: string;
    createSeparateMinFiles: boolean;
    distPath: string;
    dotEnv: boolean;
    dotEnvPath: string;
    features: Feature[];
    projectName: string;
    projectURL: string;
    srcPath: string;
    tasks: Task[];
    type: Type;
    useYarn: boolean;
}
export interface ProjectDependencies {
    dependencies?: string[];
    devDependencies?: string[];
}
export interface IndexedObject {
    [index: string]: string;
}
