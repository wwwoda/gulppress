"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_error_1 = __importDefault(require("plugin-error"));
const through = __importStar(require("through2"));
const vinyl_1 = __importDefault(require("vinyl"));
const rename_1 = __importDefault(require("rename"));
const path_1 = __importDefault(require("path"));
const to_ico_1 = __importDefault(require("to-ico"));
const createIco = () => through.obj(function (file, 
// eslint-disable-next-line no-undef
_encoding, callback) {
    if (file.isNull()) {
        callback(null, file);
        return;
    }
    if (file.isStream()) {
        callback(new plugin_error_1.default('gulpppress-favicon', 'Streaming not supported'));
        return;
    }
    if (!file.isBuffer()) {
        callback(new plugin_error_1.default('gulpppress-favicon', 'Expected file to be a buffer.'));
    }
    const promise = (0, to_ico_1.default)(file.contents).then((buffer) => {
        const renameName = (0, rename_1.default)(file.relative, 'favicon.ico').toString();
        const filePath = path_1.default.join(file.base, renameName);
        this.push(new vinyl_1.default({
            cwd: file.cwd,
            base: file.base,
            path: filePath,
            contents: buffer,
        }));
    });
    promise.then(() => {
        callback();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, (err) => {
        callback(new plugin_error_1.default('gulpppress-favicon', err, { message: 'Error while transforming file' }));
    });
});
exports.default = createIco;
