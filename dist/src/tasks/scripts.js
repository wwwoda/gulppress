"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const webpack_merge_1 = __importDefault(require("webpack-merge"));
const webpack_stream_1 = __importDefault(require("webpack-stream"));
const utils_1 = require("../utils");
const HashAssetsPlugin = require('hash-assets-webpack-plugin');
const named = require('vinyl-named');
const notify = require('gulp-notify');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
function default_1(config, project) {
    const source = {};
    if (Array.isArray(config.src)) {
        config.src.forEach((entry) => {
            glob_1.default.sync(entry).forEach((result) => {
                const extension = path_1.default.extname(result);
                const file = path_1.default.basename(result, extension);
                source[file] = result;
                if (project.createSeparateMinFiles) {
                    source[`${file}.min`] = result;
                }
            });
        });
    }
    else {
        glob_1.default.sync(config.src).forEach((result) => {
            const extension = path_1.default.extname(result);
            const file = path_1.default.basename(result, extension);
            source[file] = result;
            if (project.createSeparateMinFiles) {
                source[`${file}.min`] = result;
            }
        });
    }
    const webpackConfig = {
        watch: utils_1.getWatchers().scripts === true,
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
                                        targets: config.targets,
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
            new HashAssetsPlugin({
                filename: '.assets.json',
                keyTemplate: (filename) => {
                    const match = /^(.*)\.(?!\.)(.*)$/.exec(filename);
                    if (match) {
                        return `${match[1]}.${match[2]}`;
                    }
                    return null;
                },
                prettyPrint: true,
            }),
        ],
        cache: {},
    };
    if (!utils_1.isDev()) {
        const uglifyJsPluginConfig = project.createSeparateMinFiles ? { include: /\.min\.js$/ } : {};
        webpackConfig.optimization = {
            minimize: true,
            minimizer: [new UglifyJsPlugin(uglifyJsPluginConfig)],
        };
    }
    function compileScripts() {
        return gulp_1.src(config.src)
            .pipe(gulp_plumber_1.default())
            .pipe(named())
            .pipe(webpack_stream_1.default(webpack_merge_1.default({
            entry: source,
            devtool: utils_1.isDev() ? 'inline-source-map' : false,
            mode: utils_1.isDev() ? 'development' : 'production',
        }, webpackConfig)).on('error', notify))
            .pipe(gulp_1.dest(config.dest));
    }
    return gulp_1.parallel(compileScripts);
}
exports.default = default_1;
