"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplatesHandler = void 0;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TemplatesHandler {
  static writeFiles(cwd, projectConfig) {
    TemplatesHandler.cwd = cwd;
    TemplatesHandler.projectConfig = projectConfig;
    TemplatesHandler.registerHelpers();
    TemplatesHandler.compileAndWriteFiles();
  }

  static registerHelpers() {
    const {
      projectConfig
    } = TemplatesHandler;

    _handlebars.default.registerHelper('if_feature', TemplatesHandler.getregisterHelperArrayFunction(projectConfig.features));

    _handlebars.default.registerHelper('if_task', TemplatesHandler.getregisterHelperArrayFunction(projectConfig.tasks));

    _handlebars.default.registerHelper('if_type', TemplatesHandler.getregisterHelperTextFunction(projectConfig.type));
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
    const {
      cwd,
      filenames,
      projectConfig,
      templatesPath
    } = TemplatesHandler;
    (0, _utils.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.config}.hbs`, _path.default.resolve(cwd, filenames.config), projectConfig);
    (0, _utils.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.localConfig}.hbs`, _path.default.resolve(cwd, filenames.localConfig), projectConfig);
    (0, _utils.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.gulpFile}.hbs`, _path.default.resolve(cwd, filenames.gulpFile)); // ESLint

    if (projectConfig.features.includes('eslint')) {
      (0, _utils.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.eslintConfig}.hbs`, _path.default.resolve(cwd, filenames.eslintConfig), projectConfig);
      (0, _utils.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.eslintIgnore}.hbs`, _path.default.resolve(cwd, filenames.eslintIgnore), projectConfig);
    } // Stylelint


    if (projectConfig.features.includes('stylelint')) {
      (0, _utils.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.stylelintConfig}.hbs`, _path.default.resolve(cwd, filenames.stylelintConfig));
    } // TypeScript


    if (projectConfig.features.includes('typescript')) {
      (0, _utils.compileAndWriteHandlebarsTemplate)(`${templatesPath}/${filenames.tsconfig}.hbs`, _path.default.resolve(cwd, filenames.tsconfig), projectConfig);
    }
  }

}

exports.TemplatesHandler = TemplatesHandler;

_defineProperty(TemplatesHandler, "cwd", void 0);

_defineProperty(TemplatesHandler, "projectConfig", void 0);

_defineProperty(TemplatesHandler, "filenames", {
  config: 'gulppress.config.ts',
  gitIgnore: '.gitignore',
  gulpFile: 'gulpfile.ts',
  localConfig: 'gulppress.local.config.ts',
  eslintIgnore: '.eslintignore',
  eslintConfig: '.eslintrc.js',
  stylelintConfig: '.stylelintrc.json',
  tsconfig: 'tsconfig.json'
});

_defineProperty(TemplatesHandler, "templatesPath", '../templates');