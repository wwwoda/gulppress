interface TranslateConfig {
	src: string | Array<string> ;
	dest: string;
	filename: string;
	options: {
		textDomain: string;
		packageName: string;
		bugReport: string;
		lastTranslator: string;
		team: string;
	};
}

import { dest, parallel, src } from 'gulp';
import sort from 'gulp-sort';
import wpPot from 'gulp-wp-pot';


export default function (config: TranslateConfig) {
	function translate() {
		return src(config.src)
			.pipe(sort())
			.pipe(
				wpPot({
					domain: config.options.textDomain,
					package: config.options.packageName,
					bugReport: config.options.bugReport,
					lastTranslator: config.options.lastTranslator,
					team: config.options.team,
				})
			)
			.pipe(dest(`${config.dest}/${config.filename}`));
	}

	return parallel(translate);
}
