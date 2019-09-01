interface CleanConfig {
	favicon?: string | {
		dest: string;
	};
	fonts?: string | {
		dest: string;
	};
	icons?: string | {
		dest: string;
	};
	images?: string | {
		dest: string;
	};
	scripts?: string | {
		dest: string;
	};
	styles?: string | {
		dest: string;
	};
}

import del = require( 'del' );

function getDestPaths( config: CleanConfig ): { [key: string]: string } {
	const dests: { [key: string]: string } = {};
	for ( const [key, value] of Object.entries(config)) {
		if (typeof value === 'object' && 'dest' in value) {
			dests[key] = value['dest'];
		}
	}
	return dests;
}

export default function (config: CleanConfig) {
	const dests = getDestPaths(config);
	console.log(dests);

	function scriptsStyles() {
		return del(
			[
				dests.scripts || '',
				dests.styles || '',
			], {
				force: true,
			},
		);
	}

	function assets() {
		return del(
			[
				dests.favicon || '',
				dests.fonts || '',
				dests.icons || '',
				dests.images || '',
			], {
				force: true,
			},
		);
	}

	function all() {
		return del(
			Object.values(dests), {
				force: true,
			},
		);
	}

	return {
		scriptsStyles,
		assets,
		all,
	};
}
