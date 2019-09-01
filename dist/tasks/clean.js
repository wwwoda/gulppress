"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var del = require("del");
function getDestPaths(config) {
    var dests = {};
    for (var _i = 0, _a = Object.entries(config); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (typeof value === 'object' && 'dest' in value) {
            dests[key] = value['dest'];
        }
    }
    return dests;
}
function default_1(config) {
    var dests = getDestPaths(config);
    console.log(dests);
    function scriptsStyles() {
        return del([
            dests.scripts || '',
            dests.styles || '',
        ], {
            force: true,
        });
    }
    function assets() {
        return del([
            dests.favicon || '',
            dests.fonts || '',
            dests.icons || '',
            dests.images || '',
        ], {
            force: true,
        });
    }
    function all() {
        return del(Object.values(dests), {
            force: true,
        });
    }
    return {
        scriptsStyles: scriptsStyles,
        assets: assets,
        all: all,
    };
}
exports.default = default_1;
