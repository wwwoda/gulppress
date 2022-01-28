"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const size = (originalSize, neededSize) => {
    if (neededSize === undefined || neededSize === null) {
        return null;
    }
    if (typeof neededSize === 'string' && neededSize.indexOf('%') > -1) {
        const percentage = parseFloat(neededSize);
        if (Number.isNaN(percentage)) {
            throw new Error(`Wrong percentage size "${neededSize}"`);
        }
        return Math.round(originalSize * percentage * 0.01);
    }
    const newNeededSize = typeof neededSize === 'string' ? parseInt(neededSize, 10) : neededSize;
    if (Number.isNaN(newNeededSize)) {
        throw new Error(`Wrong size "${neededSize}"`);
    }
    return newNeededSize;
};
exports.default = size;
