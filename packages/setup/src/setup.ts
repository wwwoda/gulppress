// import chalk from 'chalk';
import execa from 'execa';
import findUp from 'find-up';
import fs from 'fs';
import handlebars from 'handlebars';
import inquirer from 'inquirer';
import nodeEnvFile from 'node-env-file';
import ora from 'ora';
import path from 'path';
import * as yargs from 'yargs';

import { Pkg, ProjectConfig, ProjectDependencies } from './interfaces';
import {
  copyFileSync,
  installWithYarn,
  isYarn,
  resolveCWD,
} from './utils';

const { argv } = yargs;

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

  private browserSyncConfigPath: string;

  private packageJsonPath: string;

  private gitIgnorePath: string;

  private pkg: Pkg;

  constructor(cwd: string) {
    this.cwd = cwd;
    this.gulpFilePath = path.resolve(this.cwd, 'gulpfile.ts');
    this.configPath = path.resolve(this.cwd, 'gulppress.config.ts');
    this.browserSyncConfigPath = path.resolve(this.cwd, 'gulppress.browsersync.ts');
    this.packageJsonPath = path.resolve(this.cwd, 'package.json');
    this.gitIgnorePath = path.resolve(this.cwd, '.gitignore');

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
    if (!argv.force && this.isConfigPresent()) {
      return Promise.reject(
        new Error('Project is already set up.'),
      );
    }

    const projectConfig = await this.initConfig();
    const deps = this.configureScripts(projectConfig);
    this.editGitIgnoreFile();
    return Promise.resolve(
      new SetupResolve(projectConfig, deps),
    );
  }

  private async initConfig(): Promise<ProjectConfig> {
    return this.getUserInput().then(answers => {
      const config: ProjectConfig = {
        appName: answers.appName,
        type: answers.type,
        basePath: answers.basePath ? this.getFormattedPath(answers.basePath) : './',
        projectURL: answers.projectURL,
        dotEnv: answers.dotEnv,
        dotEnvPath: answers.dotEnvPath
          ? this.getFormattedPath(path.relative(this.cwd, answers.dotEnvPath)) : '',
        createSeparateMinFiles: answers.createSeparateMinFiles,
        useYarn: answers.useYarn,
        environment: answers.dotEnvPath ? null : "\n    environment: 'development',",
        srcStructure: this.getSrcStructure(answers.structure),
        distStructure: this.getDistStructure(answers.structure),
      };
      const configTemplate = this.getHandlebarsTemplateString('../templates/gulppress.config.ts.hbs');
      const browserSyncConfigTemplate = this.getHandlebarsTemplateString('../templates/gulppress.browsersync.ts.hbs');
      const configCompiler = handlebars.compile(configTemplate);
      const browserSyncConfigCompiler = handlebars.compile(browserSyncConfigTemplate);
      fs.writeFileSync(this.configPath, configCompiler(config));
      fs.writeFileSync(this.browserSyncConfigPath, browserSyncConfigCompiler(config));
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
        default: (answers: inquirer.Answers): string => {
          if (answers.type === 'bedrock') {
            const themes = this.getDirectories('./web/app/themes');
            if (themes.length > 0) {
              return themes[0];
            }
          }
          if (!this.cwd.endsWith('/')) {
            return this.cwd.split('/').slice(-1)[0];
          }
          return this.pkg.name || '';
        },
      },
      {
        type: 'input',
        name: 'basePath',
        message: 'Select your theme\'s directory',
        when: answers => answers.type === 'bedrock',
        default: (answers: inquirer.Answers): string => {
          const themes = this.getDirectories('./web/app/themes');
          if (themes.length > 0) {
            if (themes.includes(answers.appName)) {
              return `./web/app/themes/${answers.appName}`;
            }
            return `./web/app/themes/${themes[0]}`;
          }
          return './';
        },
      },
      {
        type: 'confirm',
        name: 'dotEnv',
        message: 'Do you use a working environment file (eg .env)?',
        when: answers => answers.type === 'theme',
        default: false,
      },
      {
        type: 'input',
        name: 'dotEnvPath',
        message: 'Path to your working environment file',
        when: answers => answers.dotEnv || answers.type === 'bedrock',
        validate: input => {
          if (fs.existsSync(input)) {
            return true;
          }
          return 'No working environment file found at this location. Please create one to continue.';
        },
        default: () => {
          if (fs.existsSync('.env')) {
            return '.env';
          }
          const cwd = process.cwd();
          const dotEnvPath = findUp.sync('.env', { cwd });
          if (typeof dotEnvPath === 'string' && dotEnvPath) {
            return path.relative(cwd, dotEnvPath);
          }
          return '.env';
        },
      },
      {
        message: 'URL of your local WordPress site',
        name: 'projectURL',
        type: 'input',
        when: answers => answers.type !== 'plugin',
        default: (answers: inquirer.Answers): string => {
          if (answers.dotEnvPath) {
            if (fs.existsSync(answers.dotEnvPath)) {
              nodeEnvFile(answers.dotEnvPath, { raise: false });
              return process.env.WP_HOME || '';
            }
          }
          return '';
        },
      },
      {
        type: 'list',
        name: 'structure',
        message: 'Select your assets file structure',
        choices: answers => [
          {
            name: `./assets/src and ./assets/dist folders inside the ${answers.type === 'plugin' ? 'plugin' : 'theme'} root`,
            value: 'assets',
          }, {
            name: `./src and ./dist folders inside the ${answers.type === 'plugin' ? 'plugin' : 'theme'} root`,
            value: 'split',
          }, {
            name: `Specific source folders (./scripts, ./styles, ./images, ...) and ./dist folder, all located inside the ${answers.type === 'plugin' ? 'plugin' : 'theme'} root`,
            value: 'root',
          },
        ],
      },
      {
        type: 'confirm',
        name: 'createSeparateMinFiles',
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
      assets: 'gulp assets',
      'assets:favicon': 'gulp favicon',
      'assets:fonts': 'gulp fonts',
      'assets:icons': 'gulp icons',
      'assets:images': 'gulp images',
      'assets:vendor': 'gulp vendorScripts',
      build: 'gulp build',
      'build:css': 'gulp styles',
      'build:js': 'gulp scripts',
      clean: 'gulp clean',
      dev: 'gulp dev --watch=scripts,styles',
      translate: 'gulp translate',
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

  public editGitIgnoreFile() {
    const content = 'gulppress.env.ts';
    if (this.fileExists(this.gitIgnorePath)) {
      fs.appendFileSync(
        this.gitIgnorePath,
        content,
      );
    } else {
      fs.writeFileSync(
        this.gitIgnorePath,
        content,
      );
    }
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

  private getDirectories(source: string): string[] {
    return fs.readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  }

  private isConfigPresent(): boolean {
    return this.fileExists(this.configPath);
  }

  private getFormattedPath(sourcePath): string {
    const relativePath = path.relative(this.cwd, sourcePath);
    if (!relativePath.startsWith('./') || !relativePath.startsWith('../')) {
      return `./${relativePath}`;
    }
    return relativePath;
  }

  private getHandlebarsTemplateString(templatePath: string): string {
    return fs
      .readFileSync(
        path.resolve(
          __dirname,
          templatePath,
        ),
      )
      .toString();
  }

  private getSrcStructure(structure: string): string {
    switch (structure) {
      case 'assets':
        return '/assets/src';
      case 'split':
        return '/src';
      case 'root':
        return '';
      default:
        return '/assets/src';
    }
  }

  private getDistStructure(structure: string): string {
    switch (structure) {
      case 'assets':
        return '/assets/dist';
      case 'split':
      case 'root':
        return '/dist';
      default:
        return '/assets/dist';
    }
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
    const spinner = ora({ spinner: 'dots3', discardStdin: false });

    if (done.deps && done.deps.devDependencies.length) {
      spinner.start('installing dev dependencies may take a while');
      try {
        await execa(command, [
          add,
          ...done.deps.devDependencies,
          devParam,
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
