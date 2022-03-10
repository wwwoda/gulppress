"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTask = void 0;
const gulp_1 = require("gulp");
const utils_1 = require("@gulppress/utils");
const create_favicon_images_task_1 = require("./task/create-favicon-images-task");
const create_favicon_html_task_1 = require("./task/create-favicon-html-task");
const create_favicon_icon_task_1 = require("./task/create-favicon-icon-task");
const create_favicon_manifest_task_1 = require("./task/create-favicon-manifest-task");
const create_favicon_svg_task_1 = require("./task/create-favicon-svg-task");
const getDisplayName = (displayName) => displayName || 'favicon';
const getTask = (config) => {
    const tasks = [
        (0, utils_1.addDisplayNameToTask)(`${getDisplayName(config.displayName)}:create favicon.ico`, (0, create_favicon_icon_task_1.createFaviconIconTask)(config.src, config.dest)),
        (0, utils_1.addDisplayNameToTask)(`${getDisplayName(config.displayName)}:create favicon.svg`, (0, create_favicon_svg_task_1.createFaviconSvgTask)(config.src, config.dest)),
    ];
    if (config.manifest) {
        tasks.push((0, utils_1.addDisplayNameToTask)(`${getDisplayName(config.displayName)}:create manifest.json`, (0, create_favicon_manifest_task_1.createFaviconManifestTask)(config.dest, config.manifest)));
    }
    if (config.omitAppleTouchIcon !== true || config.manifest) {
        tasks.push((0, utils_1.addDisplayNameToTask)(`${getDisplayName(config.displayName)}:create icon.png(s)`, (0, create_favicon_images_task_1.createFaviconImagesTask)(config.src, config.dest, !config.omitAppleTouchIcon, !!config.manifest)));
    }
    if (config.omitHtml !== true) {
        tasks.push((0, utils_1.addDisplayNameToTask)(`${getDisplayName(config.displayName)}:create html code`, (0, create_favicon_html_task_1.createFaviconHtmlTask)(config.dest)));
    }
    return (0, gulp_1.series)((0, gulp_1.parallel)(...tasks), (0, utils_1.getSuccessLogger)(getDisplayName(config.displayName)));
};
exports.getTask = getTask;
