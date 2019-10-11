"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const del = require("del");
function getDestPaths(config) {
    const dests = {};
    for (const [key, value] of Object.entries(config)) {
        if (typeof value === 'object' && value.dest) {
            dests[key] = value.dest;
        }
    }
    return dests;
}
function default_1(config) {
    const dests = getDestPaths(config);
    function scriptsStyles() {
        const scriptsStylesArray = [];
        if (dests.scripts) {
            scriptsStylesArray.push(dests.scripts);
        }
        if (dests.styles) {
            scriptsStylesArray.push(dests.styles);
        }
        return del(scriptsStylesArray, { force: true });
    }
    function assets() {
        const assetsArray = [];
        if (config.assets) {
            if (typeof config.assets === 'string') {
                assetsArray.push(config.assets);
            }
            else if (Array.isArray(config.assets)) {
                assetsArray.push(...config.assets);
            }
        }
        if (dests.favicon) {
            assetsArray.push(dests.favicon);
        }
        if (dests.fonts) {
            assetsArray.push(dests.fonts);
        }
        if (dests.icons) {
            assetsArray.push(dests.icons);
        }
        if (dests.images) {
            assetsArray.push(dests.images);
        }
        if (typeof config.images === 'object' && config.images.destPhpPartials) {
            assetsArray.push(config.images.destPhpPartials);
        }
        return del(assetsArray, { force: true });
    }
    function all() {
        return del(Object.values(dests), {
            force: true,
        });
    }
    return {
        scriptsStyles,
        assets,
        all,
    };
}
exports.default = default_1;
