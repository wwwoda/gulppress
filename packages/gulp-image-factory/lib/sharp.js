"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSharp = void 0;
const sharp_1 = __importDefault(require("sharp"));
const createSharp = (file, config, format) => {
    const image = (0, sharp_1.default)(file.contents, {});
    // Resizing images
    config.extractBeforeResize && image.extract(config.extractBeforeResize);
    config.resize && image.resize(null, null, config.resize);
    config.extractAfterResize && image.extract(config.extractAfterResize);
    config.trim && image.trim(config.trim);
    config.extend && image.extend(config.extend);
    // Image operations
    config.rotate && image.rotate(config.rotate.angle, config.rotate.options);
    config.flip && image.flip(config.flip);
    config.flop && image.flop(config.flop);
    config.sharpen && image.sharpen(config.sharpen.sigma, config.sharpen.flat, config.sharpen.jagged);
    config.median && image.median(config.median);
    config.blur && image.blur(config.blur);
    config.flatten && image.flatten(config.flatten);
    config.gamma && image.gamma(config.gamma);
    config.negate && image.negate(config.negate);
    config.normalise && image.normalise(config.normalise);
    config.normalize && image.normalize(config.normalize);
    config.clahe && image.clahe(config.clahe);
    config.convolve && image.convolve(config.convolve);
    config.threshold && image.threshold(config.threshold.threshold, config.threshold.options);
    config.boolean && image.boolean(config.boolean.operand, config.boolean.operator, config.boolean.options);
    config.linear && image.linear(config.linear.a, config.linear.b);
    config.recomb && image.recomb(config.recomb);
    config.modulate && image.modulate(config.modulate);
    // Colour Manipulations
    config.tint && image.tint(config.tint);
    config.greyscale && image.greyscale(config.greyscale);
    config.grayscale && image.grayscale(config.grayscale);
    config.toColourspace && image.toColourspace(config.toColourspace);
    config.toColorspace && image.toColorspace(config.toColorspace);
    return convertImageToFormat(image, format);
};
exports.createSharp = createSharp;
const convertImageToFormat = (image, format, options = {}) => {
    const clone = image.clone();
    switch (format) {
        case 'jpeg':
            return clone.jpeg(options.jpeg);
        case 'png':
            return clone.png(options.png);
        case 'webp':
            return clone.webp(options.webp);
        case 'gif':
            return clone.gif(options.gif);
        case 'avif':
            return clone.avif(options.avif);
        case 'heif':
            return clone.heif(options.heif);
        case 'tiff':
            return clone.tiff(options.tiff);
        case 'raw':
            return clone.raw(options.raw);
        default:
            return clone;
    }
};
