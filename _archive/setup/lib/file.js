"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExists = void 0;
const fs_1 = __importDefault(require("fs"));
const fileExists = (file) => fs_1.default.existsSync(file);
exports.fileExists = fileExists;
