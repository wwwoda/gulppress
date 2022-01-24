#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const fancy_log_1 = __importDefault(require("fancy-log"));
const _setup_1 = require("./_setup");
const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = parseInt(semver[0], 10);
// If below Node 8.
if (major < 12) {
    // eslint-disable-next-line  no-console
    fancy_log_1.default.error(chalk_1.default.red(`GulpPress requires Node 12 or higher while you are running Node ${currentNodeVersion}\n
    //   Please update your version of Node.`));
    process.exit(1);
}
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
    throw err;
});
/**
 * Run the entire program.
 *
 * Runs all the functions with async/await.
 */
(0, _setup_1.setup)();
