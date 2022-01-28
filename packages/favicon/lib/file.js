"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStream = void 0;
const through = __importStar(require("through2"));
const vinyl_1 = __importDefault(require("vinyl"));
const createStream = (name, content) => {
    const vinylFile = new vinyl_1.default({
        path: name,
        contents: Buffer.from(content),
    });
    const stream = through.obj(function (_file, 
    // eslint-disable-next-line no-undef
    _encoding, callback) {
        this.push(vinylFile);
        return callback();
    });
    stream.write(vinylFile);
    stream.end();
    return stream;
};
exports.createStream = createStream;
