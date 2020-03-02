// import chalk from 'chalk';
import execa from 'execa';
import findUp from 'find-up';
import fs from 'fs';
import inquirer from 'inquirer';
import nodeEnvFile from 'node-env-file';
import ora from 'ora';
import path from 'path';
import * as yargs from 'yargs';

import { Pkg, ProjectConfig, ProjectDependencies } from './interfaces';
import {
  compileAndWriteHandlebarsTemplate,
  directoryExists,
  fileExists,
  getDirectories,
  getFormattedPath,
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

  private templatesPath = '../templates';

  private fileNameGulpFile: string = 'gulpfile.ts';

  private fileNameConfig: string = 'gulppress.config.ts';

  private fileNameLocalConfig: string = 'gulppress.local.config.ts';

  private fileNamePackageJson: string = 'package.json';

  private fileNameGitIgnore: string = '.gitignore';

  private gulpFilePath: string;

  private configPath: string;

  private localConfigPath: string;

  private packageJsonPath: string;

  private gitIgnorePath: string;

  private pkg: Pkg;

  constructor(cwd: string) {
    this.cwd = cwd;
    this.gulpFilePath = path.resolve(this.cwd, this.fileNameGulpFile);
    this.configPath = path.resolve(this.cwd, this.fileNameConfig);
    this.localConfigPath = path.resolve(this.cwd, this.fileNameLocalConfig);
    this.packageJsonPath = path.resolve(this.cwd, this.fileNamePackageJson);
    this.gitIgnorePath = path.resolve(this.cwd, this.fileNameGitIgnore);

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
    if (!argv.force && fileExists(this.configPath)) {
      return Promise.reject(
        new Error('Project is already set up.'),
      );
    }

    const projectConfig = await this.initConfig();
    this.compileAndWriteFiles(projectConfig);
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
        basePath: answers.basePath ? getFormattedPath(answers.basePath, this.cwd) : './',
        projectURL: answers.projectURL,
        dotEnv: answers.dotEnv,
        dotEnvPath: answers.dotEnvPath
          ? getFormattedPath(path.relative(this.cwd, answers.dotEnvPath), this.cwd) : '',
        createSeparateMinFiles: answers.createSeparateMinFiles,
        useYarn: answers.useYarn,
        environment: answers.dotEnvPath ? null : "\n    environment: 'development',",
        srcStructure: this.getSrcStructure(answers.structure),
        distStructure: this.getDistStructure(answers.structure),
      };

      return config;
    });
  }

  private compileAndWriteFiles(config: ProjectConfig): void {
    compileAndWriteHandlebarsTemplate(
      `${this.templatesPath}/${this.fileNameConfig}.hbs`,
      this.configPath,
      config,
    );

    compileAndWriteHandlebarsTemplate(
      `${this.templatesPath}/${this.fileNameLocalConfig}.hbs`,
      this.localConfigPath,
      config,
    );

    compileAndWriteHandlebarsTemplate(
      `${this.templatesPath}/${this.fileNameGulpFile}.hbs`,
      this.gulpFilePath,
    );
  }

  private async getUserInput(): Promise<inquirer.Answers> {
    const questions: inquirer.QuestionCollection = [
      // Type of project
      {
        type: 'list',
        name: 'type',
        message: 'Type of WordPress Project (plugin or theme)',
        choices: ['bedrock', 'plugin', 'theme'],
        default: () => {
          if (fileExists(path.resolve(this.cwd, './style.css'))) {
            return 'theme';
          }
          if (directoryExists(path.resolve(this.cwd, './web/app/themes'))) {
            return 'bedrock';
          }
          return 'plugin';
        },
      },
      // Name of project
      {
        type: 'input',
        name: 'appName',
        message: answers => `Name of WordPress ${answers.type === 'plugin' ? 'plugin' : 'theme'}`,
        default: (answers: inquirer.Answers): string => {
          if (answers.type === 'bedrock') {
            const themes = getDirectories('./web/app/themes');
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
      // {
      //   type: 'list',
      //   name: 'basePathList',
      //   message: 'Select your theme\'s directory',
      //   when: answers => answers.type !== 'plugin',
      //   default: (answers: inquirer.Answers): string => {
      //     const paths = this.getThemePaths();
      //     const themes = getDirectories('./web/app/themes');
      //     if (themes.length > 0) {
      //       if (themes.includes(answers.appName)) {
      //         return `./web/app/themes/${answers.appName}`;
      //       }
      //       return `./web/app/themes/${themes[0]}`;
      //     }
      //     return './';
      //   },
      // },
      {
        type: 'input',
        name: 'basePath',
        message: 'Select your theme\'s directory',
        when: answers => answers.type === 'bedrock',
        default: (answers: inquirer.Answers): string => {
          const themes = getDirectories('./web/app/themes');
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
        type: 'input',
        name: 'projectURL',
        message: 'URL of your local WordPress site',
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

  private getThemePaths(): [] {
    if (fileExists(path.resolve(this.cwd, './style.css'))) {
      console.log('inside theme');
    } else if (directoryExists(path.resolve(this.cwd, './web/app/themes'))) {
      console.log('inside bedrock root');
      console.log(getDirectories('./web/app/themes'));
    } else if (directoryExists(path.resolve(this.cwd, './wp-content'))) {
      console.log('wproot');
      console.log(getDirectories('./wp-content/themes'));
    } else {
      console.log('find');
      const dirs = getDirectories('./');
      const filteredDirs = dirs.filter((value: string) => ![
        '.git',
        'node_modules',
        'vendor',
        'config',
      ].includes(value));
      console.log(filteredDirs);
      filteredDirs.forEach(element => {
        console.log(getDirectories(`./${element}`));
      });
    }

    return [];
  }

  public configureScripts(
    projectConfig: ProjectConfig,
  ): ProjectDependencies {
    const packageFileData: Pkg = fileExists(this.packageJsonPath)
      // eslint-disable-next-line global-require
      ? require(this.packageJsonPath)
      : {
        name: projectConfig.appName,
      };
    const scripts: { [x: string]: string } = {
      dev: 'gulp dev --watch=scripts,styles',
      build: 'gulp build --env=production',
      'build:styles': 'gulp styles --env=production',
      'build:scripts': 'gulp scripts --env=production',
      clean: 'gulp clean',
      assets: 'gulp assets',
      favicon: 'gulp favicon',
      fonts: 'gulp fonts',
      icons: 'gulp icons',
      images: 'gulp images',
      scripts: 'gulp scripts',
      styles: 'gulp styles',
      translate: 'gulp translate',
      vendorScripts: 'gulp vendorScripts',
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
    const content =`\n${this.fileNameLocalConfig}`;
    if (fileExists(this.gitIgnorePath)) {
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
