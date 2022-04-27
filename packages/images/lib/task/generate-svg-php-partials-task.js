"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenerateSvgPhpPartialsTask = void 0;
const generate_svg_php_partials_stream_1 = require("../stream/generate-svg-php-partials-stream");
const createGenerateSvgPhpPartialsTask = (input, destFolder, disableGulpChanged) => () => ((0, generate_svg_php_partials_stream_1.createGenerateSvgPhpPartialStream)(input, destFolder, disableGulpChanged));
exports.createGenerateSvgPhpPartialsTask = createGenerateSvgPhpPartialsTask;
