interface IconsConfig {
	src: string | Array < string > ;
	dest: string;
}

import { dest, parallel, src } from 'gulp';
import cache from 'gulp-cache';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';

export default function (config: IconsConfig) {
	function processIcons() {
		return src(config.src)
			.pipe(
				cache(
					imagemin([
						imagemin.svgo({
							plugins: [
								{
									removeViewBox: false,
								}, {
									cleanupIDs: false
								},
							],
						}),
					])
				)
			)
			.pipe(rename({
				extname: '.php',
			}))
			.pipe(changed(config.dest))
			.pipe(dest(config.dest));
	}

	return parallel(processIcons);
}
