"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractGlobsFromConfigs = exports.isMatch = exports.getMatchingConfigsForFile = exports.handleUnmatchedFile = exports.filterMatchingConfigs = void 0;
const picomatch_1 = __importDefault(require("picomatch"));
const plugin_error_1 = __importDefault(require("plugin-error"));
const chalk_1 = __importDefault(require("chalk"));
const options_1 = require("./options");
const filterMatchingConfigs = (transform, file, configs, stats, customOptions) => {
    const options = {
        ...options_1.defaultOptions,
        ...customOptions,
    };
    stats.incrementTotal();
    const matchedConfigs = (0, exports.getMatchingConfigsForFile)(file, configs, stats);
    if (matchedConfigs.length === 0) {
        return (0, exports.handleUnmatchedFile)(transform, file, stats, options);
    }
    if (options.passThroughMatched) {
        transform.push(file);
    }
    stats.incrementMatched();
    return matchedConfigs;
};
exports.filterMatchingConfigs = filterMatchingConfigs;
const handleUnmatchedFile = (transform, file, stats, customOptions) => {
    const options = {
        ...options_1.defaultOptions,
        ...customOptions,
    };
    stats.incrementUnmatched();
    const message = `${chalk_1.default.blue(file.relative)} (does not match any config)`;
    if (options.errorOnUnmatchedFile) {
        return new plugin_error_1.default(options.name, message);
    }
    if (options.passThroughUnmatched) {
        transform.push(file);
        stats.incrementUnmatchedPassed();
        if (!options.silent) {
            stats.addPassedThroughFile(file);
            // log(`${options.name} => pass through without changes: ${message}`);
        }
        return null;
    }
    stats.incrementUnmatchedBlocked();
    if (!options.silent) {
        // log(`${options.name} => skip for processing: ${message}`);
        stats.addSkippedFile(file);
    }
    return null;
};
exports.handleUnmatchedFile = handleUnmatchedFile;
const getMatchingConfigsForFile = (file, configs, stats) => {
    if (Array.isArray(configs)) {
        return configs;
    }
    const matchedConfigs = [];
    const globs = [];
    Object.keys(configs).forEach((glob) => {
        if (!(0, exports.isMatch)(file, glob))
            return;
        globs.push(glob);
        const config = configs[glob];
        matchedConfigs.push(...(Array.isArray(config) ? config : [config]));
    });
    stats.markGlobsAsMatched(globs);
    return matchedConfigs;
};
exports.getMatchingConfigsForFile = getMatchingConfigsForFile;
const isMatch = (file, glob) => {
    const options = glob.includes('/') ? {} : { basename: true };
    return picomatch_1.default.isMatch(file.path, glob, options);
};
exports.isMatch = isMatch;
const extractGlobsFromConfigs = (configs) => (Array.isArray(configs) ? [] : Object.keys(configs));
exports.extractGlobsFromConfigs = extractGlobsFromConfigs;
