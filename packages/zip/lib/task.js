"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTask = void 0;
const gulp_1 = require("gulp");
const utils_1 = require("@gulppress/utils");
const create_pot_file_task_1 = require("./task/create-pot-file-task");
const getTask = (config) => (0, gulp_1.series)((0, utils_1.addDisplayNameToTask)(config.displayName || 'create pot file', (0, create_pot_file_task_1.createPotFileTask)(config.src, config.dest, config.wpPotOptions)), (0, utils_1.getSuccessLogger)(config.displayName || 'translation'));
exports.getTask = getTask;
