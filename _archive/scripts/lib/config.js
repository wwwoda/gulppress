"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocalConfig = getLocalConfig;
exports.getMainConfig = getMainConfig;
exports.getConfig = getConfig;
exports.loadEnv = loadEnv;

var _fs = require("fs");

var _path = require("path");

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getLocalConfig(path) {
  try {
    return require(path);
  } catch (e) {
    return {};
  }
}

function getMainConfig(path) {
  let config;

  try {
    config = require(path);
  } catch (e) {
    console.error(`${_chalk.default.bgRed.white('Stopping GulpPress')} \
${_chalk.default.red(`Main config not found at "${path}"`)}`);
    process.exit(1);
  }

  return config;
}

function getConfig(dirname, mainConfigPath, localConfigPath) {
  const mainConfig = getMainConfig((0, _path.resolve)(dirname, mainConfigPath));
  const localConfig = localConfigPath ? getLocalConfig((0, _path.resolve)(dirname, localConfigPath)) : {};

  const config = _objectSpread(_objectSpread({}, mainConfig), localConfig);

  const {
    base,
    scripts,
    styles
  } = config; // Make sure the scripts dest path is absolute

  if (scripts && scripts.dest) {
    scripts.dest = (0, _path.resolve)(base.dirname, scripts.dest);
  } // Make sure the styles dest path is relative to the current path


  if (styles && styles.dest) {
    styles.dest = (0, _path.relative)(base.dirname, styles.dest);
  }

  loadEnv(base.dirname, base.envFile);
  return config;
}

function loadEnv(dirname, envFile) {
  if (envFile) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodeEnvFile = require('node-env-file');

    try {
      const envPath = (0, _path.resolve)(dirname, envFile);

      if ((0, _fs.existsSync)(envPath)) {
        nodeEnvFile(envPath, {
          raise: false
        });
      }
    } catch (err) {
      console.error(_chalk.default.bgRed('.env file not found, please check your configuration'));
    }
  }
}