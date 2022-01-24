"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PackageJson = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PackageJson {
  static init(cwd) {
    PackageJson.packageJsonPath = _path.default.resolve(cwd, PackageJson.fileNamePackageJson);
    PackageJson.data = PackageJson.readPackageData();
    PackageJson.preparePackage();
    return PackageJson.data;
  }

  static setup(projectConfig) {
    PackageJson.addMissingTasks();

    if (!PackageJson.data.name) {
      PackageJson.data.name = projectConfig.projectName;
    }

    PackageJson.writePackageJsonFile();
    return PackageJson.data;
  }

  static readPackageData() {
    const {
      packageJsonPath
    } = PackageJson;
    return (0, _utils.fileExists)(packageJsonPath) // eslint-disable-next-line global-require
    ? require(packageJsonPath) : {
      name: ''
    };
  }

  static preparePackage() {
    const {
      data
    } = PackageJson;

    if (!data.scripts) {
      data.scripts = {};
    }
  }

  static addMissingTasks() {
    const {
      data,
      tasks
    } = PackageJson;
    Object.keys(tasks).forEach(task => {
      if (data.scripts[task] && data.scripts[task] !== tasks[task]) {
        PackageJson.data.scripts[`${task}-backup`] = data.scripts[task];
        PackageJson.data.scripts[task] = tasks[task];
      } else {
        PackageJson.data.scripts[task] = tasks[task];
      }
    });
  }

  static writePackageJsonFile() {
    const {
      data,
      packageJsonPath
    } = PackageJson;

    _fs.default.writeFileSync(packageJsonPath, JSON.stringify(data, null, 2));
  }

}

exports.PackageJson = PackageJson;

_defineProperty(PackageJson, "data", void 0);

_defineProperty(PackageJson, "fileNamePackageJson", 'package.json');

_defineProperty(PackageJson, "packageJsonPath", void 0);

_defineProperty(PackageJson, "tasks", {
  dev: 'npm run development',
  development: 'cross-env NODE_ENV=development gulp development',
  serve: 'npm run watch',
  watch: 'cross-env NODE_ENV=development gulp development --watch=scripts,styles',
  prod: 'npm run build',
  production: 'npm run build',
  build: 'cross-env NODE_ENV=production gulp build'
});