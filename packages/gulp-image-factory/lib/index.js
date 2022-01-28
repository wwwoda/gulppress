"use strict";
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_error_1 = __importDefault(require("plugin-error"));
const through2 = __importStar(require("through2"));
const gulp_plugin_utils_1 = require("@gulppress/gulp-plugin-utils");
const sharp_1 = require("./sharp");
const format_1 = require("./format");
__exportStar(require("./types"), exports);
exports.default = (configs, customOptions) => {
    const stats = (0, gulp_plugin_utils_1.createStats)(configs);
    const options = {
        name: '@gulppress/gulp-image-factory',
        ...gulp_plugin_utils_1.defaultOptions,
        ...customOptions,
    };
    const { name } = options;
    return through2.obj(function (file, 
    // eslint-disable-next-line no-undef
    _encoding, callback) {
        if (file.isNull()) {
            callback(null, file);
            return;
        }
        if (file.isStream()) {
            callback(new plugin_error_1.default(name, 'Streaming not supported'));
            return;
        }
        if (!file.isBuffer()) {
            callback(new plugin_error_1.default(name, 'Expected file to be a buffer.'));
        }
        const bufferFile = file;
        const matchingConfigs = (0, gulp_plugin_utils_1.filterMatchingConfigs)(this, bufferFile, configs, stats, options);
        if (!Array.isArray(matchingConfigs)) {
            callback(matchingConfigs);
            return;
        }
        const promises = getPromises(this, bufferFile, matchingConfigs, stats);
        Promise.all(promises).then(() => {
            callback();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, (err) => {
            callback(new plugin_error_1.default(name, err, { message: 'Error while transforming file' }));
        });
    }, (0, gulp_plugin_utils_1.getFlushFunction)(stats, name, options.silent, options.stats, options.errorOnUnusedConfig, 'image'));
};
const getPromises = (transform, file, configs, stats) => configs.flatMap((config) => {
    const toFormats = (0, format_1.getFormatsFromConfig)(file, config);
    const images = toFormats.map((format) => {
        const image = (0, sharp_1.createSharp)(file, config, format);
        return [image, format];
    });
    const filePath = (0, gulp_plugin_utils_1.getFilePath)(file, config.rename || {});
    stats.incrementTotal(images.length);
    return images.map((combo) => {
        const [image, format] = combo;
        return image.toBuffer().then((buffer) => {
            transform.push((0, gulp_plugin_utils_1.createFile)(file, buffer, format, filePath));
            return buffer;
        });
    });
});
