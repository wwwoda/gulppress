// import chalk from 'chalk';
// import download from 'download';
// import ora from 'ora';
import execa from 'execa';
import fs from 'fs';
import handlebars from 'handlebars';
import inquirer from 'inquirer';
import path from 'path';

import { Pkg, ProjectConfig, ProjectDependencies } from './interfaces';
import {
  copyFileSync,
  installWithYarn,
  isYarn,
  resolveCWD,
} from './utils';

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

class SetupResolve {
  public projectConfig?: ProjectConfig;

  public deps?: ProjectDependencies;

  constructor(
    projectConfig?: ProjectConfig,
    deps?: ProjectDependencies,
  ) {
    this.projectConfig = projectConfig;
    this.deps = deps;
  }
}

export class Setup {
  private cwd: string;

  private gulpFilePath: string;

  private configPath: string;

  private packageJsonPath: string;

  private pkg: Pkg;

  constructor(cwd: string) {
    this.cwd = cwd;
    this.gulpFilePath = path.resolve(this.cwd, 'gulpfile.ts');
    this.configPath = path.resolve(this.cwd, 'gulppress.config.ts');
    this.packageJsonPath = path.resolve(this.cwd, 'package.json');

    try {
      // eslint-disable-next-line global-require
      const pkg = require(this.packageJsonPath) as Pkg;
      this.pkg = pkg;
    } catch (e) {
      this.pkg = {
        name: '',
        homepage: '',
        author: '',
        license: 'UNLICENSED',
      };
    }
  }

  public async startSetup(): Promise<SetupResolve> {
    if (this.isConfigPresent()) {
      return Promise.reject(
        new Error('Project is already set up.'),
      );
    }

    const projectConfig = await this.initConfig();
    const deps = this.configureScripts(projectConfig);
    return Promise.resolve(
      new SetupResolve(projectConfig, deps),
    );
  }

  private async initConfig(): Promise<ProjectConfig> {
    return this.getUserInput().then(answers => {
      const config: ProjectConfig = {
        appName: answers.appName,
        type: answers.type,
        basePath: answers.basePath ? path.relative(this.cwd, answers.basePath) : '',
        dotEnv: answers.dotEnv,
        dotEnvPath: `./${answers.dotEnvPath}`,
        createSeparateMinFiles: answers.createSeparateMinFiles,
        useYarn: answers.useYarn,
      };
      const source: string = fs
        .readFileSync(
          path.resolve(
            __dirname,
            '../templates/gulppress.config.ts.hbs',
          ),
        )
        .toString();
      const compiler = handlebars.compile(source);
      fs.writeFileSync(this.configPath, compiler(config));
      copyFileSync(path.resolve(__dirname, '../templates/gulpfile.ts.hbs'), this.gulpFilePath);
      return config;
    });
  }

  private async getUserInput(): Promise<inquirer.Answers> {
    const questions: inquirer.QuestionCollection = [
      {
        message: 'Type of WordPress Project (plugin or theme)',
        name: 'type',
        type: 'list',
        choices: ['bedrock', 'plugin', 'theme'],
        default: () => {
          if (this.fileExists(path.resolve(this.cwd, './style.css'))) {
            return 'theme';
          }
          if (this.pathExists(path.resolve(this.cwd, './web/app/themes'))) {
            return 'bedrock';
          }
          return 'plugin';
        },
      },
      {
        message: answers => `Name of WordPress ${answers.type === 'plugin' ? 'plugin' : 'theme'}`,
        name: 'appName',
        type: 'input',
        default: this.pkg.name || '',
      },
      {
        type: 'fuzzypath',
        name: 'basePath',
        excludePath: (nodePath: string): boolean => nodePath.startsWith('node_modules'),
        itemType: 'directory',
        message: 'Select you theme\'s/plugin\'s directory',
        default: (answers: inquirer.Answers): string => {
          if (answers.type === 'bedrock') {
            if (this.pathExists(path.resolve(this.cwd, `./web/app/themes/${answers.appName}`))) {
              return `./web/app/themes/${answers.appName}`;
            }
            if (this.pathExists(path.resolve(this.cwd, './web/app/themes'))) {
              return 'web/app/themes';
            }
            return '';
          }
          return '';
        },
        suggestOnly: true,
      },
      {
        type: 'confirm',
        name: 'dotEnv',
        message: 'Do you use a working environment file (.env)?',
        when: answers => answers.type !== 'bedrock',
      },
      {
        type: 'fuzzypath',
        name: 'dotEnvPath',
        excludePath: (nodePath: string): boolean => nodePath.startsWith('node_modules'),
        itemType: 'file',
        message: 'Select your .env file',
        default: '.env',
        suggestOnly: true,
        when: answers => answers.dotEnv || answers.type === 'bedrock',
      },
      {
        type: 'confirm',
        name: 'usecreateSeparateMinFilesYarn',
        message: 'Create separate .min files for scripts and styles?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'useYarn',
        message: 'Install dependencies with yarn instead of npm (yarn needs to be installed globally)?',
        when: !isYarn(),
      },
    ];

    return inquirer.prompt(questions);
  }

  public configureScripts(
    projectConfig: ProjectConfig,
  ): ProjectDependencies {
    const packageFileData: Pkg = this.fileExists(this.packageJsonPath)
      // eslint-disable-next-line global-require
      ? require(this.packageJsonPath)
      : {
        name: projectConfig.appName,
      };
    const scripts: { [x: string]: string } = {
      build: 'gulp build',
      'build:production': 'cross-env NODE_ENV=production gulp build',
      dev: 'gulp dev',
    };
    if (!packageFileData.scripts) {
      packageFileData.scripts = {};
    }
    Object.keys(scripts).forEach(script => {
      // Take a backup if the script is already defined
      // and doesn't equal to what we would like it to have.
      if (
        packageFileData.scripts
        && packageFileData.scripts[script] != null
        && packageFileData.scripts[script] !== scripts[script]
      ) {
        packageFileData.scripts[`${script}-backup`] = packageFileData.scripts[script];
        packageFileData.scripts[script] = scripts[script];
      } else if (packageFileData.scripts) {
        // Otherwise define our own
        packageFileData.scripts[script] = scripts[script];
      }
    });

    const dependencies: string[] = [];
    const devDependencies: string[] = [];

    // If @wpackio/scripts is not already present in devDependencies
    // Then push it. We do this check, because @wpackio/cli might already
    // have installed it during scaffolding.
    if (
      !packageFileData.devDependencies
      || !packageFileData.devDependencies['@gulppress/scripts']
    ) {
      devDependencies.push('@gulppress/scripts');
    }

    // Write it
    fs.writeFileSync(
      this.packageJsonPath,
      JSON.stringify(packageFileData, null, 2),
    );

    return { dependencies, devDependencies };
  }

  private fileExists(filePath: string): boolean {
    try {
      return fs.statSync(filePath).isFile();
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false;
      }

      throw error;
    }
  }

  private pathExists(directoryPath: string): boolean {
    try {
      return fs.statSync(directoryPath).isDirectory();
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false;
      }

      throw error;
    }
  }

  private isConfigPresent(): boolean {
    return this.fileExists(this.configPath);
  }
}

export async function setup(): Promise<void> {
  const cwd = resolveCWD({});
  const initiator = new Setup(cwd);

  try {
    const done = await initiator.startSetup();
    const useYarn = installWithYarn(done.projectConfig);
    const command = useYarn ? 'yarn' : 'npm';
    const add = useYarn ? 'add' : 'i';
    const devParam = useYarn ? '--dev' : '-D';

    if (done.deps && done.deps.devDependencies.length) {
      try {
        await execa(command, [
          add,
          ...done.deps.devDependencies,
          devParam,
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }

  console.log('done');
}
