"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlushFunction = exports.createStats = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fancy_log_1 = __importDefault(require("fancy-log"));
const plugin_error_1 = __importDefault(require("plugin-error"));
const plur_1 = __importDefault(require("plur"));
const config_1 = require("./config");
const baseStates = {
    total: 0,
    matched: 0,
    created: 0,
    unmatched: 0,
    unmatchedBlocked: 0,
    unmatchedPassed: 0,
    matchedGlobs: [],
    unmatchedGlobs: [],
    skippedFiles: [],
    passedThroughFiles: [],
    incrementTotal(val) {
        this.total = val ? this.total + val : this.total + 1;
        return this;
    },
    incrementMatched(val) {
        this.matched = val ? this.total + val : this.total + 1;
        return this;
    },
    incrementCreated(val) {
        this.created = val ? this.total + val : this.total + 1;
        return this;
    },
    incrementUnmatched(val) {
        this.unmatched = val ? this.total + val : this.total + 1;
        return this;
    },
    incrementUnmatchedBlocked(val) {
        this.unmatchedBlocked = val ? this.total + val : this.total + 1;
        return this;
    },
    incrementUnmatchedPassed(val) {
        this.unmatchedPassed = val ? this.total + val : this.total + 1;
        return this;
    },
    markGlobsAsMatched(globs) {
        this.matchedGlobs = [...new Set([...this.matchedGlobs, ...globs])];
        this.unmatchedGlobs = this.unmatchedGlobs.filter((glob) => !globs.includes(glob));
        return this;
    },
    addSkippedFile(file) {
        this.skippedFiles.push(file);
        return this;
    },
    addPassedThroughFile(file) {
        this.passedThroughFiles.push(file);
        return this;
    },
};
const createStats = (configs) => ({
    ...baseStates,
    unmatchedGlobs: (0, config_1.extractGlobsFromConfigs)(configs),
});
exports.createStats = createStats;
const getFlushFunction = (stats, prefix, silent, showStats, errorOnUnusedConfig, type = 'file') => (callback) => {
    if (silent) {
        callback();
        return;
    }
    showStats && logStats(stats, prefix, type);
    if (stats.unmatchedGlobs.length < 1) {
        callback();
        return;
    }
    const message = `${prefix} => Unmatched globs:${globsToList(stats.unmatchedGlobs)}`;
    if (errorOnUnusedConfig) {
        // eslint-disable-next-line consistent-return
        return callback(new plugin_error_1.default(prefix, message));
    }
    (0, fancy_log_1.default)(message);
    callback();
};
exports.getFlushFunction = getFlushFunction;
const logStats = (stats, prefix, type = 'file') => {
    const str = stats.total > 1 ? 'images' : 'image';
    (0, fancy_log_1.default)(`${prefix} => Created ${stats.total} ${(0, plur_1.default)(type, stats.total)} (matched ${stats.matched} of ${stats.total} ${str})`);
    if (stats.skippedFiles.length > 0) {
        (0, fancy_log_1.default)(`${prefix} => Skipped ${(0, plur_1.default)(type, stats.skippedFiles.length)} (do not match any configs):${filesToList(stats.skippedFiles)}`);
    }
    if (stats.passedThroughFiles.length > 0) {
        (0, fancy_log_1.default)(`${prefix} => Passed through ${(0, plur_1.default)(type, stats.passedThroughFiles.length)} (do not match any configs):${filesToList(stats.passedThroughFiles)}`);
    }
};
const globsToList = (globs) => {
    if (!globs.length)
        return '';
    const join = '\n- ';
    const list = globs.map((glob) => chalk_1.default.yellow(glob)).join(join);
    return join + list;
};
const filesToList = (files) => {
    if (!files.length)
        return '';
    const join = '\n- ';
    const list = files.map((file) => chalk_1.default.blue(file.relative)).join(join);
    return join + list;
};
