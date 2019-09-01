import browserSync = require('browser-sync');
import fancyLog from 'fancy-log';

const argv = require('yargs').argv;

export function getProxyUrl(url ? : string) {
	return process.env.WP_HOME || url || '';
}

export function getTheme(theme: string) {
	return process.env.theme || process.env.THEME || theme;
}

export function getWatchers() {
	const watchers: any = {
		icons: false,
		images: false,
		scripts: false,
		styles: false,
		svg: false,
		vendorScripts: false,
	};

	if (argv.watch) {
		argv.watch.split(',').forEach((watcher: string) => {
			if (!(watcher in watchers)) {
				fancyLog.error('--watch argument contains unkonwn entries.  (--watch=icons,images,scripts,styles,svg,vendorScripts)');
			} else {
				watchers[watcher] = true;
			}
		});
	}

	return watchers;
}

export function isDev() {
	if (argv.nodev) {
		return false;
	}

	if (argv.dev) {
		return true;
	}

	if (argv.env !== undefined) {
		return argv.env === 'development';
	}

	return process.env.WP_ENV !== undefined ? process.env.WP_ENV === 'development' : false;
}

export function reload(done: CallableFunction) {
	browserSync.reload();
	done();
}
