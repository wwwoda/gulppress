"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;
exports.Setup = void 0;

var _changeCase = require("change-case");

var _execa = _interopRequireDefault(require("execa"));

var _fs = _interopRequireDefault(require("fs"));

var _ora = _interopRequireDefault(require("ora"));

var _path = _interopRequireDefault(require("path"));

var yargs = _interopRequireWildcard(require("yargs"));

var _inquirer = require("./inquirer");

var _packageJson = require("./packageJson");

var _templates = require("./templates");

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  argv
} = yargs;

class SetupResolve {
  constructor(projectConfig, devDependencies) {
    _defineProperty(this, "projectConfig", void 0);

    _defineProperty(this, "devDependencies", void 0);

    this.projectConfig = projectConfig;
    this.devDependencies = devDependencies;
  }

}

class Setup {
  constructor(cwd) {
    _defineProperty(this, "configPath", void 0);

    _defineProperty(this, "cwd", void 0);

    _defineProperty(this, "fileNameConfig", 'gulppress.config.ts');

    _defineProperty(this, "fileNameGitIgnore", '.gitignore');

    _defineProperty(this, "fileNameLocalConfig", 'gulppress.local.config.ts');

    _defineProperty(this, "gitIgnorePath", void 0);

    _defineProperty(this, "projectType", void 0);

    _defineProperty(this, "themePaths", void 0);

    this.cwd = cwd;
    this.configPath = _path.default.resolve(this.cwd, this.fileNameConfig);
    this.gitIgnorePath = _path.default.resolve(this.cwd, this.fileNameGitIgnore);
    this.themePaths = this.getThemePaths(this.cwd);
    this.projectType = this.getProjectType(this.themePaths);

    _packageJson.PackageJson.init(cwd);
  }

  async startSetup() {
    if (!argv.force && (0, _utils.fileExists)(this.configPath)) {
      return Promise.reject(new Error('Project is already set up.'));
    }

    const projectConfig = await this.getProjectConfig();
    const devDependencies = this.getDevDependencies(projectConfig);

    _templates.TemplatesHandler.writeFiles(this.cwd, projectConfig);

    _packageJson.PackageJson.setup(projectConfig); // this.editGitIgnoreFile();


    return Promise.resolve(new SetupResolve(projectConfig, devDependencies));
  }

  async getProjectConfig() {
    return _inquirer.Inquirer.getUserInput({
      name: _packageJson.PackageJson.data.name,
      projectType: this.projectType,
      themePaths: this.themePaths
    }).then(answers => {
      const config = {
        projectName: answers.projectName,
        domain: (0, _changeCase.paramCase)(answers.projectName),
        type: answers.type,
        basePath: this.getBasePath(answers),
        basePathClean: this.getCleanBasePath(answers),
        projectURL: answers.projectURL,
        tasks: answers.tasks,
        features: answers.features,
        dotEnv: answers.dotEnv,
        dotEnvPath: answers.dotEnvPath ? (0, _utils.getFormattedPath)(_path.default.relative(this.cwd, answers.dotEnvPath), this.cwd) : '',
        createSeparateMinFiles: answers.createSeparateMinFiles,
        useYarn: answers.useYarn,
        environment: answers.dotEnvPath ? null : "\n    environment: 'development',",
        srcPath: this.getCleanPath(answers.srcPath),
        distPath: this.getCleanPath(answers.distPath)
      };
      return config;
    });
  }

  editGitIgnoreFile() {
    const gitignoreContent = this.getGitIgnoreContent();
    const newContent = `\n# GulpPress Local Config\n${this.fileNameLocalConfig}`;

    if (gitignoreContent.includes(this.fileNameLocalConfig)) {
      return;
    }

    _fs.default.writeFileSync(this.gitIgnorePath, gitignoreContent + newContent);
  }

  getGitIgnoreContent() {
    if ((0, _utils.fileExists)(this.gitIgnorePath)) {
      return _fs.default.readFileSync(this.gitIgnorePath).toString().trim();
    }

    return '';
  }

  getProjectType(themePaths) {
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

  getThemePaths(cwd, subDirectory) {
    const themePaths = [];
    let typePath = '';

    if ((0, _utils.directoryExists)(_path.default.resolve(subDirectory || cwd, './web/app/themes'))) {
      typePath = 'web/app/themes';
    }

    if ((0, _utils.directoryExists)(_path.default.resolve(subDirectory || cwd, './wp-content/themes'))) {
      typePath = 'wp-content/themes';
    }

    if (typePath !== '') {
      const searchPath = subDirectory ? `./${_path.default.relative(cwd, subDirectory)}/${typePath}` : `./${typePath}`;
      const themeNames = (0, _utils.getDirectories)(searchPath);

      if (themeNames.length > 1) {
        themePaths.push(...themeNames.map(theme => `${searchPath}/${theme}/`));
      }

      return themePaths;
    }

    if (typeof subDirectory === 'undefined') {
      const dirs = (0, _utils.getDirectories)('./');
      const filteredDirs = dirs.filter(value => !['.git', '.github', 'node_modules', 'vendor', 'config'].includes(value));
      filteredDirs.some(element => {
        const newCwd = _path.default.resolve(`./${element}`);

        const paths = this.getThemePaths(cwd, newCwd);

        if (paths.length > 0) {
          themePaths.push(...paths);
        }

        return themePaths.length < 1;
      });
    }

    return themePaths;
  }

  getCleanPath(p) {
    return `${p.startsWith('/') ? '' : '/'}${p}${p.endsWith('/') ? '' : '/'}`;
  }

  getDevDependencies(projectConfig) {
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

  getBasePath(answers) {
    const p = answers.basePathList || answers.basePath;
    return p ? (0, _utils.getFormattedPath)(p, this.cwd) : './';
  }

  getCleanBasePath(answers) {
    return this.getBasePath(answers).replace(/^\.\//g, '');
  }

}

exports.Setup = Setup;

async function setup() {
  const cwd = (0, _utils.resolveCWD)({});
  const initiator = new Setup(cwd);

  try {
    const done = await initiator.startSetup();
    const useYarn = (0, _utils.installWithYarn)(done.projectConfig);
    const command = useYarn ? 'yarn' : 'npm';
    const add = useYarn ? 'add' : 'i';
    const devParam = useYarn ? '--dev' : '-D';
    const spinner = (0, _ora.default)({
      spinner: 'dots3',
      discardStdin: false
    });

    if (done && done.devDependencies.length) {
      spinner.start('installing dev dependencies may take a while');

      try {
        await (0, _execa.default)(command, [add, ...done.devDependencies, devParam]);
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