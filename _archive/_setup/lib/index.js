#!/usr/bin/env node
"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

var _setup = require("./setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = parseInt(semver[0], 10); // If below Node 8.

if (major < 12) {
  // eslint-disable-next-line  no-console
  console.error(_chalk.default.red(`GulpPress requires Node 12 or higher while you are running Node ${currentNodeVersion}\n
    //   Please update your version of Node.`));
  process.exit(1);
} // Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.


process.on('unhandledRejection', err => {
  throw err;
});
/**
 * Run the entire program.
 *
 * Runs all the functions with async/await.
 */

(0, _setup.setup)();