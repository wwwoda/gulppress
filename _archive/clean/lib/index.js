"use strict";
exports.__esModule = true;
var getTask = function (config) {
    return Object.assign(function (done) {
        var minifyStream = getMinifyImagesStream(config.src, config.dest, config.imagemin);
        if (config.destPhpPartials) {
            getCreateSvgPhpPartialStream(minifyStream, config.destPhpPartials);
        }
        done();
    }, {
        displayName: config.destPhpPartials
            ? 'images:minify-and-create-partials'
            : 'images:minify'
    });
};
exports["default"] = getTask;
