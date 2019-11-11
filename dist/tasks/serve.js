"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_sync_1 = __importDefault(require("browser-sync"));
const gulp_1 = require("gulp");
function default_1(config) {
    function startServer(done) {
        browser_sync_1.default.init(config);
        done();
    }
    return gulp_1.parallel(startServer);
}
exports.default = default_1;
