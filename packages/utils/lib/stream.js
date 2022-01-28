"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStream = void 0;
const gulp_1 = require("gulp");
const createStream = (input, options) => {
    if (typeof input === 'string' || Array.isArray(input)) {
        return (0, gulp_1.src)(input, options);
    }
    return input;
};
exports.createStream = createStream;
