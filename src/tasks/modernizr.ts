interface ModernizrConfig {
	src: string | Array < string > ;
	dest: string;
	options: modernizr.Params;
}

import { dest, parallel, src } from 'gulp';
import modernizr from 'gulp-modernizr';
import uglify from 'gulp-uglify';

export default function (config: ModernizrConfig) {
	function generateModernizr() {
		return src(config.src)
			.pipe(modernizr(config.options))
			.pipe(uglify())
			.pipe(dest(config.dest));
	}

	return parallel(generateModernizr);
}
