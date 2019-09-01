interface StylesCompilerConfig {
	src: string | Array < string > ;
	dest: string;
	includePaths: Array < string > ;
	busterRelativePath: string;
}

import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import { dest, parallel, src } from 'gulp';
import gulpBuster from 'gulp-buster';
import csso from 'gulp-csso';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcssCalc from 'postcss-calc';
import cssVariables from 'postcss-css-variables';
import postcssEasingGradients from 'postcss-easing-gradients';

import { getWatchers, isDev } from '../utils';


const {
	stream,
} = browserSync;

export default function (config: StylesCompilerConfig) {
	const postcssPlugins = [
		autoprefixer({}),
		cssVariables({
			preserve: true,
		}),
		postcssCalc(),
		postcssEasingGradients(),
	];

	function compileStyles() {
		return src(config.src)
			.pipe(plumber())
			.pipe(gulpif(isDev(), sourcemaps.init()))
			.pipe(sass({
				outputStyle: 'expanded',
				includePaths: config.includePaths,
			}).on('error', sass.logError))
			.pipe(postcss(postcssPlugins))
			.pipe(gulpif(!isDev(), csso()))
			.pipe(gulpif(isDev(), sourcemaps.write('.')))
			.pipe(dest(config.dest))
			.pipe(gulpif(getWatchers()['styles'] === true, stream()))
			.pipe(gulpBuster({
				fileName: '.assets.json',
				relativePath: config.busterRelativePath,
			}))
			.pipe(dest(config.dest));
	}

	return parallel(compileStyles);
}
