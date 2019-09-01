interface VendorScriptsConfig {
	src: string | Array < string > ;
	dest: string;
}

import { dest, parallel, src } from 'gulp';

export default function (config: VendorScriptsConfig) {
	function processVendorScripts() {
		return src(config.src)
			.pipe(dest(config.dest));
	}

	return parallel(processVendorScripts);
}
