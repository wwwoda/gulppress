"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyFileSync = copyFileSync;
exports.resolveCWD = resolveCWD;
exports.isYarn = isYarn;
exports.installWithYarn = installWithYarn;
exports.getFileContent = getFileContent;
exports.fileExists = fileExists;
exports.directoryExists = directoryExists;
exports.getDirectories = getDirectories;
exports.compileAndWriteHandlebarsTemplate = compileAndWriteHandlebarsTemplate;
exports.getFormattedPath = getFormattedPath;

var _findUp = _interopRequireDefault(require("find-up"));

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let isYarnCache = null;

function getTargetFilePath(source, target) {
  if (_fs.default.existsSync(target)) {
    if (_fs.default.lstatSync(target).isDirectory()) {
      return _path.default.join(target, _path.default.basename(source));
    }
  }

  return target;
}

function copyFileSync(source, target) {
  _fs.default.writeFileSync(getTargetFilePath(source, target), _fs.default.readFileSync(source));
}
/**
 * Resolve `cwd`, a.k.a, current working directory or context from user input.
 * It takes into account the `--context [path]` option from CLI and uses process
 * cwd, if not provided.
 *
 * @param options Options as received from CLI
 */


function resolveCWD(options) {
  let cwd = process.cwd(); // If user has provided cwd, then use that instead

  if (options && options.context) {
    const {
      context
    } = options;

    if (_path.default.isAbsolute(options.context)) {
      cwd = context;
    } else {
      cwd = _path.default.resolve(cwd, context);
    }
  }

  return cwd;
}

function isYarn() {
  const cwd = process.cwd();

  if (isYarnCache !== null) {
    return isYarnCache;
  }

  try {
    isYarnCache = _findUp.default.sync('yarn.lock', {
      cwd
    }) != null;
    return isYarnCache;
  } catch (_) {
    isYarnCache = false;
    return isYarnCache;
  }
}

function installWithYarn(config) {
  if (typeof config !== 'undefined') {
    return config.useYarn || isYarn();
  }

  return isYarn();
}

function getFileContent(filePath) {
  return _fs.default.readFileSync(_path.default.resolve(__dirname, filePath)).toString();
}

function fileExists(filePath) {
  try {
    return _fs.default.statSync(filePath).isFile();
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }

    throw error;
  }
}

function directoryExists(directoryPath) {
  try {
    return _fs.default.statSync(directoryPath).isDirectory();
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }

    throw error;
  }
}

function getDirectories(source) {
  return _fs.default.readdirSync(source, {
    withFileTypes: true
  }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
}

function compileAndWriteHandlebarsTemplate(source, target, config) {
  const templateContent = getFileContent(source);

  const compiler = _handlebars.default.compile(templateContent);

  _fs.default.writeFileSync(target, compiler(config));
}

function getFormattedPath(source, cwd) {
  const relativePath = _path.default.relative(cwd, source);

  if (!relativePath.startsWith('./') || !relativePath.startsWith('../')) {
    return `./${relativePath}`;
  }

  return relativePath;
}