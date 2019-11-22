// import chalk from 'chalk';
// import download from 'download';
// import ora from 'ora';
import fs from 'fs';
import handlebars from 'handlebars';
import inquirer from 'inquirer';
import path from 'path';

import { copyFileSync, resolveCWD } from './utils';

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

// const theCWD = process.cwd();
// const theCWDArray = theCWD.split('/');
// const theDir = theCWDArray[theCWDArray.length - 1];

interface Pkg {
  name: string;
  homepage?: string;
  author?: string | { name: string; email: string; url: string };
  license?: string;
  scripts?: {
    [x: string]: string;
  };
  dependencies?: {
    [x: string]: string;
  };
  devDependencies?: {
    [x: string]: string;
  };
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

  public async startSetup(): Promise<void> {
    return this.getUserInput().then(answers => {
      const context: {
        basePath: string;
        envFile: string | false;
      } = {
        basePath: answers.basePath ? path.relative(this.cwd, answers.basePath) : '',
        envFile: answers.dotEnv ? answers.dotEnvPath : false,
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
      fs.writeFileSync(this.configPath, compiler(context));
      copyFileSync(path.resolve(__dirname, '../templates/gulpfile.ts.hbs'), this.gulpFilePath);
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
        type: 'fuzzypath',
        name: 'basePath',
        excludePath: (nodePath: string): boolean => nodePath.startsWith('node_modules'),
        itemType: 'directory',
        message: 'Select you theme\'s directory (create folder in next step if you select /themes)',
        rootPath: path.resolve(this.cwd, './web/app/themes'),
        suggestOnly: true,
        when: answers => answers.type === 'bedrock'
          && this.getSubdirectories(path.resolve(this.cwd, './web/app/themes')).length,
      },
      {
        type: 'confirm',
        name: 'dotEnv',
        message: 'Do you use a working environment file (.env)?',
      },
      {
        type: 'fuzzypath',
        name: 'dotEnvPath',
        excludePath: (nodePath: string): boolean => nodePath.startsWith('node_modules'),
        itemType: 'file',
        message: 'Select your .env file',
        default: '.env',
        suggestOnly: true,
        when: answers => answers.dotEnv,
      },
    ];

    return inquirer.prompt(questions);
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

  private getSubdirectories(directoryPath: string): string[] {
    if (!this.pathExists(directoryPath)) return [];

    return fs.readdirSync(directoryPath).filter(file => fs
      .statSync(path.join(directoryPath, file))
      .isDirectory());
  }
}

export async function setup(): Promise<void> {
  const cwd = resolveCWD({});
  const initiator = new Setup(cwd);

  await initiator.startSetup();

  console.log('done');
}
