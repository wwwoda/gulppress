import browserSync from 'browser-sync';
import { parallel } from 'gulp';

export default function (config: browserSync.Options) {
	function startServer(done: CallableFunction) {
		browserSync.init(config);
		done();
	}

	return parallel(startServer);
}
