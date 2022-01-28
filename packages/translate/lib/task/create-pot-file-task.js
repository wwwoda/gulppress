"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPotFileTask = void 0;
const create_pot_file_stream_1 = require("../stream/create-pot-file-stream");
const createPotFileTask = (srcGlobs, destFolder, wpPotOptions = {}) => () => (0, create_pot_file_stream_1.createPotFileStream)(srcGlobs, destFolder, wpPotOptions);
exports.createPotFileTask = createPotFileTask;
