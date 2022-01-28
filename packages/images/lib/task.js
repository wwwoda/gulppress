"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClearImagesCacheTask = exports.getTask = void 0;
const gulp_1 = require("gulp");
const utils_1 = require("@gulppress/utils");
const generate_svg_php_partials_stream_1 = require("./stream/generate-svg-php-partials-stream");
const process_images_stream_1 = require("./stream/process-images-stream");
const clear_cache_task_1 = require("./task/clear-cache-task");
const getDisplayName = (displayName) => displayName || 'images';
const getTask = (config) => (0, gulp_1.series)((0, utils_1.addDisplayNameToTask)(config.destPhpPartials
    ? `${getDisplayName(config.displayName)}:process images and generate php partials`
    : `${getDisplayName(config.displayName)}:process images`, (done) => {
    const imagesStream = (0, process_images_stream_1.createProcessImagesStream)(config.src, config.dest, config.imageMinOptions, config.imageFactoryConfigs, config.imageFactoryOptions, `${getDisplayName(config.displayName)} => process images`);
    if (config.destPhpPartials) {
        const svgStream = (0, generate_svg_php_partials_stream_1.createGenerateSvgPhpPartialStream)(imagesStream, config.destPhpPartials);
        svgStream.on('end', done);
        return;
    }
    imagesStream.on('end', done);
}), (0, utils_1.getSuccessLogger)(getDisplayName(config.displayName)));
exports.getTask = getTask;
const getClearImagesCacheTask = () => (0, utils_1.addDisplayNameToTask)('clear-cache', (0, clear_cache_task_1.createClearImagesTask)());
exports.getClearImagesCacheTask = getClearImagesCacheTask;
