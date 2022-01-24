"use strict";
/* eslint-disable */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = exports.Setup = void 0;
const change_case_1 = require("change-case");
const execa_1 = __importDefault(require("execa"));
const fs_1 = __importDefault(require("fs"));
require("inquirer");
const ora_1 = __importDefault(require("ora"));
const path_1 = __importDefault(require("path"));
const yargs = __importStar(require("yargs"));
const inquirer_1 = require("./inquirer");
const packageJson_1 = require("./packageJson");
const templates_1 = require("./templates");
require("./interfaces");
const utils_1 = require("./utils");
const { argv } = yargs;
class SetupResolve {
    projectConfig;
    devDependencies;
    constructor(projectConfig, devDependencies) {
        this.projectConfig = projectConfig;
        this.devDependencies = devDependencies;
    }
}
class Setup {
    configPath;
    cwd;
    fileNameConfig = 'gulppress.config.ts';
    fileNameGitIgnore = '.gitignore';
    fileNameLocalConfig = 'gulppress.local.config.ts';
    gitIgnorePath;
    projectType;
    themePaths;
    constructor(cwd) {
        this.cwd = cwd;
        this.configPath = path_1.default.resolve(this.cwd, this.fileNameConfig);
        this.gitIgnorePath = path_1.default.resolve(this.cwd, this.fileNameGitIgnore);
        this.themePaths = this.getThemePaths(this.cwd);
        this.projectType = this.getProjectType(this.themePaths);
        packageJson_1.PackageJson.init(cwd);
    }
    async startSetup() {
        if (!argv.force && (0, utils_1.fileExists)(this.configPath)) {
            return Promise.reject(new Error('Project is already set up.'));
        }
        const projectConfig = await this.getProjectConfig();
        const devDependencies = this.getDevDependencies(projectConfig);
        templates_1.TemplatesHandler.writeFiles(this.cwd, projectConfig);
        packageJson_1.PackageJson.setup(projectConfig);
        // this.editGitIgnoreFile();
        return Promise.resolve(new SetupResolve(projectConfig, devDependencies));
    }
    async getProjectConfig() {
        return inquirer_1.Inquirer.getUserInput({
            name: packageJson_1.PackageJson.data.name,
            projectType: this.projectType,
            themePaths: this.themePaths,
        }).then((answers) => {
            const config = {
                projectName: answers.projectName,
                domain: (0, change_case_1.paramCase)(answers.projectName),
                type: answers.type,
                basePath: this.getBasePath(answers),
                basePathClean: this.getCleanBasePath(answers),
                projectURL: answers.projectURL,
                tasks: answers.tasks,
                features: answers.features,
                dotEnv: answers.dotEnv,
                dotEnvPath: answers.dotEnvPath
                    ? (0, utils_1.getFormattedPath)(path_1.default.relative(this.cwd, answers.dotEnvPath), this.cwd) : '',
                createSeparateMinFiles: answers.createSeparateMinFiles,
                useYarn: answers.useYarn,
                environment: answers.dotEnvPath
                    ? null : "\n    environment: 'development',",
                srcPath: this.getCleanPath(answers.srcPath),
                distPath: this.getCleanPath(answers.distPath),
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
        fs_1.default.writeFileSync(this.gitIgnorePath, gitignoreContent + newContent);
    }
    getGitIgnoreContent() {
        if ((0, utils_1.fileExists)(this.gitIgnorePath)) {
            return fs_1.default.readFileSync(this.gitIgnorePath).toString().trim();
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
        if ((0, utils_1.directoryExists)(path_1.default.resolve(subDirectory || cwd, './web/app/themes'))) {
            typePath = 'web/app/themes';
        }
        if ((0, utils_1.directoryExists)(path_1.default.resolve(subDirectory || cwd, './wp-content/themes'))) {
            typePath = 'wp-content/themes';
        }
        if (typePath !== '') {
            const searchPath = subDirectory
                ? `./${path_1.default.relative(cwd, subDirectory)}/${typePath}`
                : `./${typePath}`;
            const themeNames = (0, utils_1.getDirectories)(searchPath);
            if (themeNames.length > 1) {
                themePaths.push(...themeNames.map((theme) => `${searchPath}/${theme}/`));
            }
            return themePaths;
        }
        if (typeof subDirectory === 'undefined') {
            const dirs = (0, utils_1.getDirectories)('./');
            const filteredDirs = dirs.filter((value) => ![
                '.git',
                '.github',
                'node_modules',
                'vendor',
                'config',
            ].includes(value));
            filteredDirs.some((element) => {
                const newCwd = path_1.default.resolve(`./${element}`);
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
        return p ? (0, utils_1.getFormattedPath)(p, this.cwd) : './';
    }
    getCleanBasePath(answers) {
        return this.getBasePath(answers).replace(/^\.\//g, '');
    }
}
exports.Setup = Setup;
async function setup() {
    const cwd = (0, utils_1.resolveCWD)({});
    const initiator = new Setup(cwd);
    try {
        const done = await initiator.startSetup();
        const useYarn = (0, utils_1.installWithYarn)(done.projectConfig);
        const command = useYarn ? 'yarn' : 'npm';
        const add = useYarn ? 'add' : 'i';
        const devParam = useYarn ? '--dev' : '-D';
        const spinner = (0, ora_1.default)({ spinner: 'dots3', discardStdin: false });
        if (done && done.devDependencies.length) {
            spinner.start('installing dev dependencies may take a while');
            try {
                await (0, execa_1.default)(command, [
                    add,
                    ...done.devDependencies,
                    devParam,
                ]);
                spinner.succeed('done installing dev dependencies\n');
            }
            catch (error) {
                spinner.fail('could not install all dev dependencies');
                console.log(error);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    console.log('done');
}
exports.setup = setup;
