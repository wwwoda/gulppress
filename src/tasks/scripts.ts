interface ScriptCompilerConfig {
	src: string | Array < string > ;
	dest: string;
	assets: string;
}

import { dest, parallel, src } from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import HashAssetsPlugin from 'hash-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import named from 'vinyl-named';
import { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackStream from 'webpack-stream';

import { getWatchers, isDev } from '../utils';


export default function (config: ScriptCompilerConfig) {
	const webpackConfig: Configuration = {
		watch: getWatchers()['scripts'] === true,
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
			new HashAssetsPlugin({
				filename: config.assets,
				keyTemplate: (filename: string) => {
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

	if (!isDev()) {
		if (webpackConfig.plugins) {
			webpackConfig.plugins.push(new UglifyJsPlugin());
		}
	}

	function compileScripts() {
		return src(config.src)
			.pipe(plumber())
			.pipe(named())
			.pipe(webpackStream(webpackMerge({
					devtool: isDev() ? 'inline-source-map' : false,
					mode: isDev() ? 'development' : 'production',
				},
				webpackConfig,
			)).on('error', notify))
			.pipe(dest(config.dest));
	}

	return parallel(compileScripts);
}
