"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var hash_assets_webpack_plugin_1 = __importDefault(require("hash-assets-webpack-plugin"));
var vinyl_named_1 = __importDefault(require("vinyl-named"));
var gulp_notify_1 = __importDefault(require("gulp-notify"));
var gulp_plumber_1 = __importDefault(require("gulp-plumber"));
var uglifyjs_webpack_plugin_1 = __importDefault(require("uglifyjs-webpack-plugin"));
var webpack_merge_1 = __importDefault(require("webpack-merge"));
var webpack_stream_1 = __importDefault(require("webpack-stream"));
var utils_1 = require("../utils");
function default_1(config) {
    var webpackConfig = {
        watch: utils_1.getWatchers()['scripts'] === true,
        output: {
            path: config.dest,
            filename: '[name].js',
        },
        module: {
            rules: [{
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: [
                                            'last 2 version',
                                            '> 1%',
                                            'ie >= 11',
                                            'last 1 Android versions',
                                            'last 1 ChromeAndroid versions',
                                            'last 2 Chrome versions',
                                            'last 2 Firefox versions',
                                            'last 2 Safari versions',
                                            'last 2 iOS versions',
                                            'last 2 Edge versions',
                                            'last 2 Opera versions',
                                        ],
                                    },
                                ],
                                '@babel/typescript',
                            ],
                            plugins: [
                                '@babel/proposal-class-properties',
                                '@babel/proposal-object-rest-spread',
                            ],
                        },
                    },
                }],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        externals: {
            jquery: 'jQuery',
        },
        plugins: [
            new hash_assets_webpack_plugin_1.default({
                filename: config.assets,
                keyTemplate: function (filename) {
                    var match = /^(.*)\.(?!\.)(.*)$/.exec(filename);
                    if (match) {
                        return match[1] + "." + match[2];
                    }
                    return null;
                },
                prettyPrint: true,
            }),
        ],
        cache: {},
    };
    if (!utils_1.isDev()) {
        if (webpackConfig.plugins) {
            webpackConfig.plugins.push(new uglifyjs_webpack_plugin_1.default());
        }
    }
    function compileScripts() {
        return gulp_1.src(config.src)
            .pipe(gulp_plumber_1.default())
            .pipe(vinyl_named_1.default())
            .pipe(webpack_stream_1.default(webpack_merge_1.default({
            devtool: utils_1.isDev() ? 'inline-source-map' : false,
            mode: utils_1.isDev() ? 'development' : 'production',
        }, webpackConfig)).on('error', gulp_notify_1.default))
            .pipe(gulp_1.dest(config.dest));
    }
    return gulp_1.parallel(compileScripts);
}
exports.default = default_1;
