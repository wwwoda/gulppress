import { paramCase } from 'change-case';
import execa from 'execa';
import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import path from 'path';
import * as yargs from 'yargs';

import { Inquirer } from './inquirer';
import { PackageJson } from './packageJson';
import { TemplatesHandler } from './templates';

import {
  // Pkg,
  ProjectConfig,
  DistStructure,
  SrcStructure,
} from './interfaces';
import {
  directoryExists,
  fileExists,
  getDirectories,
  getFormattedPath,
  installWithYarn,
  resolveCWD,
} from './utils';

const { argv } = yargs;

class SetupResolve {
  public projectConfig: ProjectConfig;

  public devDependencies: string[];

  constructor(
    projectConfig: ProjectConfig,
    devDependencies: string[],
  ) {
    this.projectConfig = projectConfig;
    this.devDependencies = devDependencies;
  }
}

type ProjectType = 'bedrock' | 'theme' | 'plugin';

export class Setup {
  private configPath: string;

  private cwd: string;

  private fileNameConfig: string = 'gulppress.config.ts';

  private fileNameGitIgnore: string = '.gitignore';

  private fileNameLocalConfig: string = 'gulppress.local.config.ts';

  // private fileNamePackageJson: string = 'package.json';

  private gitIgnorePath: string;

  // private pkg: Pkg;

  private projectType: ProjectType;

  private themePaths: string[];

  constructor(cwd: string) {
    this.cwd = cwd;
    this.configPath = path.resolve(this.cwd, this.fileNameConfig);
    // this.packageJsonPath = path.resolve(this.cwd, this.fileNamePackageJson);
    this.gitIgnorePath = path.resolve(this.cwd, this.fileNameGitIgnore);
    this.themePaths = this.getThemePaths(this.cwd);
    this.projectType = this.getProjectType(this.themePaths);

    PackageJson.init(cwd);
  }

  public async startSetup(): Promise<SetupResolve> {
    if (!argv.force && fileExists(this.configPath)) {
      return Promise.reject(
        new Error('Project is already set up.'),
      );
    }

    const projectConfig = await this.getProjectConfig();
    const devDependencies = this.getDevDependencies(projectConfig);
    TemplatesHandler.writeFiles(this.cwd, projectConfig);
    PackageJson.setup(projectConfig);
    // this.editGitIgnoreFile();
    return Promise.resolve(
      new SetupResolve(projectConfig, devDependencies),
    );
  }

  private async getProjectConfig(): Promise<ProjectConfig> {
    return Inquirer.getUserInput({
      name: PackageJson.data.name,
      projectType: this.projectType,
      themePaths: this.themePaths,
    }).then(answers => {
      const config: ProjectConfig = {
        projectName: answers.projectName,
        domain: paramCase(answers.projectName),
        type: answers.type,
        basePath: this.getBasePath(answers),
        basePathClean: this.getCleanBasePath(answers),
        projectURL: answers.projectURL,
        tasks: answers.tasks,
        features: answers.features,
        dotEnv: answers.dotEnv,
        dotEnvPath: answers.dotEnvPath
          ? getFormattedPath(path.relative(this.cwd, answers.dotEnvPath), this.cwd) : '',
        createSeparateMinFiles: answers.createSeparateMinFiles,
        environment: answers.dotEnvPath
          ? null : "\n    environment: 'development',",
        srcStructure: answers.srcStructure,
        srcStructurePath: this.getSrcStructure(answers.srcStructure),
        distStructure: answers.distStructure,
        distStructurePath: this.getDistStructure(answers.distStructure),
      };

      return config;
    });
  }

  public editGitIgnoreFile() {
    const gitignoreContent = this.getGitIgnoreContent();
    const newContent = `\n# GulpPress Local Config\n${this.fileNameLocalConfig}`;
    if (gitignoreContent.includes(this.fileNameLocalConfig)) {
      return;
    }
    fs.writeFileSync(
      this.gitIgnorePath,
      gitignoreContent + newContent,
    );
  }

