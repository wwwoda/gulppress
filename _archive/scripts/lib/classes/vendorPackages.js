"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VendorPackages = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _readPkgUp = _interopRequireDefault(require("read-pkg-up"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class VendorPackages {
  constructor() {
    _defineProperty(this, "src", []);

    _defineProperty(this, "versions", {});
  }

  addSource(src) {
    this.src.push(src);
  }

  addVersion(key, version) {
    this.versions[key] = version;
  }

  getSources() {
    return this.src;
  }

  getVersions() {
    return this.versions;
  }

  init(packages) {
    if (!packages) {
      return;
    }

    packages.forEach(pkg => {
      this.processPackageName(pkg);
    });
  }

  static getBaseName(baseName, pkgName) {
    return baseName !== 'index' ? baseName : `${pkgName}`;
  }

  processPackageName(pkgName) {
    const pkgPath = VendorPackages.getPackagePath(pkgName);

    if (!VendorPackages.isDirectory(pkgPath, pkgName)) {
      return;
    }

    const pkgJson = _readPkgUp.default.sync({
      cwd: pkgPath
    });

    if ((pkgJson === null || pkgJson === void 0 ? void 0 : pkgJson.packageJson.name) !== pkgName) {
      return;
    }

    const mainScriptPath = _path.default.resolve(pkgPath, VendorPackages.getMainScript(pkgJson));

    if (!VendorPackages.isFile(mainScriptPath, pkgName)) {
      return;
    }

    this.addSource(_path.default.relative(process.cwd(), mainScriptPath));

    if (pkgJson !== null && pkgJson !== void 0 && pkgJson.packageJson.version) {
      this.addVersion(`${VendorPackages.getBaseName(_path.default.basename(mainScriptPath, '.js'), pkgName)}.js`, pkgJson === null || pkgJson === void 0 ? void 0 : pkgJson.packageJson.version);
    }
  }

  static isDirectory(dirPath, pkgName) {
    try {
      return _fs.default.statSync(dirPath).isDirectory();
    } catch (error) {
      VendorPackages.handleDirectoryError(error, pkgName);
    }

    return false;
  }

  static isFile(filePath, pkgName) {
    try {
      return _fs.default.statSync(filePath).isFile();
    } catch (error) {
      VendorPackages.handleFileError(error, pkgName);
    }

    return false;
  }

  static getMainScript(pkgJson) {
    var _pkgJson$packageJson$;

    return (_pkgJson$packageJson$ = pkgJson.packageJson.main) !== null && _pkgJson$packageJson$ !== void 0 && _pkgJson$packageJson$.endsWith('.js') ? pkgJson.packageJson.main : `${pkgJson.packageJson.main || 'index'}.js`;
  }

  static getPackagePath(pkgName) {
    return _path.default.resolve(process.cwd(), './node_modules', `./${pkgName}/`);
  }

  static handleDirectoryError(error, pkg) {
    if (error.code === 'ENOENT') {
      console.log(_chalk.default.red(`Can't find package directory "${error.path}"`));
    } else {
      console.log(_chalk.default.red(`Error processing vendor package "${pkg}"`));
      console.log(error);
    }
  }

  static handleFileError(error, pkg) {
    if (error.code === 'ENOENT') {
      console.log(_chalk.default.red(`Can't find package file "${error.path}"`));
    } else {
      console.log(_chalk.default.red(`Error processing vendor package "${pkg}"`));
      console.log(error);
    }
  }

}

exports.VendorPackages = VendorPackages;