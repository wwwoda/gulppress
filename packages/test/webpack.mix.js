"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var laravel_mix_1 = __importDefault(require("laravel-mix"));
laravel_mix_1["default"]
    .setPublicPath('build')
    .ts('assets/scripts/main.ts', 'build/js');
if (process.env.npm_lifecycle_event !== 'hot') {
    laravel_mix_1["default"].version();
}
