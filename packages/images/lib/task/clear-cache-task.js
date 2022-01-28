"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClearImagesTask = void 0;
const gulp_cache_1 = __importDefault(require("gulp-cache"));
const createClearImagesTask = () => (done) => {
    gulp_cache_1.default.clearAll();
    done();
};
exports.createClearImagesTask = createClearImagesTask;
