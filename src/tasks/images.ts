interface ImagesConfig {
	src: string | Array < string > ;
	dest: string;
}

import { dest, parallel, src } from 'gulp';
import cache from 'gulp-cache';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';

export default function (config: ImagesConfig) {
	function processImages() {
		return src(config.src)
			.pipe(
				cache(
					imagemin([
						imagemin.gifsicle({
							interlaced: true
						}),
						imagemin.jpegtran({
							progressive: true
						}),
						imagemin.optipng({
							optimizationLevel: 3
						}),
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
			.pipe(changed(config.dest))
			.pipe(dest(config.dest));
	}

	return parallel(processImages);
}
