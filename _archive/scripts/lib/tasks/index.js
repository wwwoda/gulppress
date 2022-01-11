"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.vendorScripts = exports.translate = exports.styles = exports.scripts = exports.images = exports.icons = exports.fonts = exports.favicon = exports.dev = exports.clean = exports.bustCache = exports.build = exports.browserSync = exports.assets = void 0;

var _assets = _interopRequireWildcard(require("./assets"));

exports.assets = _assets;

var _browserSync = _interopRequireWildcard(require("./browserSync"));

exports.browserSync = _browserSync;

var _build = _interopRequireWildcard(require("./build"));

exports.build = _build;

var _bustCache = _interopRequireWildcard(require("./utils/bustCache"));

exports.bustCache = _bustCache;

var _clean = _interopRequireWildcard(require("./clean"));

exports.clean = _clean;

var _dev = _interopRequireWildcard(require("./dev"));

exports.dev = _dev;

var _favicon = _interopRequireWildcard(require("./favicon"));

exports.favicon = _favicon;

var _fonts = _interopRequireWildcard(require("./fonts"));

exports.fonts = _fonts;

var _icons = _interopRequireWildcard(require("./icons"));

exports.icons = _icons;

var _images = _interopRequireWildcard(require("./images"));

exports.images = _images;

var _scripts = _interopRequireWildcard(require("./scripts"));

exports.scripts = _scripts;

var _styles = _interopRequireWildcard(require("./styles"));

exports.styles = _styles;

var _translate = _interopRequireWildcard(require("./translate"));

exports.translate = _translate;

var _vendorScripts = _interopRequireWildcard(require("./vendorScripts"));

exports.vendorScripts = _vendorScripts;

var _watch = _interopRequireWildcard(require("./watch"));

exports.watch = _watch;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }