interface FontsConfig {
	srcPath: string;
	src: string | Array < string > ;
	dest: string;
}

import { dest, parallel, series, src } from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import changed = require('gulp-changed');
import filter = require('gulp-filter');

export default function (config: FontsConfig) {
	function createWoffFromTtf() {
		return src(config.src)
			.pipe(filter(file => /ttf$/.test(file.path)))
			.pipe(ttf2woff())
			.pipe(dest(config.srcPath));
	}

	function createWoff2FromTtf() {
		return src(config.src)
			.pipe(filter(file => /ttf$/.test(file.path)))
			.pipe(ttf2woff2())
			.pipe(dest(config.srcPath));
	}

	function copyFonts() {
		return src(config.src)
			.pipe(filter(file => /(woff|woff2)$/.test(file.path)))
			.pipe(changed(config.dest))
			.pipe(dest(config.dest));
	}

	return series(parallel(createWoffFromTtf, createWoff2FromTtf), copyFonts);
}