  private getGitIgnoreContent(): string {
    if (fileExists(this.gitIgnorePath)) {
      return fs.readFileSync(this.gitIgnorePath).toString().trim();
    }
    return '';
  }

  private getProjectType(themePaths: string[]): ProjectType {
    if (themePaths.length > 0) {
      if (themePaths[0].indexOf('web/app/themes') > -1) {
        return 'bedrock';
      }
      if (themePaths[0].indexOf('wp-content/themes') > -1) {
        return 'theme';
      }
    }

    return 'theme';
  }

  private getThemePaths(cwd: string, subDirectory?: string): string[] {
    const themePaths: string[] = [];
    let typePath = '';

    if (directoryExists(path.resolve(subDirectory || cwd, './web/app/themes'))) {
      typePath = 'web/app/themes';
    }

    if (directoryExists(path.resolve(subDirectory || cwd, './wp-content/themes'))) {
      typePath = 'wp-content/themes';
    }

    if (typePath !== '') {
      const searchPath = subDirectory
        ? `./${path.relative(cwd, subDirectory)}/${typePath}`
        : `./${typePath}`;
      const themeNames = getDirectories(searchPath);
      if (themeNames.length > 1) {
        themePaths.push(...themeNames.map(theme => `${searchPath}/${theme}/`));
      }
      return themePaths;
    }

    if (typeof subDirectory === 'undefined') {
      const dirs = getDirectories('./');
      const filteredDirs = dirs.filter((value: string) => ![
        '.git',
        '.github',
        'node_modules',
        'vendor',
        'config',
      ].includes(value));
      filteredDirs.some(element => {
        const newCwd = path.resolve(`./${element}`);
        const paths = this.getThemePaths(cwd, newCwd);
        if (paths.length > 0) {
          themePaths.push(...paths);
        }
        return themePaths.length < 1;
      });
    }

    return themePaths;
  }

  private getSrcStructure(structure: SrcStructure): string {
    switch (structure) {
      case 'src':
        return '/src/';
      case 'assets':
      default:
        return '/assets/src/';
    }
  }

  private getDistStructure(structure: DistStructure): string {
    // eslint-disable-next-line default-case
    switch (structure) {
      case 'dist':
        return '/dist/';
      case 'root':
        return '/';
      case 'assets':
      default:
        return '/assets/dist/';
    }
  }

  private getDevDependencies(projectConfig: ProjectConfig): string[] {
    const devDependencies = ['@gulppress/scripts'];

    if (projectConfig.features.includes('typescript')) {
      devDependencies.push('typescript');
      devDependencies.push('@types/gulp');
    }

    if (projectConfig.features.includes('eslint')) {
      devDependencies.push('eslint');
      devDependencies.push('eslint-config-woda');
    }

    if (projectConfig.features.includes('stylelint')) {
      devDependencies.push('stylelint');
      devDependencies.push('stylelint-config-woda');
    }
    return devDependencies;
  }

  private getBasePath(answers: inquirer.Answers): string {
    const p = answers.basePathList || answers.basePath;
    return p ? getFormattedPath(p, this.cwd) : './';
  }

  private getCleanBasePath(answers: inquirer.Answers): string {
    return this.getBasePath(answers).replace(/^\.\//g, '');
  }
}

export async function setup(): Promise<void> {
  const cwd = resolveCWD({});
  const initiator = new Setup(cwd);

  try {
    const done = await initiator.startSetup();
    const spinner = ora({ spinner: 'dots3', discardStdin: false });

    if (done && done.devDependencies.length) {
      spinner.start('installing dev dependencies may take a while');
      try {
        await execa('yarn', [
          'add',
          ...done.devDependencies,
          '--dev',
        ]);
        spinner.succeed('done installing dev dependencies\n');
      } catch (error) {
        spinner.fail('could not install all dev dependencies');
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }

  console.log('done');
}
