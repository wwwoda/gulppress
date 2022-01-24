import fs from 'fs';
import path from 'path';

import {
  fileExists,
} from './utils';
import {
  IndexedObject,
  Pkg,
  ProjectConfig,
} from './interfaces';


export class PackageJson {
  public static data: Pkg;

  private static fileNamePackageJson: string = 'package.json';

  private static packageJsonPath: string;

  private static tasks: IndexedObject = {
    dev: 'npm run development',
    development: 'cross-env NODE_ENV=development gulp development',
    serve: 'npm run watch',
    watch: 'cross-env NODE_ENV=development gulp development --watch=scripts,styles',
    prod: 'npm run build',
    production: 'npm run build',
    build: 'cross-env NODE_ENV=production gulp build',
  };

  public static init(cwd: string): Pkg {
    PackageJson.packageJsonPath = path.resolve(cwd, PackageJson.fileNamePackageJson);
    PackageJson.data = PackageJson.readPackageData();
    PackageJson.preparePackage();
    return PackageJson.data;
  }

  public static setup(
    projectConfig: ProjectConfig,
  ): Pkg {
    PackageJson.addMissingTasks();
    if (!PackageJson.data.name) {
      PackageJson.data.name = projectConfig.projectName;
    }
    PackageJson.writePackageJsonFile();
    return PackageJson.data;
  }

  private static readPackageData(): Pkg {
    const {
      packageJsonPath,
    } = PackageJson;
    return fileExists(packageJsonPath)
    // eslint-disable-next-line global-require
      ? require(packageJsonPath)
      : { name: '' };
  }

  private static preparePackage(): void {
    const { data } = PackageJson;

    if (!data.scripts) {
      data.scripts = {};
    }
  }

  private static addMissingTasks(): void {
    const {
      data,
      tasks,
    } = PackageJson;
    Object.keys(tasks).forEach(task => {
      if (
        data.scripts[task]
        && data.scripts[task] !== tasks[task]
      ) {
        PackageJson.data.scripts[`${task}-backup`] = data.scripts[task];
        PackageJson.data.scripts[task] = tasks[task];
      } else {
        PackageJson.data.scripts[task] = tasks[task];
      }
    });
  }

  private static writePackageJsonFile(): void {
    const {
      data,
      packageJsonPath,
    } = PackageJson;
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(data, null, 2),
    );
  }
}
