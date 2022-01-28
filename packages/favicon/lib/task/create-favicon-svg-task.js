"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaviconSvgTask = void 0;
const create_favicon_svg_stream_1 = require("../stream/create-favicon-svg-stream");
const createFaviconSvgTask = (srcGlobs, destFolder) => () => (0, create_favicon_svg_stream_1.createFaviconSvgStream)(srcGlobs, destFolder);
exports.createFaviconSvgTask = createFaviconSvgTask;
