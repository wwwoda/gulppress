import { paramCase } from 'change-case';
import execa from 'execa';
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

type ProjectType = 'bedrock' | 'theme' | 'plugin';

export class Setup {
  private configPath: string;

  private cwd: string;

  private enterManuallyText = '>>> Enter manually';

  private fileNameConfig: string = 'gulppress.config.ts';

  private fileNameGitIgnore: string = '.gitignore';

  private fileNameGulpFile: string = 'gulpfile.ts';

  private fileNameLocalConfig: string = 'gulppress.local.config.ts';

  private fileNamePackageJson: string = 'package.json';

  private gitIgnorePath: string;

  private gulpFilePath: string;

  private localConfigPath: string;

  private packageJsonPath: string;

  private pkg: Pkg;

  private projectType: ProjectType;

  private templatesPath = '../templates';

  private themePaths: string[];

  constructor(cwd: string) {
    this.cwd = cwd;
    this.gulpFilePath = path.resolve(this.cwd, this.fileNameGulpFile);
    this.configPath = path.resolve(this.cwd, this.fileNameConfig);
    this.localConfigPath = path.resolve(this.cwd, this.fileNameLocalConfig);
    this.packageJsonPath = path.resolve(this.cwd, this.fileNamePackageJson);
    this.gitIgnorePath = path.resolve(this.cwd, this.fileNameGitIgnore);
    this.themePaths = this.getThemePaths(this.cwd);
    this.themePaths.push(this.enterManuallyText);
    this.projectType = this.getProjectType(this.themePaths);

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
        projectName: answers.projectName,
        domain: paramCase(answers.projectName),
        type: answers.type,
        basePath: this.extractCorrectBasePathFromAnswers(answers),
        projectURL: answers.projectURL,
        dotEnv: answers.dotEnv,
        dotEnvPath: answers.dotEnvPath
          ? getFormattedPath(path.relative(this.cwd, answers.dotEnvPath), this.cwd) : '',
        createSeparateMinFiles: answers.createSeparateMinFiles,
        useYarn: answers.useYarn,
        environment: answers.dotEnvPath
          ? null : "\n    environment: 'development',",
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
      {
        type: 'list',
        name: 'type',
        message: 'Type of project',
        choices: ['theme', 'plugin', 'bedrock'],
        default: () => this.projectType,
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name',
        default: this.pkg.name || '',
      },
      {
        type: 'list',
        name: 'basePathList',
        message: 'Select your theme\'s directory',
        when: answers => answers.type !== 'plugin' && this.themePaths.length > 1,
        choices: this.themePaths,
      },
      {
        type: 'input',
        name: 'basePath',
        message: 'Enter your theme\'s directory',
        when: answers => this.projectType !== 'plugin'
          && (answers.basePathList === this.enterManuallyText
          || !answers.basePathList),
        default: './',
      },
      {
        type: 'confirm',
        name: 'dotEnv',
        message: 'Do you use a working environment file (eg .env)?',
        when: answers => answers.type !== 'plugin',
        default: (answers: inquirer.Answers) => answers.type === 'bedrock',
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
        default: './.env',
      },
      {
        type: 'input',
        name: 'projectURL',
        message: 'URL of your local WordPress site',
        when: answers => answers.type !== 'plugin',
        default: (answers: inquirer.Answers) => {
          if (answers.dotEnvPath && fs.existsSync(answers.dotEnvPath)) {
            nodeEnvFile(answers.dotEnvPath, { raise: false });
            return process.env.WP_HOME || '';
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
    const packageFileData: Pkg = fileExists(this.packageJsonPath)
      // eslint-disable-next-line global-require
      ? require(this.packageJsonPath)
      : { name: projectConfig.domain };
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
      if (
        packageFileData.scripts
        && packageFileData.scripts[script] != null
        && packageFileData.scripts[script] !== scripts[script]
      ) {
        packageFileData.scripts[`${script}-backup`] = packageFileData.scripts[script];
        packageFileData.scripts[script] = scripts[script];
      } else if (packageFileData.scripts) {
        packageFileData.scripts[script] = scripts[script];
      }
    });

    const dependencies: string[] = [];
    const devDependencies: string[] = [];
    if (
      !packageFileData.devDependencies
      || !packageFileData.devDependencies['@gulppress/scripts']
    ) {
      devDependencies.push('@gulppress/scripts');
    }

    fs.writeFileSync(
      this.packageJsonPath,
      JSON.stringify(packageFileData, null, 2),
    );

    return { dependencies, devDependencies };
  }

  public editGitIgnoreFile() {
    const content = `\n${this.fileNameLocalConfig}`;
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
        themePaths.push(...themeNames.map(theme => `${searchPath}/${theme}`));
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

  private extractCorrectBasePathFromAnswers(answers: inquirer.Answers): string {
    const p = answers.basePathList || answers.basePath;
    return p ? getFormattedPath(p, this.cwd) : './';
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
