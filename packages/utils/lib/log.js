"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = exports.getSuccessLogger = exports.getOnCompleteMessage = exports.isSilent = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fancy_log_1 = __importDefault(require("fancy-log"));
const task_1 = require("./task");
const isSilent = () => process.argv.includes('--silent');
exports.isSilent = isSilent;
const getOnCompleteMessage = (name) => `${(0, exports.isSilent)() ? '' : '\n\n'}✅  ==> ${chalk_1.default.green(name.toUpperCase())} completed${(0, exports.isSilent)() ? '' : '\n'}`;
exports.getOnCompleteMessage = getOnCompleteMessage;
const getSuccessLogger = (name) => (0, task_1.addDisplayNameToTask)(`${name}:success`, (done) => {
    (0, fancy_log_1.default)((0, exports.getOnCompleteMessage)(name));
    done();
});
exports.getSuccessLogger = getSuccessLogger;
const logError = (error) => {
    (0, fancy_log_1.default)(error);
};
exports.logError = logError;
