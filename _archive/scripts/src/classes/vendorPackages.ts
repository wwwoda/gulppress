import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import readPkg from 'read-pkg-up';

export class VendorPackages {
  private src: string[] = [];

  private versions: { [key: string]: string } = {};

  public addSource(src: string): void {
    this.src.push(src);
  }

  public addVersion(key: string, version: string): void {
    this.versions[key] = version;
  }

  public getSources(): string[] {
    return this.src;
  }

  public getVersions(): { [key: string]: string } {
    return this.versions;
  }

  public init(packages: string[] | undefined): void {
    if (!packages) {
      return;
    }
    packages.forEach(pkg => {
      this.processPackageName(pkg);
    });
  }

  public static getBaseName(baseName: string, pkgName: string): string {
    return baseName !== 'index'
      ? baseName
      : `${pkgName}`;
  }

  private processPackageName(pkgName: string): void {
    const pkgPath = VendorPackages.getPackagePath(pkgName);
    if (!VendorPackages.isDirectory(pkgPath, pkgName)) {
      return;
    }
    const pkgJson = readPkg.sync({ cwd: pkgPath });
    if (pkgJson?.packageJson.name !== pkgName) {
      return;
    }
    const mainScriptPath = path.resolve(pkgPath, VendorPackages.getMainScript(pkgJson));
    if (!VendorPackages.isFile(mainScriptPath, pkgName)) {
      return;
    }
    this.addSource(path.relative(process.cwd(), mainScriptPath));
    if (pkgJson?.packageJson.version) {
      this.addVersion(
        `${VendorPackages.getBaseName(path.basename(mainScriptPath, '.js'), pkgName)}.js`,
        pkgJson?.packageJson.version,
      );
    }
  }

  private static isDirectory(dirPath: string, pkgName: string): boolean {
    try {
      return fs.statSync(dirPath).isDirectory();
    } catch (error) {
      VendorPackages.handleDirectoryError(error, pkgName);
    }
    return false;
  }

  private static isFile(filePath: string, pkgName: string): boolean {
    try {
      return fs.statSync(filePath).isFile();
    } catch (error) {
      VendorPackages.handleFileError(error, pkgName);
    }
    return false;
  }

  private static getMainScript(pkgJson: readPkg.NormalizedReadResult): string {
    return pkgJson.packageJson.main?.endsWith('.js')
      ? pkgJson.packageJson.main
      : `${pkgJson.packageJson.main || 'index'}.js`;
  }

  private static getPackagePath(pkgName: string): string {
    return path.resolve(process.cwd(), './node_modules', `./${pkgName}/`);
  }

  private static handleDirectoryError(error: any, pkg: string) {
    if (error.code === 'ENOENT') {
      console.log(chalk.red(`Can't find package directory "${error.path}"`));
    } else {
      console.log(chalk.red(`Error processing vendor package "${pkg}"`));
      console.log(error);
    }
  }

  private static handleFileError(error: any, pkg: string) {
    if (error.code === 'ENOENT') {
      console.log(chalk.red(`Can't find package file "${error.path}"`));
    } else {
      console.log(chalk.red(`Error processing vendor package "${pkg}"`));
      console.log(error);
    }
  }
}
