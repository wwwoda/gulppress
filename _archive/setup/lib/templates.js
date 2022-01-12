"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesHandler = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
require("./interfaces");
class TemplatesHandler {
    static cwd;
    static projectConfig;
    static filenames = {
        config: 'gulppress.config.ts',
        gitIgnore: '.gitignore',
        gulpFile: 'gulpfile.ts',
        localConfig: 'gulppress.local.config.ts',
        eslintIgnore: '.eslintignore',
        eslintConfig: '.eslintrc.js',
        stylelintConfig: '.stylelintrc.json',
        tsconfig: 'tsconfig.json',
    };
    static templatesPath = '../templates';
    static writeFiles(cwd, projectConfig) {
        TemplatesHandler.cwd = cwd;
        TemplatesHandler.projectConfig = projectConfig;
        TemplatesHandler.registerHelpers();
        TemplatesHandler.compileAndWriteFiles();
    }
    static registerHelpers() {
        const { projectConfig } = TemplatesHandler;
        handlebars_1.default.registerHelper('if_feature', TemplatesHandler.getregisterHelperArrayFunction(projectConfig.features));
        handlebars_1.default.registerHelper('if_task', TemplatesHandler.getregisterHelperArrayFunction(projectConfig.tasks));
        handlebars_1.default.registerHelper('if_type', TemplatesHandler.getregisterHelperTextFunction(projectConfig.type));
    }
    static getregisterHelperTextFunction(value) {
        // eslint-disable-next-line func-names
        return function (search, options) {
            if (value === search) {
                return options.fn(this);
            }
            return options.inverse(this);
        };
    }
    static getregisterHelperArrayFunction(values) {
        // eslint-disable-next-line func-names
        return function (search, options) {
            if (values.includes(search)) {
                return options.fn(this);
            }
            return options.inverse(this);
        };
    }
    static compileAndWriteFiles() {
        const { cwd, filenames, projectConfig, templatesPath, } = TemplatesHandler;
        (0, utils_1.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.config}.hbs`, path_1.default.resolve(cwd, filenames.config), projectConfig);
        (0, utils_1.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.localConfig}.hbs`, path_1.default.resolve(cwd, filenames.localConfig), projectConfig);
        (0, utils_1.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.gulpFile}.hbs`, path_1.default.resolve(cwd, filenames.gulpFile));
        // ESLint
        if (projectConfig.features.includes('eslint')) {
            (0, utils_1.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.eslintConfig}.hbs`, path_1.default.resolve(cwd, filenames.eslintConfig), projectConfig);
            (0, utils_1.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.eslintIgnore}.hbs`, path_1.default.resolve(cwd, filenames.eslintIgnore), projectConfig);
        }
        // Stylelint
        if (projectConfig.features.includes('stylelint')) {
            (0, utils_1.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.stylelintConfig}.hbs`, path_1.default.resolve(cwd, filenames.stylelintConfig));
        }
        // TypeScript
        if (projectConfig.features.includes('typescript')) {
            (0, utils_1.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.tsconfig}.hbs`, path_1.default.resolve(cwd, filenames.tsconfig), projectConfig);
        }
    }
}
exports.TemplatesHandler = TemplatesHandler;
