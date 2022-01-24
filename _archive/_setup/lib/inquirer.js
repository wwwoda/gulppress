"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Inquirer = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const nodeEnvFile = require('node-env-file');

class Inquirer {
  static async getUserInput(config) {
    const questions = [{
      type: 'list',
      name: 'type',
      message: 'Type of project',
      choices: ['theme', 'plugin', 'bedrock'],
      default: () => config.projectType
    }, {
      type: 'input',
      name: 'projectName',
      message: 'Project name',
      default: config.name || ''
    }, {
      type: 'list',
      name: 'basePathList',
      message: 'Select your theme\'s directory',
      when: answers => answers.type !== 'plugin' && config.themePaths.length > 1,
      choices: () => {
        config.themePaths.push(Inquirer.enterManuallyText);
        return config.themePaths;
      }
    }, {
      type: 'input',
      name: 'basePath',
      message: answers => `Enter your ${answers.type === 'plugin' ? 'plugin' : 'theme'}'s directory`,
      validate: input => {
        if (input === '' || input.slice(-1) === '/') {
          return true;
        }

        return 'Path should end with "/" or be left empty if gulppress is set up inside the plugin/theme folder!';
      },
      when: answers => !answers.basePathList || answers.basePathList === Inquirer.enterManuallyText,
      default: './'
    }, {
      type: 'checkbox',
      name: 'tasks',
      message: 'Select tasks GulpPress should take care of',
      pageSize: 99,
      choices: answers => [{
        name: 'Scripts',
        value: 'scripts',
        checked: true
      }, {
        name: 'Styles',
        value: 'styles',
        checked: true
      }, {
        name: 'Browsersync test server',
        value: 'browserSync',
        checked: answers.type !== 'plugin'
      }, {
        name: 'Favicon',
        value: 'favicon',
        checked: answers.type !== 'plugin'
      }, {
        name: 'Fonts',
        value: 'fonts',
        checked: answers.type !== 'plugin'
      }, {
        name: 'Icons',
        value: 'icons',
        checked: answers.type !== 'plugin'
      }, {
        name: 'Images',
        value: 'images',
        checked: answers.type !== 'plugin'
      }, {
        name: 'Translation',
        value: 'translation',
        checked: answers.type !== 'plugin'
      }, {
        name: 'Vendor Scripts',
        value: 'vendorScripts',
        checked: answers.type !== 'plugin'
      }]
    }, {
      type: 'checkbox',
      name: 'features',
      message: 'Enable/Disable features',
      pageSize: 99,
      when: answers => answers.tasks.includes('scripts') || answers.tasks.includes('styles'),
      choices: answers => {
        const features = [];

        if (answers.tasks.includes('scripts')) {
          features.push(...[{
            name: 'TypeScripts',
            value: 'typescript',
            checked: true
          }, {
            name: 'ESLint',
            value: 'eslint',
            checked: true
          }]);
        }

        if (answers.tasks.includes('styles')) {
          features.push({
            name: 'Stylelint',
            value: 'stylelint',
            checked: true
          });
        }

        return features;
      }
    }, {
      type: 'confirm',
      name: 'dotEnv',
      message: 'Do you use a working environment file (eg .env)?',
      when: answers => answers.type !== 'plugin',
      default: answers => answers.type === 'bedrock'
    }, {
      type: 'input',
      name: 'dotEnvPath',
      message: 'Path to your working environment file',
      when: answers => answers.dotEnv || answers.type === 'bedrock',
      validate: input => {
        if (_fs.default.existsSync(input)) {
          return true;
        }

        return 'No working environment file found at this location. Please create one to continue.';
      },
      default: './.env'
    }, {
      type: 'input',
      name: 'projectURL',
      message: 'URL of your local WordPress site',
      when: answers => answers.type !== 'plugin',
      default: answers => {
        if (answers.dotEnvPath) {
          nodeEnvFile(answers.dotEnvPath, {
            raise: false
          });
          return process.env.WP_HOME || '';
        }

        return '';
      }
    }, {
      type: 'input',
      name: 'srcPath',
      message: answers => `Source folder path relative to your ${answers.type === 'plugin' ? 'plugin' : 'theme'}`,
      default: '/ressources/assets/'
    }, {
      type: 'input',
      name: 'distPath',
      message: answers => `Output folder path relative to your ${answers.type === 'plugin' ? 'plugin' : 'theme'}`,
      default: '/assets/'
    }, {
      type: 'confirm',
      name: 'createSeparateMinFiles',
      message: 'Create separate .min files for scripts and styles?',
      default: false
    }, {
      type: 'confirm',
      name: 'useYarn',
      message: 'Install dependencies with yarn instead of npm (yarn needs to be installed globally)?',
      when: !(0, _utils.isYarn)()
    }];
    return _inquirer.default.prompt(questions);
  }

}

exports.Inquirer = Inquirer;

_defineProperty(Inquirer, "enterManuallyText", '>>> Enter manually');