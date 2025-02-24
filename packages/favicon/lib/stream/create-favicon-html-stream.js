"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaviconHtmlStream = void 0;
const gulp_1 = require("gulp");
const file_1 = require("../file");
const html_1 = require("../html");
const createFaviconHtmlStream = (destFolder, path) => (0, file_1.createStream)('favicon.html', (0, html_1.getHtml)(path))
    .pipe((0, gulp_1.dest)(destFolder));
exports.createFaviconHtmlStream = createFaviconHtmlStream;
