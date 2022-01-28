"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProcessFontsTask = void 0;
const process_fonts_stream_1 = require("../stream/process-fonts-stream");
const createProcessFontsTask = (srcGlobs, destFolder, factoryConfigs, factoryOptions, displayName) => () => (0, process_fonts_stream_1.createProcessFontsStream)(srcGlobs, destFolder, factoryConfigs, factoryOptions, displayName);
exports.createProcessFontsTask = createProcessFontsTask;
