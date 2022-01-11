export declare class VendorPackages {
    private src;
    private versions;
    addSource(src: string): void;
    addVersion(key: string, version: string): void;
    getSources(): string[];
    getVersions(): {
        [key: string]: string;
    };
    init(packages: string[] | undefined): void;
    static getBaseName(baseName: string, pkgName: string): string;
    private processPackageName;
    private static isDirectory;
    private static isFile;
    private static getMainScript;
    private static getPackagePath;
    private static handleDirectoryError;
    private static handleFileError;
}
